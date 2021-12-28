const scale = require("./scale");

let state = {
  clips: {},
  bpm: 120,
  scene: 0,
  scale: { // scale is set to C major by default
    root: "C",
    keySignature: scale.keySignatures["major"],
  }
}
exports.state = state

// transitions are weird. I thought I would be able to program follow actions, but i can't, so transitions will need to be manually triggered in ableton, which isn't the end of the world.
exports.transition = () => {
  state.scene = state.scene + 1;
}
