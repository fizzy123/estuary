const util = require("./util");
const spec = require("./spec");
const Clip = require("./clip");
const Chord = require("./chord");
const ableton = require("./ableton");
const scale = require("./scale");
const randomizer = require("./randomizer");

scale.setScale("G", "major");
const progressions = [
  {
    chords: [
      Chord.makeChord("I").invert(2).start(0),
      Chord.makeChord("vi").addInterval("min7").start(4),
      Chord.makeChord("I").addInterval("maj7").start(6),
      Chord.makeChord("iii").addInterval("min7").start(8),
      Chord.makeChord("V").addInterval("min7").start(12),
      Chord.makeChord("ii").addInterval("min7").start(16),
      Chord.makeChord("vi").addInterval("min7").start(20),
      Chord.makeChord("iv").start(24),
      Chord.makeChord("V").start(28),
    ],
    duration: 32,
  },
  {
    chords: [
      Chord.makeChord("I").invert(1).addInterval("maj7").alter(3, -12).start(0),
      Chord.makeChord("vi").addInterval("min7").start(4),
      Chord.makeChord("ii").alter("2", -1).start(8),
      Chord.makeChord("V").addInterval("min7").start(12),
      Chord.makeChord("I").invert(1).addInterval("maj7").alter(3, -12).start(16),
      Chord.makeChord("vi").addInterval("min7").start(20),
      Chord.makeChord("I").addInterval("maj7").start(22),
      Chord.makeChord("ii").start(24),
      Chord.makeChord("IV").addInterval("maj7").start(28),
      Chord.makeChord("V").start(30),
    ],
    duration: 32,
  },
  {
    chords: [
      Chord.makeChord("ii").addInterval("min7").start(0),
      Chord.makeChord("iii").addInterval("min7").start(4),
      Chord.makeChord("vi").addInterval("min7").start(8),
      Chord.makeChord("II").start(12),
      Chord.makeChord("II").addInterval("min7").start(16),
      Chord.makeChord("III").addInterval("min7").start(20),
      Chord.makeChord("IV").addInterval("maj7").start(24),
    ],
    duration: 32,
  },
//  {
//    chords: [
//      Chord.makeChord("I").start(0),
//      Chord.makeChord("IV").start(4),
//      Chord.makeChord("vi").start(8),
//      Chord.makeChord("V").start(12),
//    ],
//    duration: 16,
//  },
//  {
//    chords: [
//      Chord.makeChord("I").start(0),
//      Chord.makeChord("V").start(4),
//      Chord.makeChord("vi").start(8),
//      Chord.makeChord("iii").start(12),
//      Chord.makeChord("IV").start(16),
//      Chord.makeChord("I").start(20),
//      Chord.makeChord("IV").start(24),
//      Chord.makeChord("V").start(28),
//    ],
//    duration: 32,
//  },
//  {
//    chords: [
//      Chord.makeChord("vi").start(0),
//      Chord.makeChord("IV").start(4),
//      Chord.makeChord("I").start(8),
//      Chord.makeChord("V").start(12),
//    ],
//    duration: 16,
//  },
//  {
//    chords: [
//      Chord.makeChord(1).invert(1).start(0),
//      Chord.makeChord(6).invert(1).start(4),
//      Chord.makeChord(3).alter(1, 1).invert(1).start(8),
//      Chord.makeChord(2).invert(1).start(12),
//      Chord.makeChord(4).invert(1).start(16),
//      Chord.makeChord(2).invert(1).start(20),
//      Chord.makeChord(5).invert(1).start(24),
//      Chord.makeChord(7).invert(1).start(28),
//    ],
//    duration: 32,
//  },
//  {
//    chords: [
//      Chord.makeChord(1).invert(1).start(0),
//      Chord.makeChord(3).start(4),
//      Chord.makeChord(2).start(8),
//      Chord.makeChord(6).start(12),
//      Chord.makeChord(4).invert(1).start(16),
//      Chord.makeChord(4).alter(1,-1).start(20),
//      Chord.makeChord(3).start(24),
//      Chord.makeChord(5).invert(1).start(28),
//    ],
//    duration: 32,
//  },
//  {
//    chords: [
//      Chord.makeChord(1).invert(1).start(0),
//      Chord.makeChord(1).start(4),
//      Chord.makeChord(3).start(8),
//      Chord.makeChord(5).start(12),
//      Chord.makeChord(4).invert(1).start(16),
//      Chord.makeChord(4).alter(1,-1).start(20),
//      Chord.makeChord(6).start(24),
//      Chord.makeChord(5).invert(1).start(28),
//    ],
//    duration: 32,
//  },
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

const baseParts = [
  ["arp", "snare"],
  ["snare"],
];

(async () => {
  spec.state.name = "template"
  let progressionIndex = 0
  const progression = progressions[progressionIndex]
  const SONG_LENGTH = 1280
  let currentLength = 0
  while (currentLength < SONG_LENGTH) {
    let progression = progressions[progressionIndex]
    Chord.progression(progression.chords, progression.duration);

    let smallParts = util.randomCombination(["perc1", "perc2", "fastperc", "rhythm1", "rhythm2", "chord"], 2)
    let bigParts = util.randomChoice(baseParts).slice().concat(util.randomChoice([
      ["kick", "bass"],
      ["kick"],
      [],
    ]))
    util.shuffle(bigParts)
    let parts = smallParts.concat(bigParts)

    console.log(parts)
    for (let i=0; i<parts.length; i++) {
      let part = parts[i]
      let startTime = currentLength
      let loopStart
      if (i < 3) {
        if (["bass", "arp", "chord", "rhythm1", "rhythm2"].includes(part)) {
          loopStart = progression.duration / 4 * (i + 1) * 2 % progression.duration
        }
        startTime = currentLength + progression.duration / 4 * (i + 1) * 2
      }
      let clip = randomizer.addRandomClip(part, 0)
      if (i !== 3 &&
          ["kick", "fastperc", "perc1", "perc2"].includes(part) &&
          Math.random() < 0.60) {
        clip = Clip.makeNamedClip("random", part)
      }

      if (loopStart !== undefined) {
        clip.setLoopStart(loopStart);
      }
      clip.addToArrangement(startTime, currentLength + progression.duration * 2).save();
    }

    Clip.makeNamedClip("chord4", "pad")
      .setSceneNumber(0)
      .addToArrangement(currentLength, currentLength + progression.duration * 2)
      .save();

    if ((parts.slice(3, parts.length).includes("bass") && Math.random() < 0.5) ||
        (parts.slice(3, parts.length).includes("bass") && Math.random() < 0.5) ||
        Math.random() < 0.25) {
      Clip.makeNamedClip(util.randomChoice([
        "chord4",
        "chord8",
        "chord1",
        "chord3",
        "chord6",
        "chord2Offset",
        "chord1Offset",
      ]),
      "fill")
      .setSceneNumber(0)
      .addToArrangement(currentLength, currentLength + progression.duration * 2)
      .save();
    }
    
    spec.state.fx.push({
      type: 0,
      start: currentLength + progression.duration * 2 - 2
    })

    spec.state.fx.push({
      type: 1,
      start: currentLength + progression.duration * 2
    })

    randomizer.randomMelody(progression.duration, "melody", 0)
      .setVelocity(Math.floor(Math.random() * 127))
      .addToArrangement(currentLength, currentLength + progression.duration * 2)
      .save();
    await ableton.sync(spec.state, false);
    spec.state.clips = {}
    spec.state.fx = []
    // add fills and cuts
    fillCount = 8
    let fastTracks = ["arp", "fastperc"]
    for (let i = 0; i< fillCount; i++) {
      let genTrack = util.randomChoice(Object.keys(randomizer.trackParts))
      let fastTrack = util.randomChoice(fastTracks)
      // add cuts
      let start = i * 8 + Math.floor(Math.random() * 2) * 4
      if (Math.random() < 0.5 && ((start % 4) === 0)) {
        let cutParts = parts.slice()
        cutParts = cutParts.concat([
          "fill",
          "pad",
          "melody",
        ])
        for (let part of cutParts) {
          if (part !== genTrack && part !== fastTrack) {
            let cutClip = new Clip({
              notes: [],
              track: part,
              loopLength: 2,
            })
            cutClip
              .setSceneNumber(0)
              .addToArrangement(currentLength + start + 2, currentLength + start + 4)
              .save()
          }
        }
        // add fx to cuts
        spec.state.fx.push({
          type: 0,
          start: currentLength + start + 2
        })
    
        spec.state.fx.push({
          type: 1,
          start: currentLength + start + 4
        })
      }
      // add fill
      for (let fillTrack of [fastTrack, genTrack]) {
        let clip = randomizer.addRandomClip(fillTrack, 0)
        let isFastFill = ["arp", "fastperc"].includes(fillTrack)
        if (util.isMelodic(fillTrack)) {
          if (isFastFill) {
            clip = clip.slice((start % clip.loopLength) + 2, (start % clip.loopLength) + 4)
            clip.notes = clip.notes.map((note) => {
              note.start = note.start - (start % clip.loopLength + 2)
              return note
            })
          } else {
            clip = clip.slice(start % clip.loopLength, (start % clip.loopLength) + 4)
            clip.notes = clip.notes.map((note) => {
              note.start = note.start - (start % clip.loopLength)
              return note
            })
          }
        }
        if (util.isMelodic(fillTrack)) {
          if (isFastFill) {
            clip.loopLength = 2
          } else {
            clip.loopLength = 4
          }
        }
        if (isFastFill) {
          clip.addToArrangement(currentLength + start + 2, currentLength + start + 4).save();
        } else {
          clip.addToArrangement(currentLength + start, currentLength + start + 2).save();
        }
      }
      await ableton.sync(spec.state, false);
      spec.state.clips = {}
      spec.state.fx = []
    }
    currentLength = currentLength + progression.duration * 2
    progressionIndex = (progressionIndex + 1) % progressions.length
  }

/*
  // I set all of these to random and simply control the volume of various parts.
  // I may comment out lines that I don't want replaced
  //
  // I may move more towards a layout that's good for livecoding in the future
  // live
  const PART_COUNT = 50
  const offset = 36
  for (let i = 0; i<PART_COUNT; i++) {
   randomizer.addRandomClip("snare", i);
   randomizer.addRandomClip("kick", i);
   randomizer.addRandomClip("fastperc", i);
   randomizer.addRandomClip("perc1", i);
   randomizer.addRandomClip("perc2", i);
//   randomizer.addRandomClip("arp", i + offset);
//   randomizer.addRandomClip("chord", i + offset);
//   randomizer.addRandomClip("rhythm1", i + offset);
//   randomizer.addRandomClip("rhythm2", i + offset);
//   randomizer.addRandomClip("bass", i + offset);
//    util.randomChoice(melodies).setVelocity(Math.floor(Math.random() * 127)).setScene(i).save()
  }
  randomizer.addRandomClip("pad", offset);

  randomizer.randomMelody(progression.duration, "melody", 0)
    .setVelocity(Math.floor(Math.random() * 127))
    .addToArrangement(currentLength, currentLength + progression.duration)
    .save();

//  randomizer.setRandomBackground(2);
*/
  
  // compose
  

  process.exit(0);
})()

