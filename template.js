const spec = require("./spec");
const Clip = require("./clip");
const Chord = require("./chord");
const ableton = require("./ableton");
const scale = require("./scale");
const randomizer = require("./randomizer");

(async () => {
  scale.setScale("C", "major");
  Chord.progression({
    chords: [
      Chord.makeChord(1).start(0),
      Chord.makeChord(2).start(4),
      Chord.makeChord(6).start(8),
      Chord.makeChord(5).start(12),
    ],
    duration: 16}
  );
  Clip.addNamedClip("upArp8", trackName, 0);
  randomizer.addRandomClip("arp", 0);
//
//  // I set all of these to random and simply control the volume of various parts.
//  // I may comment out lines that I don't want replaced
//  //
//  // I may move more towards a layout that's good for livecoding in the future
//  Clip.addNamedClip("upArp8")
//  randomizer.addRandomClip("snare");
//  randomizer.addRandomClip("kick");
//  randomizer.addRandomClip("fastperc");
//  randomizer.addRandomClip("perc1");
//  randomizer.addRandomClip("perc2");
//  randomizer.addRandomClip("chord");
//  randomizer.addRandomClip("rhythm1");
//  randomizer.addRandomClip("rhythm2");
//  randomizer.addRandomClip("bass");
//  const removeOldClips = false
  await ableton.sync(spec.state, false);

  process.exit(0);
})()
