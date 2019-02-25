<template>
<div>
  <q-uploader hide-upload-button auto-expand @add='localuploadmp3' url='' extensions='.mp3'/>
</div>
</template>

<script>
import {Howl} from 'howler'
import Musictempo from 'music-tempo'

export default {
  data () {
    return {
      visible: false
    }
  },
  props: {
    bpmc: Boolean
  },
  methods: {
    localuploadmp3 (files) {
      let slashsound = new Howl({
        src: ['assets/Slash.wav'],
        volume: 1
      })
      let bashsound = new Howl({
        src: ['assets/Bash.wav'],
        volume: 1
      })
      this.$store.commit('general/slashsound', slashsound)
      this.$store.commit('general/bashsound', bashsound)
      if (files.length > 0) {
        this.visile = true
        this.$q.loading.show({
          spinner: 'QSpinnerAudio',
          message: 'Processing file\nPlease wait...',
          messageColor: 'white',
          spinnerSize: 100, // in pixels
          spinnerColor: 'primary',
          customClass: 'bg-blue-4'
        })
        var file = files[0]
        var reader2 = new FileReader()
        var reader = new FileReader()
        var self = this
        var calcTempo = function (buffer) {
          var audioData = []
          // Take the average of the two channels
          if (buffer.numberOfChannels === 2) {
            var channel1Data = buffer.getChannelData(0)
            var channel2Data = buffer.getChannelData(1)
            var length = channel1Data.length
            for (var i = 0; i < length; i++) {
              audioData[i] = (channel1Data[i] + channel2Data[i]) / 2
            }
          } else {
            audioData = buffer.getChannelData(0)
          }
          var mt = new Musictempo(audioData)
          self.$store.commit('general/bpm', Math.round(mt.tempo))
          self.$store.commit('general/peaks', mt.beats)
          self.$q.loading.hide()
          self.$emit('success')
        }
        reader2.onload = function (fileEvent) {
          var autmo = new AudioContext()
          self.$store.commit('general/auctx', autmo)
          autmo.decodeAudioData(fileEvent.target.result, calcTempo)
        }
        if (this.bpmc) {
          console.log('Procesando bpm')
          reader2.readAsArrayBuffer(file)
        }
        var tmpsound
        reader.addEventListener('load', function () {
          var data = reader.result
          tmpsound = new Howl({
            src: data
          })
          tmpsound.on('load', function () {
            self.$store.commit('general/song', tmpsound)
            console.log(self.$store.state.general.song.duration())
            if (!self.bpmc) {
              self.$emit('success')
              self.$q.loading.hide()
            }
          })
        })
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>

<style>
/* This is where your CSS goes */
</style>
