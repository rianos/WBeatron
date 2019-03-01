<template>
   <q-uploader hide-upload-button auto-expand @add='localuploadlevel' url='' extensions='.json'/>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  methods: {
    localuploadlevel (files) {
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
          let beats
          beats = self.parsefile(reader.result)
          self.$store.commit('general/beats', beats)
          self.$q.loading.hide()
          self.$emit('success')
        }
        reader.readAsText(file)
      }
    },
    timetobeat (time) {
      let beatinplayer = parseInt(time * this.$store.state.general.bpm / 60 * 100 / 2) + 1
      return beatinplayer
    },
    beatposition (note) {
      let line = note._lineIndex
      let layer = note._lineLayer
      return (4 * (2 - layer)) + (line + 1)
    },
    parsefile (filecontent) {
      let json = JSON.parse(filecontent)
      let beats = []
      beats[0] = {
        pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
      this.$store.commit('general/bpm', json._beatsPerMinute)
      for (let i = 0; i < json._notes.length; i++) {
        let data = json._notes[i]
        let beat = this.timetobeat(data._time)
        console.log(beat)
        if (beats[beat] === undefined) {
          beats[beat] = {
            pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          let flagbeats = this.$store.state.general.flagbeats
          flagbeats.push(beat)
          this.$store.commit('general/flagbeats', flagbeats)
        }
        let matrix = [2, 6, 8, 4, 9, 3, 7, 5]
        let beatpos = this.beatposition(data)
        if (data._cutDirection === 8) {
          beats[beat].pattern[beatpos] = 1
        } else {
          beats[beat].pattern[beatpos] = matrix[data._cutDirection]
        }
      }
      beats[100000] = {
        pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
      let flagbeats = this.$store.state.general.flagbeats
      flagbeats.push(100000)
      this.$store.commit('general/flagbeats', flagbeats)
      return beats
    }
  }
}
</script>

<style>
</style>
