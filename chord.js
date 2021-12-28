const util = require("./util");
const spec = require("./spec");
class Chord {
  constructor(root, additionalNotes) {
    this.notes = [root];
    for (const note of additionalNotes) {
      let offset = note
      if (typeof note === "string") {
        offset = util.intervals[note];
      }
      this.notes.push(root + offset);
    };
  }

  addInterval(interval) {
    this.notes.push(root + intervals[interval]);
    return this;
  }

  start(startTime) {
    this.start = startTime
    return this
  }
}

Chord.makeChord = (root, type) => {
  if (util.notes[root]) {
    return new Chord(util.notes[root], Chord.chordTypes[type]);
  } else if (Chord.numeralChords[root]) {
    return new Chord(60 + util.notes[spec.state.scale.root] + spec.state.scale.keySignature[Chord.numeralChords[root].offset], Chord.numeralChords[root].notes)
  } else {
    throw new Error("Invalid chord provided.")
  }
}

// lets you construct chords that match the scale with just abstract chord degrees
// base root should be an integer chord degree (0 for a C root in C major, 1 for a D root in C major, etc)
Chord.makeScaleChord = (baseRoot, scaleIntervals) => {
  const rawOffsets = [];
  const keySignature = spec.state.scale.keySignature;
  for (const interval of scaleIntervals) {
    rawOffsets.push(keySignature[(interval + baseRoot) % keySignature.length] + 12 * Math.floor((interval + baseRoot) / keySignature.length) - keySignature[baseRoot])
  }
  return new Chord(60 + keySignature[baseRoot], rawOffsets)
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
Chord.progression = (chords, duration) => {
  let progression = {}
  for (const chord of chords) {
    if (chord.start === undefined) {
      throw new Error("Chord is missing start");
    }
  }
  progression.chords = chords;
  progression.duration = duration ? duration : 16;
  spec.state.progression = progression;
}

const chordTypes = {
  "major": ["maj3", "perf5"],
  "maj": ["maj3", "perf5"],
  "minor": ["min3", "perf5"],
  "min": ["min3", "perf5"],
}

Chord.chordTypes = chordTypes;

Chord.numeralChords = {
  "I": { offset: 0, notes: chordTypes["major"] },
  "i": { offset: 0, notes: chordTypes["minor"] },
  "II": { offset: 1, notes: chordTypes["major"] },
  "ii": { offset: 1, notes: chordTypes["minor"] },
  "III": { offset: 2, notes: chordTypes["major"] },
  "iii": { offset: 2, notes: chordTypes["minor"] },
  "IV": { offset: 3, notes: chordTypes["major"] },
  "iv": { offset: 3, notes: chordTypes["minor"] },
  "V": { offset: 4, notes: chordTypes["major"] },
  "v": { offset: 4, notes: chordTypes["minor"] },
  "VI": { offset: 5, notes: chordTypes["major"] },
  "vi": { offset: 5, notes: chordTypes["minor"] },
  "VII": { offset: 6, notes: chordTypes["major"] },
  "vii": { offset: 6, notes: chordTypes["minor"] },
}
module.exports = Chord;
