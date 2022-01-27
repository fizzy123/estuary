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

  invert(inversion) {
    inversion = inversion % this.notes.length
    for (let i = 0; i < inversion; i++) {
      const first = this.notes.splice(0,1)
      this.notes.push(first[0] + 12)
    }
    return this
  }

  alter(index, offset) {
    this.notes[index] = this.notes[index] + offset
  }
}

Chord.makeChord = (root, type) => {
  const keySignature = spec.state.scale.keySignature
  if (util.notes[root]) {
    return new Chord(util.notes[root], Chord.chordTypes[type]);
  } else if (Chord.numeralChords[root]) {
    return new Chord(60 + util.notes[spec.state.scale.root] + keySignature[Chord.numeralChords[root].offset], Chord.numeralChords[root].notes)
  } else if (typeof root === "number" && root.isInteger()) {
    root = root - 1;
    if (root >= keySignature.length) {
      throw new Error(`key signature has fewer degrees than ${root + 1}`)
    }
    const midiRoot = 60 + util.notes[spec.state.scale.root] + keySignature[root]
    const midiSecond = 60 + 12 * Math.floor((spec.state.scale.root + 2)/keySignature.length) + util.notes[(spec.state.scale.root + 2) % keySignature.length] + keySignature[root]
    const midiThird = 60 + 12 * Math.floor((spec.state.scale.root + 4)/keySignature.length) + util.notes[(spec.state.scale.root + 4) % keySignature.length] + keySignature[root]
    return new Chord(midiRoot, [midiSecond, midiThird])
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

Chord.inferNumeral = (chordNumber) => {

}

const chordTypes = {
  "major": ["maj3", "perf5"],
  "maj": ["maj3", "perf5"],
  "minor": ["min3", "perf5"],
  "min": ["min3", "perf5"],
  "dim": ["min3", "dim5"],
}

Chord.chordTypes = chordTypes;

Chord.numeralChords = {
  "I": { offset: 0, notes: chordTypes["major"] },
  "i": { offset: 0, notes: chordTypes["minor"] },
  "II": { offset: 1, notes: chordTypes["major"] },
  "ii": { offset: 1, notes: chordTypes["minor"] },
  "iiDim": { offset: 1, notes: chordTypes["dim"] },
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
  "viiDim": { offset: 6, notes: chordTypes["dim"] },
}
module.exports = Chord;
