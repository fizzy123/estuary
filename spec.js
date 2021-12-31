const scale = require("./scale");

let state = {
  clips: {},
  scale: { // scale is set to C major by default
    root: "C",
    keySignature: scale.keySignatures["major"],
    name: "major",
  }
}
exports.state = state
