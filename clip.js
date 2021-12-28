const _ = require("lodash");
const chordMapping = require("./chordMapping");
const spec = require("./spec");
class Clip {
  constructor(clipParams) {
    this.notes = clipParams.notes;
    this.loopLength = clipParams.loopLength;
    this.track = clipParams.track;
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

  // saves to state
  save() {
    spec.state.clips[`${this.track}`] = this;
    return this
  }

  setVelocity(velocity) {
    for (const note of this.notes) {
      note.velocity = velocity
    }
    return this
  }
}

Clip.makeNamedClip = (clipName, track) => {
  if (!track) {
    throw new Error("No trackName provided");
  }
  if (Clip.namedClips[clipName]) {
    return new Clip({ ...Clip.namedClips[clipName], track })
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
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2,
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
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3.5,
        duration: 1,
      }
    ],
    loopLength: 4,
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
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.25,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1.75,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2.25,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 2.75,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3.25,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3.5,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3.75,
        duration: 1,
      }
    ],
    loopLength: 4,
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
