exports.isPerc = (part) => {
  return ["kick", "snare", "fastperc", "perc1", "perc2"].includes(part)
}

exports.isMelodic = (part) => {
  return ["bass", "arp", "chord", "rhythm1", "rhythm2"].includes(part)
}

// supports both simple arrays and complex weighted arrays
exports.randomChoice = (array) => {
  if (array.length === 0) {
    return
  }
  if (array[0].weight === undefined || Array.isArray(array[0])) {
    return array[Math.floor(array.length * Math.random())]
  } else {
    // First, we loop the main dataset to count up the total weight. We're starting the counter at one because the upper boundary of Math.random() is exclusive.
    var total = 0;
    for (var i = 0; i < array.length; ++i) {
      total += parseInt(array[i].weight);
    }

    // Total in hand, we can now pick a random value akin to our
    // random index from before.
    const threshold = Math.random() * total;

    // Now we just need to loop through the main data one more time
    // until we discover which value would live within this
    // particular threshold. We need to keep a running count of
    // weights as we go, so let's just reuse the "total" variable
    // since it was already declared.
    total = 0;
    for (var i = 0; i < array.length; ++i) {
      // Add the weight to our running total.
      total += parseInt(array[i].weight);

      // If this value falls within the threshold, we're done!
      if (total >= threshold) {
        return array[i].value;
      }
    }
    return array[i].value;
  }
}

exports.randomSelection = (inputArray, selectionCount) => {
  let arrCopy = inputArray.slice()

  let ranIdx
  let resArr = []

  for(i=0; i < selectionCount; i++){
    ranIdx = Math.floor(Math.random() * arrCopy.length)
    resArr.push(arrCopy.splice(ranIdx,1)[0])  
  }
  return resArr
}

exports.randomCombination = (array, size) => {
  let arrayCopy = array.slice()
  exports.shuffle(arrayCopy)
  return arrayCopy.slice(0, size)
}

exports.shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

exports.notes = {
  "C": 0,
  "C#": 1,
  "Db": 1,
  "D": 2,
  "D#": 3,
  "Eb": 3,
  "E": 4,
  "F": 5,
  "F#": 6,
  "Gb": 6,
  "G": 7,
  "G#": 8,
  "Ab": 8,
  "A": 9,
  "A#": 10,
  "Bb": 10,
  "B": 11
};

exports.intervals = {
  "root": 0,
  "dim2": 0,
  "minor2": 1,
  "min2": 1,
  "m2": 1,
  "major2": 2,
  "maj2": 2,
  "M2": 2,
  "dim3": 2,
  "minor3": 3,
  "min3": 3,
  "m3": 3,
  "aug2": 3,
  "major3": 4,
  "maj3": 4,
  "M3": 4,
  "dim4": 4,
  "perf4": 5,
  "P4":5,
  "aug3": 5,
  "tritone": 6,
  "dim5": 6,
  "aug4": 6,
  "perf5": 7,
  "P5": 7,
  "dim6": 7,
  "minor6": 8,
  "min6": 8,
  "m6": 8,
  "aug5": 8,
  "major6":9,
  "maj6":9,
  "M6": 9,
  "dim7": 9,
  "minor7": 10,
  "min7": 10,
  "m7": 10,
  "aug6": 10,
  "major7": 11,
  "maj7": 11,
  "M7": 11,
  "octave": 12,
  "m9": 13,
  "min9": 13,
  "minor9": 13,
  "M9": 14,
  "maj9": 14,
  "major9": 14, 
  "m10": 15,
  "min10": 15,
  "minor10": 15,
  "M10": 16,
  "maj10": 16,
  "major10": 16, 
  "P11": 17,
  "perf11": 17,
}
