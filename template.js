const spec = require("./spec");
const Clip = require("./clip");
const ableton = require("./ableton");

Clip.makeNamedClip("2snareBeat").save();
spec.progression([
  spec.makeChord("I").start(0),
  spec.makeChord("ii").start(4),
  spec.makeChord("vi").start(8),
  spec.makeChord("V").start(12),
]);
spec.makeNamedClip("downArp4", "arp").save();
ableton.sync(spec.state);
