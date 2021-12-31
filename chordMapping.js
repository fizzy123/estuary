exports.renderChordMapping = (mapping, progression) => {
  let localTime = 0
  let rawNotes = []
  let mappingIndex = 0
  let duration = 4 // default value of 4
  while (localTime < progression.duration) {
    // extract current chord information from the current progression
    let chord = getChordFromProgression(progression, localTime + mapping[mappingIndex].start)

    // duration needs to be computed based off of the next note in the mapping with a different start time
    // get next note in mapping with a different start time
    var durationCursor = mappingIndex + 1
    while (mapping[durationCursor]) {
      if (mapping[durationCursor].start != mapping[mappingIndex].start) {
        duration = (mapping[durationCursor].start - mapping[mappingIndex].start)

        break
      }
      durationCursor = durationCursor + 1
    }

    // get the correct chord offset
    var localChordIndex = mapping[mappingIndex].chordIndex + chord.notes.length - 1
    var chordOffset = localChordIndex
    while (chordOffset < 0) {
      chordOffset = chordOffset + chord.notes.length
    } 
    chordOffset = chordOffset % chord.notes.length
    rawNotes.push({
        "pitch": chord.notes[chordOffset] + 12 * Math.floor(localChordIndex / chord.notes.length) + mapping[mappingIndex].octave*12,
        "start": localTime + mapping[mappingIndex].start,
        "duration": duration
    })

    // get the next note from the mapping
    mappingIndex = mappingIndex + 1
    // if there is no next note, then loop back around.
    if (!mapping[mappingIndex]) {
      // we make a assumption here that loops with be in groupings of 4 beats.
      localTime = localTime + 4 * (Math.floor(mapping[mappingIndex - 1].start / 4) + 1)
      mappingIndex = 0
    }
  }
  return rawNotes;
}

const getChordFromProgression = (progression, localTime) => {
  for (var i = 0; i < progression.chords.length-1; i++) {
    if ((progression.chords[i].start <= localTime) && (progression.chords[i+1].start > localTime)) {
      return progression.chords[i]
    }
  }
  return progression.chords[progression.chords.length-1]
}

exports.mappingDefs = {
  tonic4: [ // tonic every quarter note
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: 0, start: 1, octave: 0},
    {chordIndex: 0, start: 2, octave: 0},
    {chordIndex: 0, start: 3, octave: 0}
  ],
  downArp4: [ // down quarter note arp
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: -1, start: 1, octave: 0},
    {chordIndex: -2, start: 2, octave: 0},
    {chordIndex: -3, start: 3, octave: 0}
  ],
  upArp4: [ // up quarter note arp
    {chordIndex: -3, start: 0, octave: 0},
    {chordIndex: -2, start: 1, octave: 0},
    {chordIndex: -1, start: 2, octave: 0},
    {chordIndex: 0, start: 3, octave: 0}
  ],
  tonic8: [ // tonic every eighth note
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: 0, start: 0.5, octave: 0},
    {chordIndex: 0, start: 1, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: 0, start: 2, octave: 0},
    {chordIndex: 0, start: 2.5, octave: 0},
    {chordIndex: 0, start: 3, octave: 0},
    {chordIndex: 0, start: 3.5, octave: 0}
  ],
  downArp8: [ // down eighth note arp
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: -1, start: 0.5, octave: 0},
    {chordIndex: -2, start: 1, octave: 0},
    {chordIndex: -3, start: 1.5, octave: 0},
    {chordIndex: -4, start: 2, octave: 0},
    {chordIndex: -5, start: 2.5, octave: 0},
    {chordIndex: -6, start: 3, octave: 0},
    {chordIndex: -7, start: 3.5, octave: 0}
  ],
  upArp8: [ // up eighth note arp
    {chordIndex: -7, start: 0, octave: 0},
    {chordIndex: -6, start: 0.5, octave: 0},
    {chordIndex: -5, start: 1, octave: 0},
    {chordIndex: -4, start: 1.5, octave: 0},
    {chordIndex: -3, start: 2, octave: 0},
    {chordIndex: -2, start: 2.5, octave: 0},
    {chordIndex: -1, start: 3, octave: 0},
    {chordIndex: 0, start: 3.5, octave: 0}
  ],
  tonic16: [ // tonic every sixteenth note
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: 0, start: 0.25, octave: 0},
    {chordIndex: 0, start: 0.5, octave: 0},
    {chordIndex: 0, start: 0.75, octave: 0},
    {chordIndex: 0, start: 1, octave: 0},
    {chordIndex: 0, start: 1.25, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: 0, start: 1.75, octave: 0},
    {chordIndex: 0, start: 2, octave: 0},
    {chordIndex: 0, start: 2.25, octave: 0},
    {chordIndex: 0, start: 2.5, octave: 0},
    {chordIndex: 0, start: 2.75, octave: 0},
    {chordIndex: 0, start: 3, octave: 0},
    {chordIndex: 0, start: 3.25, octave: 0},
    {chordIndex: 0, start: 3.5, octave: 0},
    {chordIndex: 0, start: 3.75, octave: 0},
  ],
  downArp16: [ // down sixteenth note arp
    {chordIndex: 0, start: 0, octave: 1},
    {chordIndex: -1, start: 0.25, octave: 1},
    {chordIndex: -2, start: 0.5, octave: 1},
    {chordIndex: -3, start: 0.75, octave: 1},
    {chordIndex: -4, start: 1, octave: 1},
    {chordIndex: -5, start: 1.25, octave: 1},
    {chordIndex: -6, start: 1.5, octave: 1},
    {chordIndex: -7, start: 1.75, octave: 1},
    {chordIndex: -8, start: 2, octave: 1},
    {chordIndex: -9, start: 2.25, octave: 1},
    {chordIndex: -10, start: 2.5, octave: 1},
    {chordIndex: -11, start: 2.75, octave: 1},
    {chordIndex: -12, start: 3, octave: 1},
    {chordIndex: -13, start: 3.25, octave: 1},
    {chordIndex: -14, start: 3.5, octave: 1},
    {chordIndex: -15, start: 3.75, octave: 1},
  ],
  upArp16: [ // up sixteeth note arp
    {chordIndex: -15, start: 0, octave: 1},
    {chordIndex: -14, start: 0.25, octave: 1},
    {chordIndex: -13, start: 0.5, octave: 1},
    {chordIndex: -12, start: 0.75, octave: 1},
    {chordIndex: -11, start: 1, octave: 1},
    {chordIndex: -10, start: 1.25, octave: 1},
    {chordIndex: -9, start: 1.5, octave: 1},
    {chordIndex: -8, start: 1.75, octave: 1},
    {chordIndex: -7, start: 2, octave: 1},
    {chordIndex: -6, start: 2.25, octave: 1},
    {chordIndex: -5, start: 2.5, octave: 1},
    {chordIndex: -4, start: 2.75, octave: 1},
    {chordIndex: -3, start: 3, octave: 1},
    {chordIndex: -2, start: 3.25, octave: 1},
    {chordIndex: -1, start: 3.5, octave: 1},
    {chordIndex: 0, start: 3.75, octave: 1},
  ],
  tonic32: [ // tonic every 32 note
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: 0, start: 0.125, octave: 0},
    {chordIndex: 0, start: 0.25, octave: 0},
    {chordIndex: 0, start: 0.375, octave: 0},
    {chordIndex: 0, start: 0.5, octave: 0},
    {chordIndex: 0, start: 0.625, octave: 0},
    {chordIndex: 0, start: 0.75, octave: 0},
    {chordIndex: 0, start: 0.875, octave: 0},
    {chordIndex: 0, start: 1, octave: 0},
    {chordIndex: 0, start: 1.125, octave: 0},
    {chordIndex: 0, start: 1.25, octave: 0},
    {chordIndex: 0, start: 1.375, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: 0, start: 1.625, octave: 0},
    {chordIndex: 0, start: 1.75, octave: 0},
    {chordIndex: 0, start: 1.875, octave: 0},
    {chordIndex: 0, start: 2, octave: 0},
    {chordIndex: 0, start: 2.125, octave: 0},
    {chordIndex: 0, start: 2.25, octave: 0},
    {chordIndex: 0, start: 2.375, octave: 0},
    {chordIndex: 0, start: 2.5, octave: 0},
    {chordIndex: 0, start: 2.625, octave: 0},
    {chordIndex: 0, start: 2.75, octave: 0},
    {chordIndex: 0, start: 2.875, octave: 0},
    {chordIndex: 0, start: 3, octave: 0},
    {chordIndex: 0, start: 3.125, octave: 0},
    {chordIndex: 0, start: 3.25, octave: 0},
    {chordIndex: 0, start: 3.375, octave: 0},
    {chordIndex: 0, start: 3.5, octave: 0},
    {chordIndex: 0, start: 3.625, octave: 0},
    {chordIndex: 0, start: 3.75, octave: 0},
    {chordIndex: 0, start: 3.875, octave: 0},
  ],
  downArp32: [ // down 32nd note arp
    {chordIndex: 0, start: 0, octave: 2},
    {chordIndex: -1, start: 0.125, octave: 2},
    {chordIndex: -2, start: 0.25, octave: 2},
    {chordIndex: -3, start: 0.375, octave: 2},
    {chordIndex: -4, start: 0.5, octave: 2},
    {chordIndex: -5, start: 0.625, octave: 2},
    {chordIndex: -6, start: 0.75, octave: 2},
    {chordIndex: -7, start: 0.875, octave: 2},
    {chordIndex: -8, start: 1, octave: 2},
    {chordIndex: -9, start: 1.125, octave: 2},
    {chordIndex: -10, start: 1.25, octave: 2},
    {chordIndex: -11, start: 1.375, octave: 2},
    {chordIndex: -12, start: 1.5, octave: 2},
    {chordIndex: -13, start: 1.625, octave: 2},
    {chordIndex: -14, start: 1.75, octave: 2},
    {chordIndex: -15, start: 1.875, octave: 2},
    {chordIndex: 0, start: 2, octave: 2},
    {chordIndex: -1, start: 2.125, octave: 2},
    {chordIndex: -2, start: 2.25, octave: 2},
    {chordIndex: -3, start: 2.375, octave: 2},
    {chordIndex: -4, start: 2.5, octave: 2},
    {chordIndex: -5, start: 2.625, octave: 2},
    {chordIndex: -6, start: 2.75, octave: 2},
    {chordIndex: -7, start: 2.875, octave: 2},
    {chordIndex: -8, start: 3, octave: 2},
    {chordIndex: -9, start: 3.125, octave: 2},
    {chordIndex: -10, start: 3.25, octave: 2},
    {chordIndex: -11, start: 3.375, octave: 2},
    {chordIndex: -12, start: 3.5, octave: 2},
    {chordIndex: -13, start: 3.625, octave: 2},
    {chordIndex: -14, start: 3.75, octave: 2},
    {chordIndex: -15, start: 3.875, octave: 2},
  ],
  upArp32: [ // up 32nd note arp
    {chordIndex: -15, start: 0, octave: 2},
    {chordIndex: -14, start: 0.125, octave: 2},
    {chordIndex: -13, start: 0.25, octave: 2},
    {chordIndex: -12, start: 0.375, octave: 2},
    {chordIndex: -11, start: 0.5, octave: 2},
    {chordIndex: -10, start: 0.625, octave: 2},
    {chordIndex: -9, start: 0.75, octave: 2},
    {chordIndex: -8, start: 0.875, octave: 2},
    {chordIndex: -7, start: 1, octave: 2},
    {chordIndex: -6, start: 1.125, octave: 2},
    {chordIndex: -5, start: 1.25, octave: 2},
    {chordIndex: -4, start: 1.375, octave: 2},
    {chordIndex: -3, start: 1.5, octave: 2},
    {chordIndex: -2, start: 1.625, octave: 2},
    {chordIndex: -1, start: 1.75, octave: 2},
    {chordIndex: -0, start: 1.875, octave: 2},
    {chordIndex: -15, start: 2, octave: 2},
    {chordIndex: -14, start: 2.125, octave: 2},
    {chordIndex: -13, start: 2.25, octave: 2},
    {chordIndex: -12, start: 2.375, octave: 2},
    {chordIndex: -11, start: 2.5, octave: 2},
    {chordIndex: -10, start: 2.625, octave: 2},
    {chordIndex: -9, start: 2.75, octave: 2},
    {chordIndex: -8, start: 2.875, octave: 2},
    {chordIndex: -7, start: 3, octave: 2},
    {chordIndex: -6, start: 3.125, octave: 2},
    {chordIndex: -5, start: 3.25, octave: 2},
    {chordIndex: -4, start: 3.375, octave: 2},
    {chordIndex: -3, start: 3.5, octave: 2},
    {chordIndex: -2, start: 3.625, octave: 2},
    {chordIndex: -1, start: 3.75, octave: 2},
    {chordIndex: 0, start: 3.875, octave: 2},
  ],
  tonic2Offset: [ // tonic fast snare
    {chordIndex: 0, start: 1, octave: 0},
    {chordIndex: 0, start: 3, octave: 0},
  ],
  tonic1Offset: [ // tonic slow snare
    {chordIndex: 0, start: 2, octave: 0},
  ],
  tonic4Offset: [ // off beats
    {chordIndex: 0, start: 0.5, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: 0, start: 2.5, octave: 0},
    {chordIndex: 0, start: 3.5, octave: 0},
  ],
  tonic3: [ // 3 rhythm
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: 0, start: 3, octave: 0},
  ],
  tonic6: [ // 6 rhythm
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: 0, start: 0.75, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: 0, start: 2.25, octave: 0},
    {chordIndex: 0, start: 3, octave: 0},
    {chordIndex: 0, start: 3.5, octave: 0},
  ],
  downArp8Half: [ // down eighth note arp half
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: -1, start: 0.5, octave: 0},
    {chordIndex: -2, start: 1, octave: 0},
    {chordIndex: -3, start: 1.5, octave: 0},
    {chordIndex: 0, start: 2, octave: 0},
    {chordIndex: -1, start: 2.5, octave: 0},
    {chordIndex: -2, start: 3, octave: 0},
    {chordIndex: -3, start: 3.5, octave: 0}
  ],
  upArp8Half: [ // up eighth note arp half
    {chordIndex: -3, start: 0, octave: 0},
    {chordIndex: -2, start: 0.5, octave: 0},
    {chordIndex: -1, start: 1, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: -3, start: 2, octave: 0},
    {chordIndex: -2, start: 2.5, octave: 0},
    {chordIndex: -1, start: 3, octave: 0},
    {chordIndex: 0, start: 3.5, octave: 0}
  ],
  downUpArp8: [ // mixed eighth note arp edge peak
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: -1, start: 0.5, octave: 0},
    {chordIndex: -2, start: 1, octave: 0},
    {chordIndex: -3, start: 1.5, octave: 0},
    {chordIndex: -4, start: 2, octave: 0},
    {chordIndex: -3, start: 2.5, octave: 0},
    {chordIndex: -2, start: 3, octave: 0},
    {chordIndex: -1, start: 3.5, octave: 0}
  ],
  upDownArp8: [ // mixed eighth note arp mid peak
    {chordIndex: -3, start: 0, octave: 0},
    {chordIndex: -2, start: 0.5, octave: 0},
    {chordIndex: -1, start: 1, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: -1, start: 2, octave: 0},
    {chordIndex: -2, start: 2.5, octave: 0},
    {chordIndex: -3, start: 3, octave: 0},
    {chordIndex: -4, start: 3.5, octave: 0}
  ],
  downArp16: [ // down sixteenth note arp half
    {chordIndex: 0, start: 0, octave: 1},
    {chordIndex: -1, start: 0.25, octave: 1},
    {chordIndex: -2, start: 0.5, octave: 1},
    {chordIndex: -3, start: 0.75, octave: 1},
    {chordIndex: -4, start: 1, octave: 1},
    {chordIndex: -5, start: 1.25, octave: 1},
    {chordIndex: -6, start: 1.5, octave: 1},
    {chordIndex: -7, start: 1.75, octave: 1},
    {chordIndex: 0, start: 2, octave: 1},
    {chordIndex: -1, start: 2.25, octave: 1},
    {chordIndex: -2, start: 2.5, octave: 1},
    {chordIndex: -3, start: 2.75, octave: 1},
    {chordIndex: -4, start: 3, octave: 1},
    {chordIndex: -5, start: 3.25, octave: 1},
    {chordIndex: -6, start: 3.5, octave: 1},
    {chordIndex: -7, start: 3.75, octave: 1},
  ],
  upArp16: [ // up sixteeth note arp half
    {chordIndex: -7, start: 0, octave: 1},
    {chordIndex: -6, start: 0.25, octave: 1},
    {chordIndex: -5, start: 0.5, octave: 1},
    {chordIndex: -4, start: 0.75, octave: 1},
    {chordIndex: -3, start: 1, octave: 1},
    {chordIndex: -2, start: 1.25, octave: 1},
    {chordIndex: -1, start: 1.5, octave: 1},
    {chordIndex: 0, start: 1.75, octave: 1},
    {chordIndex: -7, start: 2, octave: 1},
    {chordIndex: -6, start: 2.25, octave: 1},
    {chordIndex: -5, start: 2.5, octave: 1},
    {chordIndex: -4, start: 2.75, octave: 1},
    {chordIndex: -3, start: 3, octave: 1},
    {chordIndex: -2, start: 3.25, octave: 1},
    {chordIndex: -1, start: 3.5, octave: 1},
    {chordIndex: 0, start: 3.75, octave: 1},
  ],
  downUpArp16: [ // mixed sixteenth note arp edges
    {chordIndex: 0, start: 0, octave: 1},
    {chordIndex: -1, start: 0.25, octave: 1},
    {chordIndex: -2, start: 0.5, octave: 1},
    {chordIndex: -3, start: 0.75, octave: 1},
    {chordIndex: -4, start: 1, octave: 1},
    {chordIndex: -5, start: 1.25, octave: 1},
    {chordIndex: -6, start: 1.5, octave: 1},
    {chordIndex: -7, start: 1.75, octave: 1},
    {chordIndex: -8, start: 2, octave: 1},
    {chordIndex: -7, start: 2.25, octave: 1},
    {chordIndex: -6, start: 2.5, octave: 1},
    {chordIndex: -5, start: 2.75, octave: 1},
    {chordIndex: -4, start: 3, octave: 1},
    {chordIndex: -3, start: 3.25, octave: 1},
    {chordIndex: -2, start: 3.5, octave: 1},
    {chordIndex: -1, start: 3.75, octave: 1},
  ],
  upDownArp16: [ // mixed sixteeth note arp middle
    {chordIndex: -7, start: 0, octave: 1},
    {chordIndex: -6, start: 0.25, octave: 1},
    {chordIndex: -5, start: 0.5, octave: 1},
    {chordIndex: -4, start: 0.75, octave: 1},
    {chordIndex: -3, start: 1, octave: 1},
    {chordIndex: -2, start: 1.25, octave: 1},
    {chordIndex: -1, start: 1.5, octave: 1},
    {chordIndex: 0, start: 1.75, octave: 1},
    {chordIndex: -1, start: 2, octave: 1},
    {chordIndex: -2, start: 2.25, octave: 1},
    {chordIndex: -3, start: 2.5, octave: 1},
    {chordIndex: -4, start: 2.75, octave: 1},
    {chordIndex: -5, start: 3, octave: 1},
    {chordIndex: -6, start: 3.25, octave: 1},
    {chordIndex: -7, start: 3.5, octave: 1},
    {chordIndex: -8, start: 3.75, octave: 1},
  ],
  chord4: [ // chord every quarter note
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: -1, start: 0, octave: 0},
    {chordIndex: -2, start: 0, octave: 0},
    {chordIndex: -3, start: 0, octave: 0},
    {chordIndex: 0, start: 1, octave: 0},
    {chordIndex: -1, start: 1, octave: 0},
    {chordIndex: -2, start: 1, octave: 0},
    {chordIndex: -3, start: 1, octave: 0},
    {chordIndex: 0, start: 2, octave: 0},
    {chordIndex: -1, start: 2, octave: 0},
    {chordIndex: -2, start: 2, octave: 0},
    {chordIndex: -3, start: 2, octave: 0},
    {chordIndex: 0, start: 3, octave: 0},
    {chordIndex: -1, start: 3, octave: 0},
    {chordIndex: -2, start: 3, octave: 0},
    {chordIndex: -3, start: 3, octave: 0}
  ],
  chord2Offset: [ // chord fast snare
    {chordIndex: 0, start: 1, octave: 0},
    {chordIndex: -1, start: 1, octave: 0},
    {chordIndex: -2, start: 1, octave: 0},
    {chordIndex: -3, start: 1, octave: 0},
    {chordIndex: 0, start: 3, octave: 0},
    {chordIndex: -1, start: 3, octave: 0},
    {chordIndex: -2, start: 3, octave: 0},
    {chordIndex: -3, start: 3, octave: 0}
  ],
  chord1Offset: [ // chord slow snare
    {chordIndex: 0, start: 2, octave: 0},
    {chordIndex: -1, start: 2, octave: 0},
    {chordIndex: -2, start: 2, octave: 0},
    {chordIndex: -3, start: 2, octave: 0}
  ],
  chord1: [ // chord every measure
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: -1, start: 0, octave: 0},
    {chordIndex: -2, start: 0, octave: 0},
    {chordIndex: -3, start: 0, octave: 0},
  ],
  chord4Offset: [ // chord off beats
    {chordIndex: 0, start: 0.5, octave: 0},
    {chordIndex: -1, start: 0.5, octave: 0},
    {chordIndex: -2, start: 0.5, octave: 0},
    {chordIndex: -3, start: 0.5, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: -1, start: 1.5, octave: 0},
    {chordIndex: -2, start: 1.5, octave: 0},
    {chordIndex: -3, start: 1.5, octave: 0},
    {chordIndex: 0, start: 2.5, octave: 0},
    {chordIndex: -1, start: 2.5, octave: 0},
    {chordIndex: -2, start: 2.5, octave: 0},
    {chordIndex: -3, start: 2.5, octave: 0},
    {chordIndex: 0, start: 3.5, octave: 0},
    {chordIndex: -1, start: 3.5, octave: 0},
    {chordIndex: -2, start: 3.5, octave: 0},
    {chordIndex: -3, start: 3.5, octave: 0},
  ],
  chord3: [ // chord 3 rhythm
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: -1, start: 0, octave: 0},
    {chordIndex: -2, start: 0, octave: 0},
    {chordIndex: -3, start: 0, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: -1, start: 1.5, octave: 0},
    {chordIndex: -2, start: 1.5, octave: 0},
    {chordIndex: -3, start: 1.5, octave: 0},
    {chordIndex: 0, start: 3, octave: 0},
    {chordIndex: -1, start: 3, octave: 0},
    {chordIndex: -2, start: 3, octave: 0},
    {chordIndex: -3, start: 3, octave: 0},
  ],
  chord6: [ // chord 6 rhythm
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: -1, start: 0, octave: 0},
    {chordIndex: -2, start: 0, octave: 0},
    {chordIndex: -3, start: 0, octave: 0},

    {chordIndex: 0, start: 0.75, octave: 0},
    {chordIndex: -1, start: 0.75, octave: 0},
    {chordIndex: -2, start: 0.75, octave: 0},
    {chordIndex: -3, start: 0.75, octave: 0},

    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: -1, start: 1.5, octave: 0},
    {chordIndex: -2, start: 1.5, octave: 0},
    {chordIndex: -3, start: 1.5, octave: 0},

    {chordIndex: 0, start: 2.25, octave: 0},
    {chordIndex: -1, start: 2.25, octave: 0},
    {chordIndex: -2, start: 2.25, octave: 0},
    {chordIndex: -3, start: 2.25, octave: 0},

    {chordIndex: 0, start: 3, octave: 0},
    {chordIndex: -1, start: 3, octave: 0},
    {chordIndex: -2, start: 3, octave: 0},
    {chordIndex: -3, start: 3, octave: 0},

    {chordIndex: 0, start: 3.5, octave: 0},
    {chordIndex: -1, start: 3.5, octave: 0},
    {chordIndex: -2, start: 3.5, octave: 0},
    {chordIndex: -3, start: 3.5, octave: 0}
  ],
  tonic3alt1: [ // kick rhythm 9 standalone
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: 0, start: 2.5, octave: 0},
    {chordIndex: 0, start: 3, octave: 0}
  ],
  tonic3alt2: [ // kick rhythm 10 standalone
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: 0, start: 2.5, octave: 0},
    {chordIndex: 0, start: 3.5, octave: 0}
  ],
  tonic3alt3: [ // kick rhythm 12 standalone
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: 0, start: 3, octave: 0},
    {chordIndex: 0, start: 4.5, octave: 0},
    {chordIndex: 0, start: 6, octave: 0},
    {chordIndex: 0, start: 7.5, octave: 0},
  ],
  tonicFastSyncopate1: [ // kick rhythm 13 standalone
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: 0, start: 0.75, octave: 0},
    {chordIndex: 0, start: 1, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: 0, start: 2.5, octave: 0},
    {chordIndex: 0, start: 3, octave: 0},
  ],
  tonic12: [ // kick rhythm 14 standalone
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: 0, start: 0.75, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: 0, start: 2, octave: 0},
    {chordIndex: 0, start: 2.75, octave: 0},
    {chordIndex: 0, start: 3.5, octave: 0},
  ],
  tonic3alt4: [ // 6 rhythm no follow up
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: 0, start: 0.75, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: 0, start: 2.25, octave: 0},
    {chordIndex: 0, start: 3, octave: 0}
  ],
  mixArp4: [ // mixed quarter note arp
    {chordIndex: -2, start: 0, octave: 0},
    {chordIndex: -3, start: 1, octave: 0},
    {chordIndex: 0, start: 2, octave: 0},
    {chordIndex: -1, start: 3, octave: 0}
  ],
  mixArp4Alt1: [ // mixed quarter note arp
    {chordIndex: -1, start: 0, octave: 0},
    {chordIndex: 0, start: 1, octave: 0},
    {chordIndex: -3, start: 2, octave: 0},
    {chordIndex: -2, start: 3, octave: 0}
  ],
  mixArp3: [ // 3 rhythm mixed
    {chordIndex: 0, start: 0, octave: 0},
    {chordIndex: -1, start: 1.5, octave: 0},
    {chordIndex: -2, start: 3, octave: 0},
  ],
  mixArp3Alt1: [ // 3 rhythm mixed
    {chordIndex: -1, start: 0, octave: 0},
    {chordIndex: -2, start: 1.5, octave: 0},
    {chordIndex: 0, start: 3, octave: 0},
  ],
  mixArp3Alt2: [ // 3 rhythm mixed
    {chordIndex: -1, start: 0, octave: 0},
    {chordIndex: 0, start: 1.5, octave: 0},
    {chordIndex: -2, start: 3, octave: 0},
  ],
}
