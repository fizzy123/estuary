const assert = require('assert/strict');
const spec = require("../spec");
const Clip = require("../clip");

describe("create named clip", function() {
  it("should create named clips properly", () => {
    const namedClip = spec.addNamedClip("2snareBeat","snare");
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
      scene: 0,
    }));
  });

  it("should fail creating chordMapping if no progression", () => {
    try {
      spec.addNamedClip("downArp4", "arps");
    } catch (e) {
      assert.equal(e.message, "No progression found. Please set progression before adding a chord mapping");
    }
  });

  it("should create chordMapping correctly with progression", () => {
    spec.progression([
      spec.makeChord("I").start(0),
      spec.makeChord("ii").start(4),
      spec.makeChord("vi").start(8),
      spec.makeChord("V").start(12),
    ]);
    const namedClip = spec.addNamedClip("downArp4", "arps");
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
      scene: 0,
    }));
  });
});
