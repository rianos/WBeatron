<template>
    <q-uploader hide-upload-button auto-expand @add='localuploadwbe' url='' extensions='.wbe'/>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      web: ''
    }
  },
  methods: {
    parsefile (filestring) {
      this.web = JSON.parse(filestring)
      this.$store.commit('general/songTitle', this.web.songTitle)
      this.$store.commit('general/songArtist', this.web.songArtist)
      this.$store.commit('general/songAttribution', this.web.songAttribution)
      this.$store.commit('general/start', this.web.start)
      this.$store.commit('general/beatoffset', this.web.beatoffset)
      this.$store.commit('general/bpm', this.web.bpm)
      this.$store.state.general.beats = this.web.beats
      this.$store.state.general.flagbeats = this.web.flagbeats
      this.$store.commit('general/mobileView', this.web.mobileView)
    },
    localuploadwbe (files) {
      var self = this
      if (files.length > 0) {
        this.visile = true
        this.$q.loading.show({
          spinner: 'QSpinnerAudio',
          message: 'Processing WebFormat File. Please wait',
          messageColor: 'white',
          spinnerSize: 100, // in pixels
          spinnerColor: 'primary',
          customClass: 'bg-blue-4'
        })
        var file = files[0]
        var reader = new FileReader()
        reader.onload = function (fileEvent) {
          self.parsefile(reader.result)
          self.$q.loading.hide()
          self.$emit('success')
        }
        reader.readAsText(file)
      }
    }
  }
}
</script>

<style>
</style>
