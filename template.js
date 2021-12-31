const spec = require("./spec");
const Clip = require("./clip");
const Chord = require("./chord");
const ableton = require("./ableton");
const scale = require("./scale");
const randomizer = require("./randomizer");

(async () => {
  spec.state.name = "template"
  scale.setScale("C", "major");
  Chord.progression([
    Chord.makeChord("I").start(0),
    Chord.makeChord("ii").start(4),
    Chord.makeChord("vi").start(8),
    Chord.makeChord("V").start(12),
  ]);

  // I set all of these to random and simply control the volume of various parts.
  // I may comment out lines that I don't want replaced
  //
  // I may move more towards a layout that's good for livecoding in the future
  randomizer.addRandomClip("snare");
  randomizer.addRandomClip("kick");
  randomizer.addRandomClip("fastperc");
  randomizer.addRandomClip("perc1");
  randomizer.addRandomClip("perc2");
  randomizer.addRandomClip("arp");
  randomizer.addRandomClip("chord");
  randomizer.addRandomClip("rhythm1");
  randomizer.addRandomClip("rhythm2");
  randomizer.addRandomClip("bass");
  const removeOldClips = false
  await ableton.sync(spec.state, removeOldClips);

  process.exit(0);
})()
