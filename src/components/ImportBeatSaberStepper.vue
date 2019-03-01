<template>
 <q-stepper vertical ref="stepperbeatsaberimport">
  <q-step default title="Song Info JSON File" subtitle="Select JSON Info File">
    <import-beat-saber-info  @success='nextStep'/>
  </q-step>
  <q-step title="MP3/OGG File" subtitle="Load music file">
    <file-upload @success='nextStep' ></file-upload>
  </q-step>
  <q-step default title="Level JSON File" subtitle="Select JSON Leve File">
    <import-beat-saber-level @success='gobeatcoder' />
  </q-step>
</q-stepper>
</template>

<script>
import ImportBeatSaberInfo from 'components/ImportBeatSaberInfo'
import ImportBeatSaberLevel from 'components/ImportBeatSaberLevel'
import FileUpload from 'components/FileUpload'
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  components: {
    FileUpload,
    ImportBeatSaberInfo,
    ImportBeatSaberLevel
  },
  methods: {
    nextStep () {
      this.step = this.step + 1
      this.$refs.stepperbeatsaberimport.next()
    },
    previousStep () {
      this.step = this.step - 1
      this.$refs.stepperbeatsaberimport.previous()
    },
    gobeatcoder () {
      this.$router.push('/beatcoder')
    }
  }
}
</script>

<style>
</style>
