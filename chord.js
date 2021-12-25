const util = require("./util");
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
