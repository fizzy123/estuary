const util = require("./util");
const chordMapping = require("./chordMapping");
const spec = require("./spec");
const scale = require("./scale");
const Clip = require("./clip");

exports.trackParts = {
  "kick": [
    "4",
    "3",
    "6",
    "3alt1",
    "3alt2",
    "3alt3",
    "fastSyncopate1",
    "12alt",
    "3alt4",
    "3skip1",
    "3skip2",
  ],
  "snare": [
    "1offset",
    "2offset",
    "2offsetAlt1",
  ],
  "fastperc": [
    "6",
    "8",
    "16",
    "fastSyncopate1",
    "12alt",
  ],
  "perc1": [
    "4",
    "1offset",
    "2offset",
    "4offset",
    "3",
    "3alt1",
    "3alt2",
    "3alt3",
    "fastSyncopate1",
    "12alt",
    "3alt4",
    "3skip1",
    "3skip2",
    "2offsetAlt1",
    "4offsetAlt1",
  ],
  "perc2": [
    "4",
    "1offset",
    "2offset",
    "4offset",
    "3",
    "3alt1",
    "3alt2",
    "3alt3",
    "fastSyncopate1",
    "12alt",
    "3alt4",
    "3skip1",
    "3skip2",
    "2offsetAlt1",
    "4offsetAlt1",
  ],
  "arp": [
    "tonic16",
    "downArp16",
    "upArp16",
    "downArp32",
    "upArp32",
    "downArp16",
    "upArp16",
    "downUpArp16",
    "upDownArp16",
  ],
  "arp.16": [
    "tonic16",
    "downArp16",
    "upArp16",
    "downArp16",
    "upArp16",
    "downUpArp16",
    "upDownArp16",
  ],
  "arp.32": [
    "downArp32",
    "upArp32",
  ],
  "chord": [
    "chord4",
    "chord2Offset",
    "chord1Offset",
    "chord1",
    "chord4Offset",
    "chord3",
    "chord6",
  ],
  "rhythm1": [
    "tonic4",
    "downArp4",
    "upArp4",
    "tonic2Offset",
    "tonic1Offset",
    "tonic4Offset",
    "tonic3",
    "tonic6",
    "tonic3alt1",
    "tonic3alt2",
    "tonic3alt3",
    "tonicFastSyncopate1",
    "tonic12",
    "tonic3alt4",
    "mixArp4",
    "mixArp4Alt1",
    "mixArp3",
    "mixArp3Alt1",
    "mixArp3Alt2",
    "tonic8",
    "downArp8",
    "upArp8",
    "downArp8Half",
    "upArp8Half",
    "downUpArp8",
    "upDownArp8",
  ],
  "rhythm2": [
    "tonic4",
    "downArp4",
    "upArp4",
    "tonic2Offset",
    "tonic1Offset",
    "tonic4Offset",
    "tonic3",
    "tonic6",
    "tonic3alt1",
    "tonic3alt2",
    "tonic3alt3",
    "tonicFastSyncopate1",
    "tonic12",
    "tonic3alt4",
    "mixArp4",
    "mixArp4Alt1",
    "mixArp3",
    "mixArp3Alt1",
    "mixArp3Alt2",
  ],
  "rhythm.4": [
    "tonic4",
    "downArp4",
    "upArp4",
    "mixArp4",
    "mixArp4Alt1",
  ],
  "rhythm.8": [
    "tonic8",
    "downArp8",
    "upArp8",
    "downArp8Half",
    "upArp8Half",
    "downUpArp8",
    "upDownArp8",
  ],
  "rhythm.3": [
    "tonic3",
    "tonic3alt1",
    "tonic3alt2",
    "tonic3alt3",
    "tonic3alt4",
    "mixArp3",
    "mixArp3Alt1",
    "mixArp3Alt2",
  ],
  "rhythm.triplet":[
    "upArpTriplet1",
    "downArpTriplet1",
    "upArpTriplet2",
    "downArpTriplet2",
    "upArpTriplet4",
    "downArpTriplet4",
  ],
  "chord": [
    "chord4",
    "chord2Offset",
    "chord1Offset",
    "chord1",
    "chord4Offset",
    "chord3",
    "chord6",
  ],
  "bass": [
    "tonic3",
    "tonic6",
    "tonic3alt1",
    "tonic3alt2",
    "tonic3alt3",
    "tonicFastSyncopate1",
    "tonic12",
    "tonic3alt4",
    "mixArp4Alt1",
    "mixArp3",
    "mixArp3Alt1",
    "mixArp3Alt2",
  ],
}

const melodicTracks = [
  "arp",
  "chord",
  "rhythm1",
  "rhythm2",
  "bass",
];
const generateSection = () => {
  // Pick a melodic track as a first track to ensure that we have something melodic at least.
  const totalTracks = {};
  const firstTrack = melodicTracks[Math.floor(Math.random() * melodicTracks.length)];
  totalTracks[firstTrack] = selectPart(firstTrack);
  const trackCount =  Math.floor((trackParts.length - 4) * Math.random()) + 4;
  for (let i = 0; i<trackCount; i++) {
    addPart(totalTracks);
  }
  let programText = ""
  for (const trackName in totalTracks) {
    programText = programText + `Clip.makeNamedClip("${totalTracks[trackName].part}", "${trackName}").sound("${totalTracks[trackName].sound}").save();\n`
  }
}

const addPart = (totalTracks) => {
  const trackSelection = Object.keys(trackParts)[Math.floor(trackParts.length * Math.random())];
  totalTracks[trackSelection] = selectPart(trackSelection);
}

const selectPart = (trackName) => {
  return {
    part: util.randomChoice(trackParts[trackName]),
    sound: Math.floor(Math.random() * 127),
  }
}

exports.addRandomClip = (trackName, sceneNumber) => {
  let partOptions = exports.trackParts[trackName].slice()
  const partName = util.randomChoice(partOptions)
  return Clip.makeNamedClip(partName, trackName).setVelocity(Math.floor(Math.random() * 127)).setSceneNumber(sceneNumber).save();
}

const randTracks = [
  "fastperc",
  "perc1",
  "perc2",
  "arp",
  "rhythm1",
  "rhythm2",
]
const randomClipLength = 32 * 4
exports.setRandomBackground = (density) => {
  const trackNotes = {}
  for (const track of randTracks) {
    trackNotes[track] = []
  }
  for (let i = 0; i<density; i++) {
    let localTime = 0
    while (localTime < randomClipLength) {
      let trackSelection = randTracks[Math.floor(randTracks.length * Math.random())];
      if (melodicTracks.includes(trackSelection)) {
        const partName = util.randomChoice(exports.trackParts[trackSelection])
        const clip = Clip.makeNamedClip(partName, trackSelection).setVelocity(Math.floor(Math.random() * 127));
        const clipStart = localTime % clip.loopLength
        const offset = Math.floor(localTime / clip.loopLength) * clip.loopLength
        let clipLength = 4
        if (partName.slice(-1) === "8") {
          clipLength = 2
        } else if (partName.slice(-2) === "16") {
          clipLength = 1
        } else if (partName === "tonic3alt3") {
          clipLength = 8
        }
        const sliceNotes = clip.slice(clipStart, clipStart + clipLength).notes
        for (const note of sliceNotes) {
          note.start = note.start + offset
        }
        trackNotes[trackSelection] = trackNotes[trackSelection].concat(sliceNotes)
        localTime = localTime + clipLength
        if (clipLength === 1) {
          localTime = localTime + 1;
        }
      } else {
        const partName = util.randomChoice(exports.trackParts[trackSelection])
        const clip = Clip.makeNamedClip(partName, trackSelection)
        for (const note of clip.notes) {
          note.velocity = Math.floor(Math.random() * 127);
          note.start = localTime + note.start;
        }
        trackNotes[trackSelection] = trackNotes[trackSelection].concat(clip.notes);
        localTime = localTime + clip.loopLength
        if (clip.loopLength === 1) {
          localTime = localTime + 1;
        }
      }
    }
  }
  for (const track in trackNotes) {
    (new Clip({
      notes: trackNotes[track],
      loopLength: randomClipLength,
      track: `${track}.rand`,
    })).save()
  }
}

const melodySegments = [
  { 
    partLength : 1,
    offsets: [
      {start: 0},
    ],
  },
  { 
    partLength : 2,
    offsets: [
      {start: 0},
    ],
  },
  { 
    partLength : 3,
    offsets: [
      {start: 0},
    ],
  },
  { 
    partLength : 0.5,
    offsets: [
      {start: 0},
    ],
  },
//  { 
//    partLength : 0.5,
//    offsets: [
//      {start: 0},
//      {start: 0.25},
//    ],
//  },
  { 
    partLength : 1.5,
    offsets: [
      {start: 0},
      {start: 0.75},
    ],
  },
  { 
    partLength : 1.5,
    offsets: [
      {start: 0},
    ],
  },
]

const sliceLengthOptions = [4,8,16]
exports.randomMelody1 = (loopLength, track, sceneNumber) => {
  let melodyMapping = [];
  let localTime = 0;
  while (localTime < loopLength) {
    let newPart = Object.assign({}, util.randomChoice(melodySegments))
    if (localTime === 0) {
      Object.assign({}, util.randomChoice(melodySegments.slice(1)))
    }
    for (let part of newPart.offsets) {
      if (Math.random() > 0.25 || part === newPart.offsets[0]) {
        melodyMapping.push({
          chordIndex: Math.floor(Math.random() * 4) * -1,
          start: localTime + part.start,
          octave: 0,
        });
      }
    }
    localTime = localTime + newPart.partLength;
  }

  // repeat sections
  const sliceLength = util.randomChoice(sliceLengthOptions.filter((x) => {
    return x < loopLength/2
  }));
  let sliceStart = Math.floor(Math.random() * loopLength/sliceLength) * sliceLength;
  let slice = []
  for (const note of melodyMapping) {
    if (note.start >= sliceStart && note.start < sliceStart + sliceLength) {
      slice.push(Object.assign({},note))
      slice[slice.length - 1].start = slice[slice.length - 1].start - sliceStart
    }
  }
  melodyMapping = slice

  if (melodyMapping[0].start === 0.25) {
    melodyMapping[0].start = 0
  }

  const notes = chordMapping.renderChordMapping(melodyMapping, spec.state.progression);
  notes[0].pitch = 60 + util.notes[spec.state.scale.root];
  if (Math.random() > 0.5) {
    notes[notes.length - 1].pitch = 60 + util.notes[spec.state.scale.root] + spec.state.scale.keySignature[6]
  } else {
    notes[notes.length - 1].pitch = 60 + util.notes[spec.state.scale.root] + spec.state.scale.keySignature[4]
  }
  return new Clip({
    notes,
    track,
    loopLength,
    sceneNumber,
  })
}

const melodyPrototypes = [
  {
    notes: [
      { start: 0 },
    ],
    loopLength: 1,
    addSizes: [ 0.5 ],
  },
  {
    notes: [
      { start: 0 },
    ],
    loopLength: 0.5,
    addSizes: [ ],
  },
  {
    notes: [
      { start: 1 },
    ],
    loopLength: 2,
    addSizes: [ 1, 0.5],
  },
  {
    notes: [
      { start: 0 },
      { start: 1.5 },
      { start: 3 },
    ],
    loopLength: 4,
    addSizes: [ 0.5 ],
  },
  {
    notes: [
      { start: 0 },
      { start: 0.75 },
      { start: 1.5 },
      { start: 2.25 },
      { start: 3 },
      { start: 3.5 },
    ],
    loopLength: 4,
    addSizes: [ ],
  }
]

exports.randomMelody = (loopLength, track, sceneNumber) => {
  let localTime = 0
  let melodyMapping = []
  const prototypeMelody = util.randomChoice(melodyPrototypes)
  while (loopLength/4 > localTime) {
    for (const note of prototypeMelody.notes) {
      melodyMapping.push({
        start: localTime + note.start,
        octave: 0,
        chordIndex: Math.floor(Math.random() * 4) * -1,
      });
    }
    localTime = localTime + prototypeMelody.loopLength
  }
  melodyMapping = melodyMapping.filter((note) => {
    return Math.random() < 0.75 && note.start < loopLength/4
  });
  const currentNoteLength = melodyMapping.length
  for (let i = 0; i < currentNoteLength; i++) {
    if (Math.random() < 0.25 && prototypeMelody.addSizes.length) {
      let start = melodyMapping[i].start

      let diff = util.randomChoice(prototypeMelody.addSizes)
      if (Math.random() > 0.5) {
        diff = diff * -1
        if (start === 0) {
          start = start + loopLength/4
        }
      }
      melodyMapping.push({
        start: start + diff,
        octave: 0,
        chordIndex: Math.floor(Math.random() * 4) * -1,
      });
    }
  }
  melodyMapping.sort((a, b) => {
    return a.start - b.start
  })
  const notes = chordMapping.renderChordMapping(melodyMapping, spec.state.progression);

  let pentatonicPitches = []
  for (const note of scale.keySignatures["major_pentatonic"]) {
    pentatonicPitches.push(72 + util.notes[spec.state.scale.root] + note)
  }

  for (let mappingIndex = 0; mappingIndex < melodyMapping.length; mappingIndex++) {
    let pitch = util.randomChoice(pentatonicPitches)
    if (Math.random() > 0.5) {
      for (let partIndex = 0; partIndex < 4; partIndex++) {
        notes[partIndex * melodyMapping.length + mappingIndex].pitch = pitch 
      }
    }
  }

  return new Clip({
    notes,
    track,
    loopLength: loopLength,
    sceneNumber,
  })
}

