const scale = require("./scale");

let state = {
  clips: {},
  bpm: 120,
  scale: { // scale is set to C major by default
    root: "C",
    keySignature: scale.keySignatures["major"],
  }
}
exports.state = state
