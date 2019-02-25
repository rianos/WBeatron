<template>
 <q-stepper vertical ref="stepperwebimport">
  <q-step default title="Song Web File" subtitle="Select WBE File">
    <import-wbe  @success='nextStep'/>
  </q-step>
  <q-step title="MP3 File" subtitle="Load music file">
    <file-upload  @success='gobeatcoder'></file-upload>
  </q-step>
</q-stepper>
</template>

<script>
import ImportWbe from 'components/ImportWbe'
import FileUpload from 'components/FileUpload'
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  components: {
    FileUpload,
    ImportWbe
  },
  methods: {
    nextStep () {
      this.step = this.step + 1
      this.$refs.stepperwebimport.next()
    },
    previousStep () {
      this.step = this.step - 1
      this.$refs.stepperwebimport.previous()
    },
    gobeatcoder () {
      this.$router.push('/beatcoder')
    }
  }
}
</script>

<style>
</style>
