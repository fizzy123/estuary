const util = require("./util");
const spec = require("./spec");
const { ableton } = require("./ableton");
class Chord {
  constructor(root, additionalNotes) {
    if (!root) {
      return
    }
    this.notes = [root];
    this.root = root
    for (const note of additionalNotes) {
      let offset = note
      if (typeof note === "string") {
        offset = util.intervals[note];
      }
      this.notes.push(root + offset);
    };
  }

  addInterval(interval) {
    this.notes.push(this.root + util.intervals[interval]);
    return this;
  }

  setNotes(notes) {
    this.notes = notes;
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
    return this
  }
}

Chord.makeChord = (root, type) => {
  const keySignature = spec.state.scale.keySignature
  if (util.notes[root]) {
    return new Chord(util.notes[root], Chord.chordTypes[type]);
  } else if (Chord.numeralChords[root]) {
    return new Chord(60 + util.notes[spec.state.scale.root] + keySignature[Chord.numeralChords[root].offset], Chord.numeralChords[root].notes)
  } else if (Number.isInteger(root)) {
    root = root - 1;
    if (root >= keySignature.length) {
      throw new Error(`key signature has fewer degrees than ${root + 1}`)
    }
    const midiRoot = 60 + util.notes[spec.state.scale.root] + keySignature[root]
    const midiSecond = 12 * Math.floor((root + 2) / keySignature.length) + keySignature[(root + 2) % keySignature.length] - keySignature[root] 
    const midiThird = 12 * Math.floor((root + 4) / keySignature.length) + keySignature[(root + 4) % keySignature.length] - keySignature[root]
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

Chord.readAllChordClips = async () => {
  const tracks = await ableton.song.get("tracks");
  const chordTrack = tracks.filter((track) => {
    return track.raw.name === "chords"
  })[0];
  const clipSlots = await chordTrack.get("clip_slots");
  const chordProgressions = []
  for (const clipSlot of clipSlots) {
    if (!clipSlot.raw.has_clip) {
      continue
    }
    const chordProgression = []
    const clip = await clipSlot.get("clip");
    const length = await clip.get("length");
    const notes = await clip.getNotes(0, 0, length, 128)
    let chord = []
    let chordPosition = 0
    notes.sort((a, b) => {
      return a.time - b.time
    } )
    for (let note of notes) {
      if (chordPosition === note.time) {
        chord.push(note.pitch)
      } else {
        chordProgression.push({
          notes: chord,
          start: chordPosition,
        });
        chordPosition = note.time
        chord = [note.pitch]
      }
    }
    chordProgression.push({
      notes: chord,
      start: chordPosition,
    });
    chordProgressions.push({
      chords: chordProgression,
      duration: length,
    });
  }
  return chordProgressions
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
