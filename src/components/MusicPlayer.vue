<template>
<div>
<q-btn icon='play_circle_filled' dense flat  size="2rem" color='primary' @click='play' v-if='!this.playing' />
<q-btn icon='pause_circle_filled' dense flat  size="2rem" color='primary' @click='stop' v-if='this.playing' />
<q-btn icon='replay_5' dense flat  size="2rem" color='blue-grey' @click='back5sec'/>
<q-btn icon='fast_rewind'  flat  size="1rem" color='blue-grey' @click='slower'/>
<q-btn icon='fast_forward'  flat   size="1rem" color='blue-grey' @click='faster'/>
<q-toggle v-model="checked" color='light' @input='updateMobileView' />
<q-slider  v-model="selectedValue"  :min="0" :max="this.duration" :lavel-value='Math.round(this.selectedValue)' label-always @input="seek"/>
</div>
</template>
<script>
export default {
  data () {
    return {
      selectedValue: 0,
      rate: 1.0,
      preview: false,
      timetopreview: 0,
      isplaying: false,
      checked: true
    }
  },
  destroyed () {
    this.stop()
  },
  mounted () {
    var tmp = this.$store.state.general.song
    if (tmp === null) {
      this.$router.push('/asistant')
    } else {
      window.requestAnimationFrame(this.updateProgress)
    }
  },
  methods: {
    updateMobileView () {
      this.$store.commit('general/mobileView', this.checked)
    },
    pflagbeat () {
      this.stop()
      let fb = this.$store.state.general.flagbeats
      let timing = this.$store.state.general.position - parseFloat(this.$store.state.general.beatoffset)
      let beatinplayer = parseInt(timing * this.$store.state.general.bpm / 60 * 100)
      let pbeat = 0
      for (let i = 0; i < fb.length; i++) {
        if (fb[i] >= beatinplayer) {
          break
        }
        pbeat = fb[i]
      }
      let npos = (pbeat * 60 / this.$store.state.general.bpm / 100) + parseFloat(this.$store.state.general.beatoffset)
      console.warn('pflag ' + beatinplayer + ' - ' + pbeat)
      this.song.seek(npos)
      this.$store.commit('general/iplaying', this.song.playing())
    },
    nflagbeat () {
      this.stop()
      let fb = this.$store.state.general.flagbeats
      let timing = this.$store.state.general.position - parseFloat(this.$store.state.general.beatoffset)
      let beatinplayer = parseInt(timing * this.$store.state.general.bpm / 60 * 100) + 1
      let nbeat = fb[fb.length]
      for (let i = fb.length; i >= 0; i--) {
        if (fb[i] <= beatinplayer) {
          break
        }
        nbeat = fb[i]
      }
      let npos = (nbeat * 60 / this.$store.state.general.bpm / 100) + parseFloat(this.$store.state.general.beatoffset)
      console.warn('nflag ' + beatinplayer + ' - ' + nbeat)
      this.song.seek(npos)
      this.$store.commit('general/iplaying', this.song.playing())
    },
    beatinplayer () {
      let timing = this.$store.state.general.position - parseFloat(this.$store.state.general.beatoffset)
      let beatinplayer = parseInt(timing * this.$store.state.general.bpm / 60)
      return beatinplayer + 1
    },
    gotobeat (b) {
      this.stop()
      let npos = (b * 60 / this.$store.state.general.bpm / 100) + parseFloat(this.$store.state.general.beatoffset)
      this.song.seek(npos)
      this.$store.commit('general/iplaying', this.song.playing())
    },
    pmeasure () {
      this.stop()
      let npos = ((this.beatinplayer() - 5) * (60 / this.$store.state.general.bpm)) + parseFloat(this.$store.state.general.beatoffset)
      npos = Math.max(1, npos)
      this.song.seek(npos)
      this.$store.commit('general/iplaying', this.song.playing())
    },
    nmeasure () {
      this.stop()
      let npos = ((this.beatinplayer() + 3) * (60 / this.$store.state.general.bpm)) + parseFloat(this.$store.state.general.beatoffset)
      npos = Math.min(this.duration, npos)
      this.song.seek(npos)
      this.$store.commit('general/iplaying', this.song.playing())
    },
    playpreview () {
      this.timetopreview = this.song.seek() + 0.2
      this.song.pause()
      window.cancelAnimationFrame(this.updateProgress)
      this.song.seek(this.selectedValue - 1)
      window.requestAnimationFrame(this.updateProgress)
      this.song.play()
      this.preview = true
      this.$store.commit('general/iplaying', this.song.playing())
    },
    play () {
      if (!this.song.playing()) {
        window.requestAnimationFrame(this.updateProgress)
        this.song.volume(0.2)
        this.song.play()
      }
      this.$store.commit('general/iplaying', this.song.playing())
    },
    updateProgress () {
      window.requestAnimationFrame(this.updateProgress)
      this.updatepos()
    },
    stop () {
      if (this.song.playing()) {
        window.cancelAnimationFrame(this.updateProgress)
        this.song.pause()
      }
      this.$store.commit('general/iplaying', this.song.playing())
    },
    back5sec () {
      if (this.song != null) {
        this.song.pause()
        window.cancelAnimationFrame(this.updateProgress)
        this.song.seek(this.selectedValue - 5)
        window.requestAnimationFrame(this.updateProgress)
        this.song.play()
      }
      this.$store.commit('general/iplaying', this.song.playing())
    },
    seek (val) {
      if (this.song != null) {
        this.song.pause()
        window.cancelAnimationFrame(this.updateProgress)
        this.song.seek(this.selectedValue)
        window.requestAnimationFrame(this.updateProgress)
        this.song.volume(0.2)
        this.song.play()
      }
      this.$store.commit('general/iplaying', this.song.playing())
    },
    slower () {
      this.rate = Math.max(0.5, this.rate -= 0.25)
      this.song.rate(this.rate)
    },
    faster () {
      this.rate = Math.min(4.0, this.rate += 0.25)
      this.song.rate(this.rate)
    },
    updatepos () {
      let t = this.song.seek()
      this.selectedValue = parseInt(Math.round(t * 100) / 100)
      this.$store.commit('general/position', t)
      if (this.preview) {
        if (t >= this.timetopreview) {
          this.preview = false
          this.stop()
        }
      }
      this.$store.commit('general/iplaying', this.song.playing())
    }
  },
  computed: {
    playing: {
      get () {
        var tmp = this.$store.state.general.song
        if (tmp === null) {
          return false
        }
        return tmp.playing()
      }
    },
    song: {
      get () {
        return this.$store.state.general.song
      }
    },
    duration: {
      get () {
        return this.$store.state.general.duration
      }
    }
  }
}
</script>
<style>
</style>
