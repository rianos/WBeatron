<template>
  <q-page padding>
  <q-stepper ref="steppersaved">
  <q-step title="MP3 File" subtitle="Load music file">
    <file-upload  @success='nextStep'></file-upload>
  </q-step>
</q-stepper>
  </q-page>
</template>

<script>
import FileUpload from 'components/FileUpload'
export default {
  // name: 'PageName',
  methods: {
    nextStep () {
      this.web = this.$q.localStorage.get.item('saved_file')
      this.$store.commit('general/songTitle', this.web.songTitle)
      this.$store.commit('general/songArtist', this.web.songArtist)
      this.$store.commit('general/songAttribution', this.web.songAttribution)
      this.$store.commit('general/start', this.web.start)
      this.$store.commit('general/beatoffset', this.web.beatoffset)
      this.$store.commit('general/bpm', this.web.bpm)
      this.$store.state.general.beats = this.web.beats
      this.$store.state.general.flagbeats = this.web.flagbeats
      this.$store.commit('general/mobileView', this.web.mobileView)
      this.$router.push('/beatcoder/')
    }
  },
  components: {
    FileUpload
  }
}
</script>

<style>
</style>
