<template>
  <q-stepper vertical ref="stepperimport">
  <q-step default title="Song Meta File" subtitle="Select Meta File">
    <import-meta  @success='nextStep'/>
  </q-step>
  <q-step title="MP3 File" subtitle="Load music file">
    <file-upload  @success='nextStep'></file-upload>
  </q-step>
  <q-step title="Beat Data File" subtitle="Select Beat Data CSV file" >
     <import-beat  @success='gobeatcoder' />
  </q-step>
</q-stepper>
</template>

<script>
import ImportMeta from 'components/ImportMeta'
import FileUpload from 'components/FileUpload'
import ImportBeat from 'components/ImportBeat'
export default {
  components: {
    ImportMeta,
    FileUpload,
    ImportBeat
  },
  // name: 'ComponentName',
  data () {
    return {
      step: 1
    }
  },
  methods: {
    nextStep () {
      this.step = this.step + 1
      this.$refs.stepperimport.next()
    },
    previousStep () {
      this.step = this.step - 1
      this.$refs.stepperimport.previous()
    },
    gobeatcoder () {
      this.$router.push('/beatcoder')
    }
  }
}
</script>

<style>
</style>
