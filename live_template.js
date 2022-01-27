const util = require("./util");
const spec = require("./spec");
const Clip = require("./clip");
const Chord = require("./chord");
const ableton = require("./ableton");
const scale = require("./scale");
const randomizer = require("./randomizer");

const progressions = [
  {
    chords: [
      Chord.makeChord("I").start(0),
      Chord.makeChord("V").start(4),
      Chord.makeChord("vi").start(8),
      Chord.makeChord("IV").start(12),
    ],
    duration: 16,
  },
  {
    chords: [
      Chord.makeChord("I").start(0),
      Chord.makeChord("vi").start(4),
      Chord.makeChord("IV").start(8),
      Chord.makeChord("V").start(12),
    ],
    duration: 16,
  },
  {
    chords: [
      Chord.makeChord("I").start(0),
      Chord.makeChord("IV").start(4),
      Chord.makeChord("vi").start(8),
      Chord.makeChord("V").start(12),
    ],
    duration: 16,
  },
  {
    chords: [
      Chord.makeChord("I").start(0),
      Chord.makeChord("V").start(4),
      Chord.makeChord("vi").start(8),
      Chord.makeChord("iii").start(12),
      Chord.makeChord("IV").start(16),
      Chord.makeChord("I").start(20),
      Chord.makeChord("IV").start(24),
      Chord.makeChord("V").start(28),
    ],
    duration: 32,
  },
  {
    chords: [
      Chord.makeChord("vi").start(0),
      Chord.makeChord("IV").start(4),
      Chord.makeChord("I").start(8),
      Chord.makeChord("V").start(12),
    ],
    duration: 16,
  },
  {
    chords: [
      Chord.makeChord(1).invert(2).start(0),
      Chord.makeChord(6).invert(2).start(4),
      Chord.makeChord(3).alter(1, 1).invert(2).start(8),
      Chord.makeChord(2).invert(2).start(12),
      Chord.makeChord(4).start(16),
      Chord.makeChord(2).invert(1).start(20),
      Chord.makeChord(5).start(24),
      Chord.makeChord(7).invert(2).start(28),
    ],
    duration: 32,
  },
]

const melodies = [
  Clip.makeClip([
      { note: "0.4", start: 0, duration: 1 },
      { note: "1.4", start: 1, duration: 1 },
      { note: "2.4", start: 2, duration: 1 },
      { note: "3.4", start: 3, duration: 1 },
      { note: "4.4", start: 4, duration: 1 },
      { note: "0.4", start: 5, duration: 1 },
      { note: "1.4", start: 6, duration: 1 },
      { note: "2.4", start: 7, duration: 1 },
      { note: "3.4", start: 8, duration: 1 },
      { note: "4.4", start: 9, duration: 1 },
      { note: "0.4", start: 10, duration: 1 },
      { note: "1.4", start: 11, duration: 1 },
      { note: "2.4", start: 12, duration: 1 },
      { note: "3.4", start: 13, duration: 1 },
      { note: "0.4", start: 14, duration: 1 },
      { note: "4.4", start: 15, duration: 1 },
    ],
    "melody",
    16,
  ),
  Clip.makeClip([
      { note: "0.4", start: 0, duration: 1 },
      { note: "0.4", start: 1.5, duration: 1 },
      { note: "0.4", start: 3, duration: 1 },
      { note: "0.4", start: 6, duration: 1 },
      { note: "1.4", start: 7, duration: 1 },
      { note: "0.4", start: 8, duration: 1 },
      { note: "0.4", start: 9.5, duration: 1 },
      { note: "0.4", start: 11, duration: 1 },
      { note: "0.4", start: 14, duration: 1 },
      { note: "6.4", start: 15, duration: 1 },
    ],
    "melody",
    16,
  ),
  Clip.makeClip([
      { note: "0.4", start: 0, duration: 1 },
      { note: "1.4", start: 0.25, duration: 1 },
      { note: "2.4", start: 0.5, duration: 1 },
      { note: "3.4", start: 0.75, duration: 1 },
      { note: "0.4", start: 3, duration: 1 },
      { note: "1.4", start: 3.25, duration: 1 },
      { note: "2.4", start: 3.5, duration: 1 },
      { note: "3.4", start: 3.75, duration: 1 },
      { note: "0.4", start: 6, duration: 1 },
      { note: "1.4", start: 6.25, duration: 1 },
      { note: "2.4", start: 6.5, duration: 1 },
      { note: "3.4", start: 6.75, duration: 1 },
      { note: "0.4", start: 9, duration: 1 },
      { note: "1.4", start: 9.25, duration: 1 },
      { note: "2.4", start: 9.5, duration: 1 },
      { note: "3.4", start: 9.75, duration: 1 },
      { note: "0.4", start: 12, duration: 1 },
      { note: "1.4", start: 12.25, duration: 1 },
      { note: "2.4", start: 12.5, duration: 1 },
      { note: "6.4", start: 12.75, duration: 1 },
    ],
    "melody",
    16,
  ),
  Clip.makeClip([
      { note: "0.4", start: 1, duration: 1 },
      { note: "0.4", start: 3, duration: 1 },
      { note: "0.4", start: 3.25, duration: 1 },
      { note: "0.4", start: 5, duration: 1 },
      { note: "0.4", start: 7, duration: 1 },
      { note: "0.4", start: 7.25, duration: 1 },
      { note: "0.4", start: 9, duration: 1 },
      { note: "0.4", start: 11, duration: 1 },
      { note: "0.4", start: 11.25, duration: 1 },
      { note: "0.4", start: 13, duration: 1 },
      { note: "0.4", start: 15, duration: 1 },
      { note: "4.4", start: 15.25, duration: 1 },
    ],
    "melody",
    16,
  ),
  Clip.makeClip([
      { note: "0.4", start: 2, duration: 1 },
      { note: "0.4", start: 2.25, duration: 1 },
      { note: "0.4", start: 2.5, duration: 1 },
      { note: "0.4", start: 6.25, duration: 1 },
      { note: "0.4", start: 10.5, duration: 1 },
      { note: "0.4", start: 14.25, duration: 1 },
      { note: "6.4", start: 14.5, duration: 1 },
    ],
    "melody",
    16,
  ),
  Clip.makeClip([
      { note: "0.4", start: 0, duration: 1 },
      { note: "0.4", start: 0.5, duration: 1 },
      { note: "0.4", start: 1, duration: 1 },

      { note: "0.4", start: 3, duration: 1 },
      { note: "0.4", start: 3.5, duration: 1 },
      { note: "0.4", start: 4, duration: 1 },

      { note: "0.4", start: 6, duration: 1 },
      { note: "0.4", start: 6.5, duration: 1 },
      { note: "0.4", start: 7, duration: 1 },

      { note: "0.4", start: 8, duration: 1 },
      { note: "0.4", start: 8.5, duration: 1 },
      { note: "0.4", start: 9, duration: 1 },

      { note: "0.4", start: 11, duration: 1 },
      { note: "0.4", start: 11.5, duration: 1 },
      { note: "0.4", start: 12, duration: 1 },

      { note: "0.4", start: 14, duration: 1 },
      { note: "0.4", start: 14.5, duration: 1 },
      { note: "4.4", start: 15, duration: 1 },

    ],
    "melody",
    16,
  ),
  Clip.makeClip([
      { note: "0.4", start: 0, duration: 1 },
      { note: "0.4", start: 0.5, duration: 1 },
      { note: "0.4", start: 1, duration: 1 },

      { note: "0.4", start: 3, duration: 1 },
      { note: "0.4", start: 3.5, duration: 1 },
      { note: "0.4", start: 4, duration: 1 },

      { note: "0.4", start: 5, duration: 1 },
      { note: "0.4", start: 5.5, duration: 1 },
      { note: "0.4", start: 6, duration: 1 },

      { note: "0.4", start: 7, duration: 1 },
      { note: "0.4", start: 7.5, duration: 1 },
      { note: "0.4", start: 7, duration: 1 },

      { note: "0.4", start: 8, duration: 1 },
      { note: "0.4", start: 8.5, duration: 1 },
      { note: "0.4", start: 9, duration: 1 },

      { note: "0.4", start: 10, duration: 1 },
      { note: "0.4", start: 10.5, duration: 1 },
      { note: "0.4", start: 11, duration: 1 },

      { note: "0.4", start: 12, duration: 1 },
      { note: "0.4", start: 12.5, duration: 1 },
      { note: "0.4", start: 13, duration: 1 },

      { note: "0.4", start: 14, duration: 1 },
      { note: "0.4", start: 14.5, duration: 1 },
      { note: "6.4", start: 15, duration: 1 },
    ],
    "melody",
    16,
  ),
  Clip.makeClip([
      { note: "0.4", start: 0, duration: 1 },
      { note: "5.4", start: 0.5, duration: 1 },
      { note: "4.4", start: 1, duration: 1 },

      { note: "0.4", start: 3, duration: 1 },
      { note: "0.4", start: 3.5, duration: 1 },
      { note: "0.4", start: 4, duration: 1 },

      { note: "0.4", start: 5, duration: 1 },
      { note: "0.4", start: 5.5, duration: 1 },
      { note: "0.4", start: 6, duration: 1 },

      { note: "0.4", start: 7, duration: 1 },
      { note: "0.4", start: 7.5, duration: 1 },
      { note: "0.4", start: 7, duration: 1 },

      { note: "0.4", start: 8, duration: 1 },
      { note: "0.4", start: 8.5, duration: 1 },
      { note: "0.4", start: 9, duration: 1 },

      { note: "0.4", start: 10, duration: 1 },
      { note: "0.4", start: 10.5, duration: 1 },
      { note: "0.4", start: 11, duration: 1 },

      { note: "0.4", start: 12, duration: 1 },
      { note: "0.4", start: 12.5, duration: 1 },
      { note: "0.4", start: 13, duration: 1 },

      { note: "0.4", start: 14, duration: 1 },
      { note: "0.4", start: 14.5, duration: 1 },
      { note: "4.4", start: 15, duration: 1 },
    ],
    "melody",
    16,
  ),
];

(async () => {
  spec.state.name = "template"
  scale.setScale("C", "major");
//  Chord.progression([
//    Chord.makeChord("I").start(0),
//    Chord.makeChord("V").start(4),
//    Chord.makeChord("vi").start(8),
//    Chord.makeChord("IV").start(12),
//  ]);
  const progression = progressions[5]
  Chord.progression(progression.chords, progression.duration);

  // I set all of these to random and simply control the volume of various parts.
  // I may comment out lines that I don't want replaced
  //
  // I may move more towards a layout that's good for livecoding in the future
  const PART_COUNT = 10
  for (let i = 0; i<PART_COUNT; i++) {
//    randomizer.addRandomClip("snare", i);
//    randomizer.addRandomClip("kick", i);
//    randomizer.addRandomClip("fastperc", i);
//    randomizer.addRandomClip("perc1", i);
//    randomizer.addRandomClip("perc2", i);
//    randomizer.addRandomClip("arp", i);
//    randomizer.addRandomClip("chord", i);
//    randomizer.addRandomClip("rhythm1", i);
//    randomizer.addRandomClip("rhythm2", i);
//    randomizer.addRandomClip("bass", i);
//    randomizer.addRandomClip("pad", i);
//    util.randomChoice(melodies).setVelocity(Math.floor(Math.random() * 127)).setScene(i).save()
    randomizer.randomMelody(progression.duration, "melody", i).setVelocity(Math.floor(Math.random() * 127)).save();
  }

//  randomizer.setRandomBackground(2);
  const removeOldClips = false
  await ableton.sync(spec.state, removeOldClips);

  process.exit(0);
})()
