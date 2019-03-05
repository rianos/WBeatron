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
    setOffset (val) {
      let offset = 0
      if (this.web.difficultyLevels[val].offset !== undefined) {
        offset = this.web.difficultyLevels[val].offset
      }
      this.$store.commit('general/beatoffset', offset / 1000)
    },
    udpdateOffset (val) {
      this.setOffset(val)
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
      this.$store.commit('general/bpm', this.web.beatsPerMinute)
      this.$store.commit('general/mobileView', false)
      for (let i = 0; i < this.web.difficultyLevels.length; i++) {
        let opcion = {
          label: this.web.difficultyLevels[i].difficulty,
          value: i
        }
        this.selectOptions.push(opcion)
      }
      // By default we set the first level offset
      this.setOffset(0)
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
