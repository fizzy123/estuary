const trackParts = {
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
  ]
  "snare": [
    "1offset",
    "2offset"
  ],
  "fastperc": [
    "8",
    "16"
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
  ],
  "arp": [
    "tonic8",
    "downArp8",
    "upAr8",
    "tonic16",
    "downArp16",
    "upArp16",
    "downArp8Half",
    "upArp8Half",
    "downUpArp8",
    "upDownArp8",
    "downArp16",
    "upArp16",
    "downUpArp16",
    "upDownArp16",
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
    "tonic5Offset",
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
  "rhythm2": [
    "tonic4",
    "downArp4",
    "upArp4",
    "tonic2Offset",
    "tonic1Offset",
    "tonic5Offset",
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
  "bass": [
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
  const trackCount =  Math.floor((trackParts.length - 1) * Math.random()) + 1;
  for (let i = 0; i<trackCount; i++) {
    addPart(totalTracks);
  }
  let programText = ""
  for (const trackName in totalTracks) {
    programText = programText + `Clip.makeNamedClip("${totalTracks[trackName].part}", "${trackName}").sound("${totalTracks[trackName].sound}").save();\n`
  }
  programText = programText + `spec.transition()\n`
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
