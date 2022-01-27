const spec = require("./spec");
const util = require("./util");

exports.keySignatures = {
  "major": [0,2,4,5,7,9,11],
  "major_pentatonic": [0,2,4,7,9],
  "minor": [0,2,3,5,7,8,10],
  "minor_pentatonic": [0,3,5,7,10],
}

exports.setScale = (root, keySignature) => {
  if (!(root in util.notes)) {
    throw new Error("Invalid Inputs. Please make sure the root you have provided is supported and spelled correctly");
  };
  spec.state.scale.root = root;
  spec.state.scale.keySignature = exports.keySignatures[keySignature];
  spec.state.scale.name = keySignature;
}
