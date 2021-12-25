class Clip {
  constructor(clipParams) {
    this.notes = clipParams.notes;
    this.loopLength = clipParams.loopLength;
    this.track = clipParams.track;
    this.scene = clipParams.scene;
    this.sound = clipParams.sound;
  }
  
  sound(soundIndex) {
    if (sound < 0 || sound > 127) {
      return new Error("sound must be between 0 and 127");
    }
    this.sound = sound;
  }
}

Clip.PERC_DEFAULT_PITCH = 60;
Clip.MIDDLE_C = 60;
Clip.namedClips = {
  "2snareBeat": {
    notes: [
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 1,
        duration: 1,
      },
      {
        pitch: Clip.PERC_DEFAULT_PITCH,
        start: 3,
        duration: 1,
      }
    ],
    loopLength: 4,
  },
}
module.exports = Clip
