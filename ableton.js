const _ = require("lodash");
const { Ableton } = require("ableton-js");
const ableton = new Ableton();

exports.sync = async (state) => {
  if (state.name) {
    let rawdata = fs.readFileSync(`/tmp/${state.name}_state.json`);
    let abletonClips = {};
    if (rawdata) {
      let abletonClips = JSON.parse(rawdata);
    }
  }

  // set tempo
  await ableton.song.set("tempo", state.bpm);

  const tracks = await ableton.song.get("tracks");
  // write and/or update clips
  diffClips = getUpdatedClips(state, abletonClips);
  for (const stateClip of diffClips) {
    validateClip(stateClip);
    const track = tracks.filter((track) => {
      return track.raw.name === stateClip.track
    })[0];
    if (!track) {
      throw new Error(`Track ${stateClip.track} could not be found`);
    }
    if (stateClip.sound) {
      try {
        const devices = await.track.get("devices");
        const instrument = devices.filter((devices) => {
          return devices.type === "instrument";
        });
        const parameters = await instrument.get("parameters");
        const soundParam = parameters.filter((parameter) => {
          return parameter.name === "sound";
        });
        await soundParam.set("value", stateClip.sound);
      } catch (e) {
        console.log(`WARNING: Sound could not be set. Error: ${e}`);
      }
    }
    const clipSlots = await track.get("clip_slots");
    const clipSlot = clipSlots[stateClip.scene];
    const clipExists = await clipSlot.get("has_clip");
    if (!clipExists) {
      await clipSlot.createClip(stateClip.loopLength);
    }
    const clip = await clipSlot.get("clip");
    await clip.set("loop_start", 0);
    await clip.set("loop_end", stateClip.loopLength);
    await clip.selectAllNotes();
    await clip.replaceSelectedNotes(stateClip.notes)
  }

  removeClips = getRemovedClips(state, abletonClips);
  for (const clip of removeClips) {
    const track = tracks.filter((track) => {
      return track.raw.name === clip.track
    })[0];
    const clipSlots = await track.get("clipSlots");
    const clipSlot = clipSlots[clip.scene];
    await clipSlot.deleteClip();
  }

  if (state.name) {
    let data = JSON.stringify(abletonStte);
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

function getRemovedClips(state, abletonClip) {
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
  if (clip.scene === undefined) {
    throw new Error("scene not specified");
  }
  if (!clip.notes) {
    throw new Error("Notes not provided");
  }
  for (const note of clip.notes) {
    if (!note.pitch) {
      throw new Error("Note has no pitch");
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
