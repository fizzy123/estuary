const assert = require('assert/strict');
const spec = require("../spec");
const Clip = require("../clip");
const Chord = require("../chord");
const scale = require("../scale");

describe("create named clip", function() {
  it("should create named clips properly", () => {
    const namedClip = Clip.makeNamedClip("2offset","snare").save();
    assert.deepEqual(namedClip, new Clip({
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
      track: "snare",
    }));
  });

  it("should fail creating melody if no progression and interval notes", () => {
    delete spec.state.scale
    try {
      Clip.makeClip([{
        note: "root.4",
        start: 1,
        duration: 1,
      }], "test", 4)
    } catch(e) {
      assert.equal(e.message, "scale required to be set if providing interval notes");
      return
    }
    throw new Error("should have errored")
  });

  it("should fail creating melody if no progression and scale degrees", () => {
    delete spec.state.scale
    try {
      Clip.makeClip([{
        note: "0.4",
        start: 1,
        duration: 1,
      }], "test", 4)
    } catch(e) {
      assert.equal(e.message, "scale required to be set if providing scale degrees");
      return
    }
    throw new Error("should have errored")
  });


  it("should fail creating chordMapping if no progression", () => {
    spec.state.scale = {
      root: "C",
      keySignature: scale.keySignatures["major"],
      name: "major",
    }
    try {
      Clip.makeNamedClip("downArp4", "arps").save();
    } catch (e) {
      assert.equal(e.message, "No progression found. Please set progression before adding a chord mapping");
      return
    }
    throw new Error("should have errored")
  });

  it("should create melody with interval notes", () => {
    const clip = Clip.makeClip([{
      note: "root.4",
      start: 1,
      duration: 1,
    }], "test", 4)
    assert.deepEqual(clip, new Clip({
      notes: [{
        pitch: 60,
        start: 1,
        duration: 1,
      }],
      track: "test",
      loopLength: 4,
    }));
  });

  it("should create melody with scale degrees", () => {
    const clip = Clip.makeClip([{
      note: "0.4",
      start: 1,
      duration: 1,
    }], "test", 4)
    assert.deepEqual(clip, new Clip({
      notes: [{
        pitch: 60,
        start: 1,
        duration: 1,
      }],
      track: "test",
      loopLength: 4,
    }));
  });

  it("should create chordMapping correctly with progression", () => {
    Chord.progression([
      Chord.makeChord("I").invert(1).start(0),
      Chord.makeChord("ii").start(4),
      Chord.makeChord("vi").start(8),
      Chord.makeChord("V").start(12),
    ]);
    const namedClip = Clip.makeNamedClip("downArp4", "arps").save();
    assert.deepEqual(namedClip, new Clip({
      notes: [
        {
          pitch: 72,
          start: 0,
          duration: 0.75,
        },
        {
          pitch: 67,
          start: 1,
          duration: 0.75,
        },
        {
          pitch: 64,
          start: 2,
          duration: 0.75,
        },
        {
          pitch: 60,
          start: 3,
          duration: 0.75,
        },
        {
          pitch: 69,
          start: 4,
          duration: 0.75,
        },
        {
          pitch: 65,
          start: 5,
          duration: 0.75,
        },
        {
          pitch: 62,
          start: 6,
          duration: 0.75,
        },
        {
          pitch: 57,
          start: 7,
          duration: 0.75,
        },
        {
          pitch: 76,
          start: 8,
          duration: 0.75,
        },
        {
          pitch: 72,
          start: 9,
          duration: 0.75,
        },
        {
          pitch: 69,
          start: 10,
          duration: 0.75,
        },
        {
          pitch: 64,
          start: 11,
          duration: 0.75,
        },
        {
          pitch: 74,
          start: 12,
          duration: 0.75,
        },
        {
          pitch: 71,
          start: 13,
          duration: 0.75,
        },
        {
          pitch: 67,
          start: 14,
          duration: 0.75,
        },
        {
          pitch: 62,
          start: 15,
          duration: 0.75,
        },
      ],
      loopLength: 16,
      track: "arps",
    }));
  });

  it("should create chordMapping correctly with start and endtime", () => {
    Chord.progression([
      Chord.makeChord("I").start(0),
      Chord.makeChord("ii").start(4),
      Chord.makeChord("vi").start(8),
      Chord.makeChord("V").start(12),
    ]);
    const namedClip = Clip.makeNamedClip("downArp4", "arps").addToArrangement(0, 16).save();
    assert.deepEqual(namedClip, new Clip({
      notes: [
        {
          pitch: 67,
          start: 0,
          duration: 0.75,
        },
        {
          pitch: 64,
          start: 1,
          duration: 0.75,
        },
        {
          pitch: 60,
          start: 2,
          duration: 0.75,
        },
        {
          pitch: 55,
          start: 3,
          duration: 0.75,
        },
        {
          pitch: 69,
          start: 4,
          duration: 0.75,
        },
        {
          pitch: 65,
          start: 5,
          duration: 0.75,
        },
        {
          pitch: 62,
          start: 6,
          duration: 0.75,
        },
        {
          pitch: 57,
          start: 7,
          duration: 0.75,
        },
        {
          pitch: 76,
          start: 8,
          duration: 0.75,
        },
        {
          pitch: 72,
          start: 9,
          duration: 0.75,
        },
        {
          pitch: 69,
          start: 10,
          duration: 0.75,
        },
        {
          pitch: 64,
          start: 11,
          duration: 0.75,
        },
        {
          pitch: 74,
          start: 12,
          duration: 0.75,
        },
        {
          pitch: 71,
          start: 13,
          duration: 0.75,
        },
        {
          pitch: 67,
          start: 14,
          duration: 0.75,
        },
        {
          pitch: 62,
          start: 15,
          duration: 0.75,
        },
      ],
      startTime: 0,
      endTime: 16,
      loopLength: 16,
      track: "arps",
    }));
  });

  it("should create chordMapping correctly with velocity", () => {
    Chord.progression([
      Chord.makeChord("I").start(0),
      Chord.makeChord("ii").start(4),
      Chord.makeChord("vi").start(8),
      Chord.makeChord("V").start(12),
    ]);
    const namedClip = Clip.makeNamedClip("downArp4", "arps").setVelocity(50).save();
    assert.deepEqual(namedClip, new Clip({
      notes: [
        {
          pitch: 67,
          start: 0,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 64,
          start: 1,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 60,
          start: 2,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 55,
          start: 3,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 69,
          start: 4,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 65,
          start: 5,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 62,
          start: 6,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 57,
          start: 7,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 76,
          start: 8,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 72,
          start: 9,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 69,
          start: 10,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 64,
          start: 11,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 74,
          start: 12,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 71,
          start: 13,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 67,
          start: 14,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 62,
          start: 15,
          duration: 0.75,
          velocity: 50,
        },
      ],
      loopLength: 16,
      track: "arps",
    }));
  });


  it("should make scale chords", () => {
    Chord.progression([
      Chord.makeScaleChord(0, [2,4]).start(0),
      Chord.makeScaleChord(1, [2,4]).start(4),
      Chord.makeScaleChord(5, [2,4]).start(8),
      Chord.makeScaleChord(4, [2,4]).start(12),
    ]);
    const namedClip = Clip.makeNamedClip("downArp4", "arps").save();
    assert.deepEqual(namedClip, new Clip({
      notes: [
        {
          pitch: 67,
          start: 0,
          duration: 0.75,
        },
        {
          pitch: 64,
          start: 1,
          duration: 0.75,
        },
        {
          pitch: 60,
          start: 2,
          duration: 0.75,
        },
        {
          pitch: 55,
          start: 3,
          duration: 0.75,
        },
        {
          pitch: 69,
          start: 4,
          duration: 0.75,
        },
        {
          pitch: 65,
          start: 5,
          duration: 0.75,
        },
        {
          pitch: 62,
          start: 6,
          duration: 0.75,
        },
        {
          pitch: 57,
          start: 7,
          duration: 0.75,
        },
        {
          pitch: 76,
          start: 8,
          duration: 0.75,
        },
        {
          pitch: 72,
          start: 9,
          duration: 0.75,
        },
        {
          pitch: 69,
          start: 10,
          duration: 0.75,
        },
        {
          pitch: 64,
          start: 11,
          duration: 0.75,
        },
        {
          pitch: 74,
          start: 12,
          duration: 0.75,
        },
        {
          pitch: 71,
          start: 13,
          duration: 0.75,
        },
        {
          pitch: 67,
          start: 14,
          duration: 0.75,
        },
        {
          pitch: 62,
          start: 15,
          duration: 0.75,
        },
      ],
      loopLength: 16,
      track: "arps",
    }));
  });

  it("should merge clips properly", () => {
    Chord.progression([
      Chord.makeChord("I").start(0),
      Chord.makeChord("ii").start(4),
      Chord.makeChord("vi").start(8),
      Chord.makeChord("V").start(12),
    ]);
    const namedClip = Clip.makeNamedClip("downArp4", "arps").merge(Clip.makeNamedClip("upArp4", "arps"), 8).save();
    assert.deepEqual(namedClip, new Clip({
      notes: [
        {
          pitch: 67,
          start: 0,
          duration: 0.75,
        },
        {
          pitch: 64,
          start: 1,
          duration: 0.75,
        },
        {
          pitch: 60,
          start: 2,
          duration: 0.75,
        },
        {
          pitch: 55,
          start: 3,
          duration: 0.75,
        },
        {
          pitch: 69,
          start: 4,
          duration: 0.75,
        },
        {
          pitch: 65,
          start: 5,
          duration: 0.75,
        },
        {
          pitch: 62,
          start: 6,
          duration: 0.75,
        },
        {
          pitch: 57,
          start: 7,
          duration: 0.75,
        },
        {
          pitch: 64,
          start: 8,
          duration: 0.75,
        },
        {
          pitch: 69,
          start: 9,
          duration: 0.75,
        },
        {
          pitch: 72,
          start: 10,
          duration: 0.75,
        },
        {
          pitch: 76,
          start: 11,
          duration: 0.75,
        },
        {
          pitch: 62,
          start: 12,
          duration: 0.75,
        },
        {
          pitch: 67,
          start: 13,
          duration: 0.75,
        },
        {
          pitch: 71,
          start: 14,
          duration: 0.75,
        },
        {
          pitch: 74,
          start: 15,
          duration: 0.75,
        },
      ],
      loopLength: 16,
      track: "arps",
    }));
  });

  it("should create chords from alternate scales properly", () => {
    scale.setScale("D", "major");
    Chord.progression([
      Chord.makeChord("I").start(0),
      Chord.makeChord("ii").start(4),
      Chord.makeChord("vi").start(8),
      Chord.makeChord("V").start(12),
    ]);
    const namedClip = Clip.makeNamedClip("downArp4", "arps").save();
    assert.deepEqual(namedClip, new Clip({
      notes: [
        {
          pitch: 69,
          start: 0,
          duration: 0.75,
        },
        {
          pitch: 66,
          start: 1,
          duration: 0.75,
        },
        {
          pitch: 62,
          start: 2,
          duration: 0.75,
        },
        {
          pitch: 57,
          start: 3,
          duration: 0.75,
        },
        {
          pitch: 71,
          start: 4,
          duration: 0.75,
        },
        {
          pitch: 67,
          start: 5,
          duration: 0.75,
        },
        {
          pitch: 64,
          start: 6,
          duration: 0.75,
        },
        {
          pitch: 59,
          start: 7,
          duration: 0.75,
        },
        {
          pitch: 78,
          start: 8,
          duration: 0.75,
        },
        {
          pitch: 74,
          start: 9,
          duration: 0.75,
        },
        {
          pitch: 71,
          start: 10,
          duration: 0.75,
        },
        {
          pitch: 66,
          start: 11,
          duration: 0.75,
        },
        {
          pitch: 76,
          start: 12,
          duration: 0.75,
        },
        {
          pitch: 73,
          start: 13,
          duration: 0.75,
        },
        {
          pitch: 69,
          start: 14,
          duration: 0.75,
        },
        {
          pitch: 64,
          start: 15,
          duration: 0.75,
        },
      ],
      loopLength: 16,
      track: "arps",
    }));
  });

  it("should set volocity properly", () => {
    scale.setScale("D", "major");
    Chord.progression([
      Chord.makeChord("I").start(0),
      Chord.makeChord("ii").start(4),
      Chord.makeChord("vi").start(8),
      Chord.makeChord("V").start(12),
    ]);
    const namedClip = Clip.makeNamedClip("downArp4", "arps").setVelocity(50).save();
    assert.deepEqual(namedClip, new Clip({
      notes: [
        {
          pitch: 69,
          start: 0,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 66,
          start: 1,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 62,
          start: 2,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 57,
          start: 3,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 71,
          start: 4,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 67,
          start: 5,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 64,
          start: 6,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 59,
          start: 7,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 78,
          start: 8,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 74,
          start: 9,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 71,
          start: 10,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 66,
          start: 11,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 76,
          start: 12,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 73,
          start: 13,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 69,
          start: 14,
          duration: 0.75,
          velocity: 50,
        },
        {
          pitch: 64,
          start: 15,
          duration: 0.75,
          velocity: 50,
        },
      ],
      loopLength: 16,
      track: "arps",
    }));
  });
});
