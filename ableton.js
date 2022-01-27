const fs = require("fs");
const _ = require("lodash");
const { Ableton } = require("ableton-js");
const ableton = new Ableton();
const sqlite3 = require('sqlite3');
const util = require("./util");
const db = new sqlite3.Database("/Users/nobelyoo/Dropbox/User Library/Presets/Instruments/Max Instrument/songs.db");

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
  try {
  const jsonString = fs.readFileSync(`/tmp/${state.name}_state.json`)
    abletonClips = JSON.parse(jsonString)
  } catch (e) {
    if (e.message.includes("no such file or directory")) {
      console.log("no state file found. creating new one");
    } else {
      throw e
    }
  }

  const tracks = await ableton.song.get("tracks");
  // write and/or update clips
  diffClips = getUpdatedClips(state, abletonClips);
  const updatePromises = []
  for (const stateClip of diffClips) {
    validateClip(stateClip);
    const track = tracks.filter((track) => {
      return track.raw.name === stateClip.track
    })[0];
    console.log(stateClip.track);
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
    if (!clipExists) {
      await clipSlot.createClip(stateClip.loopLength);
    }
    const clip = await clipSlot.get("clip");
    await clip.set("loop_start", 0);
    await clip.set("loop_end", stateClip.loopLength);
    await clip.selectAllNotes();
    await clip.replaceSelectedNotes(stateClip.notes)
    if (stateClip.startTime !== undefined && stateClip.endTime !== undefined) {
      const localTime = stateClip.startTime
      while (localTime < stateClip.endTime) {
        await track.sendCommand("duplicate_clip_to_arrangement", {clip_id: clip.raw.id, time: stateClip.localTime});
        localTime = localTime + stateClip.loopLength
      }
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

  if (state.name) {
    let data = JSON.stringify(abletonClips);
    fs.writeFileSync(`/tmp/${state.name}_state.json`, data);
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
    if (note.start === undefined) {
      throw new Error("Note has no start");
    }
    // convert "start" to "time" which ableton expects
    note.time = note.start
    delete note.start

    // set defaults that will be used later
    if (!note.velocity) {
      note.velocity = 90;
    }
    if (!note.muted) {
      note.muted = false;
    }
  }
}
