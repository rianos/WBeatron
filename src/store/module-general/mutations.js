import Vue from 'vue'
export function songTitle (state, title) {
  state.songTitle = title
}

export function songArtist (state, title) {
  state.songArtist = title
}

export function songAttribution (state, title) {
  state.songAttribution = title
}

export function song (state, sound) {
  state.song = sound
  state.duration = Math.round(sound.duration() * 100) / 100
}

export function beatoffset (state, val) {
  state.beatoffset = val
}

export function start (state, val) {
  state.start = val
}

export function bpm (state, val) {
  state.bpm = val
  state.measures = Math.round(state.duration * state.bpm / 60 / 4)
}

export function beats (state, val) {
  state.beats = val
}

export function peaks (state, val) {
  state.peaks = val
}

export function auctx (state, val) {
  state.auctx = val
}

export function position (state, val) {
  state.position = 0 + val
}

export function flagbeats (state, val) {
  state.flagbeat = val
}

export function slashsound (state, val) {
  state.slashsound = val
}

export function bashsound (state, val) {
  state.bashsound = val
}

export function iplaying (state, val) {
  state.isplaying = val
}

export function updateflagbeat (state, val) {
  Vue.set(state.beats, val.index, { pattern: val.pattern })
}

export function removeflagbeat (state, index) {
  let i = state.flagbeats.indexOf(index)
  if (i > -1) {
    state.flagbeats.splice(i, 1)
  }
}

export function addflagbeat (state, index) {
  state.flagbeats.push(index)
  state.flagbeats.sort(function (a, b) { return a - b })
}

export function mobileView (state, val) {
  state.mobileView = val
}
