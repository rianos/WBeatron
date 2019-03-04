<template>
<div>
    <q-uploader v-if='!this.listshow' hide-upload-button auto-expand @add='localuploadjsoninfo' url='' extensions='.json'/>
    <q-select v-if='this.listshow' class='text-primary'
      v-model="select"
      float-label="Select Level to Import"
      placeholder="Select Level to Import"
      radio toggle
     :options="selectOptions" @input='udpdateOffset'
    />
    <br>
    <q-btn  v-if='this.listshow' label='Next' color='primary' @click='nextStep'/>
</div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      web: '',
      select: 0,
      selectOptions: [],
      listshow: false
    }
  },
  methods: {
    udpdateOffset (val) {
      this.$store.commit('general/beatoffset', this.web.difficultyLevels[val].offset / 1000)
      this.nextStep()
    },
    nextStep () {
      this.$emit('success')
    },
    parsefile (filestring) {
      this.web = JSON.parse(filestring)
      this.$store.commit('general/songTitle', this.web.songName)
      this.$store.commit('general/songArtist', this.web.songSubName)
      this.$store.commit('general/songAttribution', this.web.authorName)
      this.$store.commit('general/start', 1)
      this.$store.commit('general/beatoffset', this.web.difficultyLevels[0].offset / 1000)
      this.$store.commit('general/bpm', this.web.beatsPerMinute)
      this.$store.commit('general/mobileView', false)
      for (let i = 0; i < this.web.difficultyLevels.length; i++) {
        let opcion = {
          label: this.web.difficultyLevels[i].difficulty,
          value: i
        }
        this.selectOptions.push(opcion)
      }
      this.$store.commit('general/beatoffset', this.web.difficultyLevels[0].offset / 1000)
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
          self.listshow = true
          self.$q.loading.hide()
        }
        reader.readAsText(file)
      }
    }
  }
}
</script>

<style>
</style>
