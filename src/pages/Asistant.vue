<template>
    <q-page class="flex flex-center">
    <q-stepper ref="stepper">
  <!-- Step: -->
  <q-step default title="Song" subtitle="Song details" >
    <song-details></song-details>
  </q-step>

  <!-- Step: -->
  <q-step default title="BPM Calculation" subtitle="Select mode to calculate BPM" >
    Select the way you want to calculate BPM.
    <br><br><q-icon size='3em' color='warning' name='warning' /><b>WARNING</b> For mobile devices select manually
    <q-select class='text-primary'
      v-model="select"
      float-label="Select BPM calculation mode"
      radio toggle
     :options="selectOptions"
    />
    <br>
   <q-input @input='setbpm' suffix=' bpm' v-if='!this.select' color='primary' numeric-keyboard-toggle v-model="bpm" placeholder='Enter Song BPM' type='number' />
  </q-step>
  <q-step title="MP3 File" subtitle="Load music file">
    <file-upload :bpmc='this.select' @success='gobeatcoder'></file-upload>
  </q-step>
  <q-stepper-navigation>
    <q-btn v-if='this.step != 1'
      flat
      @click="previousStep"
      label="Back"
    />
    <q-btn v-if='this.step >= 1'
      @click="nextStep"
      label="Next"
    />
  </q-stepper-navigation>
</q-stepper>
    </q-page>
  </template>
  <style>
</style>
<script>
import SongDetails from 'components/SongDetails'
import FileUpload from 'components/FileUpload'
export default {
  data () {
    return {
      step: 1,
      bpm: '',
      select: false,
      selectOptions: [
        {
          label: 'Manually',
          value: false
        },
        {
          label: 'Automatically',
          value: true
        }
      ]
    }
  },
  name: 'PageAsistant',
  methods: {
    setbpm (value) {
      this.$store.state.general.bpm = value
    },
    nextStep () {
      this.step = this.step + 1
      this.$refs.stepper.next()
    },
    previousStep () {
      this.step = this.step - 1
      this.$refs.stepper.previous()
    },
    gobeatcoder () {
      let beats = []
      beats[0] = {
        pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
      beats[100000] = {
        pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
      let flagbeats = []
      flagbeats.push(100000)
      console.warn(flagbeats)
      this.$store.state.general.flagbeats = flagbeats
      this.$store.state.general.beats = beats
      this.$router.push('/beatcoder/')
    }
  },
  components: {
    SongDetails,
    FileUpload
  }
}
</script>
