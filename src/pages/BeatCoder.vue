<template>
  <q-page padding>
    <beat-matrix @updated='updatebeat' @pflagbeat='pflagbeat' @nflagbeat='nflagbeat'></beat-matrix>
    <music-player ref='mp' selectedValue=0></music-player>
    <beat-editor v-if='!this.$store.state.general.isplaying || (this.$store.state.general.isplaying && !this.$store.state.general.mobileView)' @gotobeat='gotobeat' @playpreview='playpreview' @pmeasure='pmeasure' @nmeasure='nmeasure'/>
  </q-page>
</template>

<script>
import MusicPlayer from 'components/MusicPlayer'
import BeatMatrix from 'components/BeatMatrix'
import BeatEditor from 'components/BeatEditor'
export default {
  methods: {
    isclearpattern (state) {
      let clear = true
      for (let i = 0; i < state.length; i++) {
        if (state[i] !== 0) {
          clear = false
          break
        }
      }
      return clear
    },
    updatebeat (state, index) {
      let flagbeats = this.$store.state.general.flagbeats
      if (flagbeats.indexOf(index) === -1) {
        this.$store.commit('general/addflagbeat', index)
        this.$store.commit('general/updateflagbeat', {index: index, pattern: state})
        console.warn('NO EN FLAGBEATS')
      } else {
        if (this.isclearpattern(state)) {
          console.warn('ES CEROO PATTERN')
          this.$store.commit('general/removeflagbeat', index)
        }
        this.$store.commit('general/updateflagbeat', {index: index, pattern: state})
      }
    },
    playpreview () {
      this.$refs.mp.playpreview()
    },
    pmeasure () {
      this.$refs.mp.pmeasure()
    },
    nmeasure () {
      this.$refs.mp.nmeasure()
    },
    gotobeat (b) {
      this.$refs.mp.gotobeat(b)
    },
    pflagbeat () {
      this.$refs.mp.pflagbeat()
    },
    nflagbeat () {
      this.$refs.mp.nflagbeat()
    }
  },
  components: {
    MusicPlayer,
    BeatMatrix,
    BeatEditor
  }
}
</script>

<style>
</style>
