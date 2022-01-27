const _ = require("lodash");
const chordMapping = require("./chordMapping");
const spec = require("./spec");
const util = require("./util");
class Clip {
  constructor(clipParams) {
    this.notes = clipParams.notes;
    this.loopLength = clipParams.loopLength;
    this.track = clipParams.track;
    this.startTime = clipParams.startTime;
    this.endTime = clipParams.endTime;
    this.sceneNumber = clipParams.sceneNumber;
  }
  
  // clip is an addition clip to be merged
  // splicePoint describes the time at which clips should be spliced.
  // ignores everything besides clips
  merge(clip, splicePoint) {
    const newNotes = []
    for (const note of this.notes) {
      if (note.start < splicePoint) {
        newNotes.push(note);
      }
    }
    for (const note of clip.notes) {
      if (note.start >= splicePoint) {
        newNotes.push(note);
      }
    }
    this.notes = newNotes
    return this;
  }

  slice(startTime, endTime) {
    const newNotes = []
    for (const note of this.notes) {
      if (note.start > startTime && note.start < endTime) {
        newNotes.push(note);
      }
    }
    this.notes = newNotes
    return this;
  }

  // saves to state
  save() {
    let name = `${this.track}`
    if (this.startTime !== undefined) {
      name = `${this.track}.${this.startTime}`
    }
    if (this.sceneNumber !== undefined) {
      name = `${this.track}.${this.sceneNumber}`
    }
    spec.state.clips[name] = this;
    return this
  }

  setVelocity(velocity) {
    for (const note of this.notes) {
      note.velocity = velocity
    }
    return this
  }

  setSceneNumber(sceneNumber) {
    this.sceneNumber = sceneNumber;
    return this
  }

  addToArrangement(startTime, endTime) {
    if (startTime === undefined) {
      throw new Error("startTime needs to be defined");
    }
    if (endTime === undefined) {
      throw new Error("endTime needs to be defined");
    }
    if (startTime > endTime) {
      throw new Error("startTime is higher than endTime");
    }
    this.startTime = startTime;
    this.endTime = endTime;
    return this;
  }
}

Clip.makeNamedClip = (clipName, track) => {
  if (!track) {
    throw new Error("No trackName provided");
  }
  if (Clip.namedClips[clipName]) {
    return new Clip({ ...JSON.parse(JSON.stringify(Clip.namedClips[clipName])), track })
  } else if (chordMapping.mappingDefs[clipName]) {
    if (_.isEmpty(spec.state.progression)) {
      throw new Error("No progression found. Please set progression before adding a chord mapping");
    }
    const notes = chordMapping.renderChordMapping(chordMapping.mappingDefs[clipName], spec.state.progression)
    return new Clip({
      notes,
      track,
      loopLength: spec.state.progression.duration,
    });
  }
}

Clip.makeClip = (notes, track, loopLength) => {
  for (const note of notes) {
    if (!note.pitch) {
      const noteString = note.note.split(".")[0];
      let octave = parseInt(note.note.split(".")[1]);
      let pitchOffset
      if (util.notes[noteString] !== undefined) {
        pitchOffset = util.notes[noteString]
      } else if (util.intervals[noteString] !== undefined) {
        if (!spec.state.scale) {
          throw new Error("scale required to be set if providing interval notes");
        }
        pitchOffset = util.intervals[noteString] + util.notes[spec.state.scale.root]
      } else {
        if (!spec.state.scale) {
          throw new Error("scale required to be set if providing scale degrees");
        }
        // assume scale offset by default
        pitchOffset = spec.state.scale.keySignature[parseInt(noteString) % spec.state.scale.keySignature.length] + util.notes[spec.state.scale.root]
        octave = octave + Math.floor(parseInt(noteString) / spec.state.scale.keySignature.length)
      }
      if (pitchOffset === undefined) {
        throw new Error("pitch offset is undefined")
      }
      note.pitch = pitchOffset + (octave + 1) * 12
      delete note.note
    }
  }
  return new Clip({
    notes,
    track,
    loopLength: loopLength,
  });
}

Clip.PERC_DEFAULT_PITCH = 60;
Clip.MIDDLE_C = 60;
Clip.namedClips = {
  "2offset": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3,
        duration: 1,
      }
    ],
    loopLength: 4,
  },
  "4": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3,
        duration: 1,
      }
    ],
    loopLength: 4,
  },
  "4offset": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3.5,
        duration: 1,
      }
    ],
    loopLength: 4,
  },
  "8": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.5,
        duration: 1,
      }
    ],
    loopLength: 2,
  },
  "16": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0.25,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0.75,
        duration: 1,
      },
    ],
    loopLength: 1,
  },
  "1offset": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2,
        duration: 1,
      }
    ],
    loopLength: 4,
  },
  "3": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3,
        duration: 1,
      },
    ],
    loopLength: 4,
  },
  "6": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0.75,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2.25,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3.5,
        duration: 1,
      },
    ],
    loopLength: 4,
  },
  "3alt1": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3,
        duration: 1,
      },
    ],
    loopLength: 4,
  },
  "3alt2": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3.5,
        duration: 1,
      },
    ],
    loopLength: 4,
  },
  "3alt3": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 4.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 6,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 7.5,
        duration: 1,
      },
    ],
    loopLength: 8,
  },
  "fastSyncopate1": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0.75,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3,
        duration: 1,
      },
    ],
    loopLength: 4,
  },
  "12alt": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0.75,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2.75,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3.5,
        duration: 1,
      },
    ],
    loopLength: 4,
  },
  "3alt4": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 0.75,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2.25,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3,
        duration: 1,
      },
    ],
    loopLength: 4,
  },
}
module.exports = Clip
