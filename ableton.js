const fs = require("fs");
const _ = require("lodash");
const { Ableton } = require("ableton-js");
const sqlite3 = require('sqlite3');
const util = require("./util");
const db = new sqlite3.Database("/Users/seonyoo/Dropbox/User Library/Presets/Instruments/Max Instrument/songs.db");

const ableton = new Ableton();
exports.ableton = ableton;

const loops = {}
db.each("SELECT name, key, bpm FROM loops", function(err, row) {
  if (err) {
    throw err
  }
  loops[row.name] = {
    name: row.name,
    key: row.key,
    bpm: row.bpm,
  }
});

exports.updateLoopKeys = async (state) => {
  let key
  if (state.scale.name === "major") {
    key = (util.notes[state.scale.root] + 8) % 12
  }
  if (state.scale.name === "minor") {
    key = (util.notes[state.scale.root] + 11) % 12
  }
  if (key === undefined) {
    throw new Error("scale is non-diatonic and we can't modify loops that way");
  }
  
  const tracks = await ableton.song.get("tracks");
  const loopTrack = tracks.filter((track) => {
    return track.raw.name === "loops"
  })[0];
  const clipSlots = await loopTrack.get("clip_slots");
  for (const clipSlot of clipSlots) {
    const clip = await clipSlot.get("clip");
    if (clip) {
      let name = await clip.get("name");
      let newKey = key - loops[name].key
      if (newKey > 6) {
        newKey  = newKey - 12
      }
      if (newKey < -6) {
        newKey  = newKey + 12
      }
      await clip.set("pitch_coarse", newKey)
    }
  }
};

exports.sync = async (state, removeOldClips) => {
  let abletonClips = []
  const tracks = await ableton.song.get("tracks");
  // write and/or update clips
  const updatePromises = []
  for (const stateClip of Object.values(state.clips)) {
    validateClip(stateClip);
    const track = tracks.filter((track) => {
      return track.raw.name === stateClip.track
    })[0];
    if (!track) {
      throw new Error(`Track ${stateClip.track} could not be found`);
    }
    const clipSlots = await track.get("clip_slots");
    let scene = 0;
    if (stateClip.sceneNumber) {
      scene = stateClip.sceneNumber
    }
    const clipSlot = clipSlots[scene];
    const clipExists = await clipSlot.get("has_clip");
    if (clipExists) {
      await clipSlot.deleteClip();
    }
    await clipSlot.createClip(stateClip.loopLength);
    const clip = await clipSlot.get("clip");
    await clip.selectAllNotes();
    await clip.replaceSelectedNotes(stateClip.notes)
    await clip.set("loop_end", stateClip.loopLength);

    if (stateClip.startTime !== undefined && stateClip.endTime !== undefined) {
      if (["bass", "arp", "chord", "rhythm1", "rhythm2"].includes(stateClip.track)) {
        await clip.set("start_marker", stateClip.loopStart || 0);
        await clip.set("looping", false);
      }
      let localTime = stateClip.startTime

      while (localTime < stateClip.endTime) {
        if (stateClip.endTime - localTime < stateClip.loopLength) {
          if (["kick", "snare", "fastperc", "perc1", "perc2"].includes(stateClip.track)) {
            await clip.set("loop_end", stateClip.endTime - localTime);
          }
        }
        await track.sendCommand("duplicate_clip_to_arrangement", {clip_id: clip.raw.id, time: localTime});
        if (localTime === stateClip.startTime && stateClip.loopStart) {
          await clip.set("start_marker", 0);
          await clip.set("loop_start", 0);
          await clip.set("looping", true);
          localTime = localTime - stateClip.loopStart
        }
        localTime = localTime + stateClip.loopLength
      }
    }
  }
  if (state.fx.length !== 0) {
    const track = tracks.filter((track) => {
      return track.raw.name === "fx"
    })[0];
    if (!track) {
      throw new Error(`Track fx could not be found`);
    }
    for (let fx of state.fx) {
      const clipSlots = await track.get("clip_slots");
      const clipSlot = clipSlots[fx.type];
      const clip = await clipSlot.get("clip");
      await track.sendCommand("duplicate_clip_to_arrangement", {clip_id: clip.raw.id, time: fx.start});
    }
  }

  if (removeOldClips) {
    removeClips = getRemovedClips(state, abletonClips);
    for (const clip of removeClips) {
      const track = tracks.filter((track) => {
        return track.raw.name === clip.track
      })[0];
      const clipSlots = await track.get("clipSlots");
      const clipSlot = clipSlots[0];
      await clipSlot.deleteClip();
    }
  }
}

function getUpdatedClips(state, abletonClips) {
  const newClips = []
  for (const clipName in state.clips) {
    // if clip is totally new
    if (!abletonClips[clipName]) {
      newClips.push(state.clips[clipName])
      continue
    }

    // if clip has changed
    if (_.isEqual(state.clip[clipName], abletonClips[clipName])) {
      newClips.push(state.clip[clipName]);
      continue
    }
  }
  return newClips;
}

function getRemovedClips(state, abletonClips) {
  const deleteClips = []
  for (const clipName in abletonClips) {
    if (!state.clips[clipName]) {
      deleteClips.push(abletonClips[clipName]);
    }
  }
  return deleteClips
}

function validateClip(clip) {
  if (!clip.track) {
    throw new Error("No Track specified");
  }
  if (!clip.loopLength) {
    throw new Error("Loop Length not specified");
  }
  if (!clip.notes) {
    throw new Error("Notes not provided");
  }
  for (const note of clip.notes) {
    if (!note.pitch) {
      throw new Error("Note has no pitch");
    }
    if (note.pitch < 0) {
      throw new Error("Note has pitch less than 0");
    }
    if (!note.duration) {
      throw new Error("Note has no duration");
    }
    if (note.time === undefined) {
      if (note.start === undefined) {
        throw new Error("Note has no start");
      }
      // convert "start" to "time" which ableton expects
      note.time = note.start
      delete note.start
    }

    // set defaults that will be used later
    if (!note.velocity) {
      note.velocity = 90;
    }
    if (!note.muted) {
      note.muted = false;
    }
  }
}

exports.setDeviceParameter = async (trackName, deviceName, parameterName, value) => {
  const tracks = await ableton.song.get("tracks");
  const track = tracks.filter((t) => {
    return t.raw.name === trackName
  })[0];

  const devices = await track.get("devices");
  const device = devices.filter((d) => {
    return d.raw.name === deviceName
  })[0];

  const parameters = await device.get("parameters");
  const parameter = parameters.filter((p) => {
    return p.raw.name === parameterName
  })[0]
  await parameter.set("value", value)
}
