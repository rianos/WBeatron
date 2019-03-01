<template>
    <q-uploader hide-upload-button auto-expand @add='localuploadjsoninfo' url='' extensions='.json'/>
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
      this.$store.commit('general/songTitle', this.web.songName)
      this.$store.commit('general/songArtist', this.web.songSubName)
      this.$store.commit('general/songAttribution', this.web.authorName)
      this.$store.commit('general/start', 1)
      this.$store.commit('general/beatoffset', this.web.difficultyLevels[0].offset)
      this.$store.commit('general/bpm', this.web.beatsPerMinute)
      this.$store.commit('general/mobileView', false)
    },
    localuploadjsoninfo (files) {
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
