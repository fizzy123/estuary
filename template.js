const spec = require("./spec");
const ableton = require("./ableton");

spec.addNamedClip("2snareBeat");
spec.progression([
  spec.makeChord("I").start(0),
  spec.makeChord("ii").start(4),
  spec.makeChord("vi").start(8),
  spec.makeChord("V").start(12),
]);
spec.addNamedClip("downArp4", "arp");
ableton.sync(spec.state);
