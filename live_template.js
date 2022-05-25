const util = require("./util");
const spec = require("./spec");
const Clip = require("./clip");
const Chord = require("./chord");
const ableton = require("./ableton");
const scale = require("./scale");
const randomizer = require("./randomizer");

const PART_COUNT = 10

scale.setScale("C", "major");
(async () => {
  spec.state.name = "template"
  const setupProgressionIndex = 3

  progressions = await Chord.readAllChordClips() 
  console.log(progressions[2].chords.length);
  Chord.progression(progressions[setupProgressionIndex].chords, progressions[setupProgressionIndex].duration)

  for (let sceneNumber = 0; sceneNumber < PART_COUNT; sceneNumber++) {
    let partName = util.randomChoice(randomizer.trackParts["arp"])
    let offset = 11 * setupProgressionIndex
    Clip.makeNamedClip(partName, "arp 1").setSceneNumber(sceneNumber + offset).setVelocity(Math.floor(Math.random() * 127)).save()

    partName = util.randomChoice(randomizer.trackParts["arp"])
    Clip.makeNamedClip(partName, "arp 2").setSceneNumber(sceneNumber + offset).setVelocity(Math.floor(Math.random() * 127)).save()

    partName = util.randomChoice(randomizer.trackParts["rhythm1"])
    Clip.makeNamedClip(partName, "rhythm").setSceneNumber(sceneNumber + offset).setVelocity(Math.floor(Math.random() * 127)).save()

    partName = util.randomChoice(randomizer.trackParts["chord"])
    Clip.makeNamedClip(partName, "chord rhythm").setSceneNumber(sceneNumber + offset).setVelocity(Math.floor(Math.random() * 127)).save()
  }
  await ableton.sync(spec.state, false);

  process.exit(0);
})()

