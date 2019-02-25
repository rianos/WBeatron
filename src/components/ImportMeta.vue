<template>
   <q-uploader hide-upload-button auto-expand @add='localuploadmeta' url='' extensions='.txt'/>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  methods: {
    localuploadmeta (files) {
      var self = this
      if (files.length > 0) {
        this.visile = true
        this.$q.loading.show({
          spinner: 'QSpinnerAudio',
          message: 'Processing MetaFile. Please wait',
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
    },
    parsefile (filecontent) {
      var regex = /title:\s*(.*)/g
      var matches
      matches = regex.exec(filecontent)
      this.$store.commit('general/songTitle', matches[1])
      regex = /artist:\s*(.*)/g
      matches = regex.exec(filecontent)
      if (matches.length > 1) {
        this.$store.commit('general/songArtist', matches[1])
      }
      regex = /attribution:\s*(.*)\nbpm:/g
      matches = regex.exec(filecontent)
      if (matches != null) {
        this.$store.commit('general/songAttribution', matches[1])
      }
      regex = /beatOffset:\s*(.*)/g
      matches = regex.exec(filecontent)
      this.$store.commit('general/beatoffset', matches[1])
      regex = /bpm:\s*(.*)/g
      matches = regex.exec(filecontent)
      this.$store.commit('general/bpm', matches[1])
      regex = /startOnMeasure:\s*(.*)*/g
      matches = regex.exec(filecontent)
      this.$store.commit('general/start', matches[1])
    }
  }
}
</script>

<style>
</style>
