const _ = require("lodash");
const uuid = require('uuid');
const chordMapping = require("./chordMapping");
const Clip = require("./clip");
const Chord = require("./chord");
const util = require("./util");

exports.keySignatures = {
  "major": [0,2,4,5,7,9,11],
  "minor": [0,2,3,5,7,8,10],
}

exports.scale = (root, keySignature) => {
  if (!notes.include(root)) {
    throw new Error("Invalid Inputs. Please make sure the root you have provided is supported and spelled correctly");
  };
  state.scale.root = root;
  state.scale.keySignature = keySignature;
}

// Progression Schema
// [
//   {
//     "notes": [
//       56,
//       60,
//       63,
//     ],
//     time: 0,
//   },
//   ...
// ]
//
// Where notes are midi pitch values and time is in beats
exports.progression = (chords, duration) => {
  let progression = {}
  for (const chord of chords) {
    if (chord.start === undefined) {
      throw new Error("Chord is missing start");
    }
  }
  progression.chords = chords;
  progression.duration = duration ? duration : 16;
  state.progression = progression;
}

exports.makeChord = (root, type) => {
  if (util.notes[root]) {
    return new Chord(util.notes[root], Chord.chordTypes[type]);
  } else if (Chord.numeralChords[root]) {
    return new Chord(60 + util.notes[state.scale.root] + state.scale.keySignature[Chord.numeralChords[root].offset], Chord.numeralChords[root].notes)
  } else {
    throw new Error("Invalid chord provided.")
  }
}

exports.addShortHandClip = (clipName) => {
}

exports.addNamedClip = (clipName, track) => {
  if (!track) {
    throw new Error("No trackName provided");
  }
  if (Clip.namedClips[clipName]) {
    return exports.addClip({ ...Clip.namedClips[clipName], track })
  } else if (chordMapping.mappingDefs[clipName]) {
    if (_.isEmpty(state.progression)) {
      throw new Error("No progression found. Please set progression before adding a chord mapping");
    }
    const notes = chordMapping.renderChordMapping(chordMapping.mappingDefs[clipName], state.progression)
    return exports.addClip({
      notes,
      track,
      loopLength: state.progression.duration,
    });
  }
}
exports.addClip = (clipParams) => {
  const clip = new Clip({ ...clipParams, scene: state.scene });
  state.clips[`${clip.track}.${clip.scene}`] = clip
  return clip
};

let state = {
  clips: {},
  bpm: 120,
  scene: 0,
  scale: { // scale is set to C major by default
    root: "C",
    keySignature: exports.keySignatures["major"],
  }
}
exports.state = state
