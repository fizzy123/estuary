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
  for (let progressionIndex = 0; progressionIndex < progressions.length; progressionIndex++) {
    console.log(progressions[progressionIndex])
    Chord.progression(progressions[progressionIndex].chords, progressions[progressionIndex].duration)
    let offset = 2 * progressionIndex

    let partName = util.randomChoice(randomizer.trackParts["arp.16"])
    Clip.makeNamedClip(partName, "arp1 16").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()

    partName = util.randomChoice(randomizer.trackParts["arp.32"])
    Clip.makeNamedClip(partName, "arp1 32").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()

    partName = util.randomChoice(randomizer.trackParts["arp.16"])
    Clip.makeNamedClip(partName, "arp2 16").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()

    partName = util.randomChoice(randomizer.trackParts["arp.32"])
    Clip.makeNamedClip(partName, "arp2 32").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()

    Clip.makeNamedClip("tonic16", "bassline 16").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()
    Clip.makeNamedClip("tonic8", "bassline 8").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()

    partName = util.randomChoice(randomizer.trackParts["rhythm.4"])
    Clip.makeNamedClip(partName, "rhythm 4").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()

    partName = util.randomChoice(randomizer.trackParts["rhythm.8"])
    Clip.makeNamedClip(partName, "rhythm 8").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()

    partName = util.randomChoice(randomizer.trackParts["rhythm.triplet"])
    Clip.makeNamedClip(partName, "rhythm triplet").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()

    Clip.makeNamedClip("tonic6", "rhythm 6").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()
    Clip.makeNamedClip("tonic4Offset", "rhythm 4 offset").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()


    Clip.makeNamedClip("chord4", "chord rhythm 4").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()
    Clip.makeNamedClip("chord6", "chord rhythm 6").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()
    Clip.makeNamedClip("chord4Offset", "chord rhythm 4 offset").setSceneNumber(offset).setVelocity(Math.floor(Math.random() * 127)).save()
  }
  await ableton.sync(spec.state, false);

  process.exit(0);
})()

