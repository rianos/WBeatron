<template>
  <q-page padding>
   <q-chip icon="input" square  pointing='down' color="primary">
     Import Project
   </q-chip>
  <br>
  <q-select class='text-primary'
      v-model="select"
      float-label="Select File Import Format"
      radio toggle
     :options="selectOptions"
    />
    <br>
   <import-stepper v-if='this.select === 1'/>
   <import-web-stepper v-if='this.select === 0' />
   <import-beat-saber-stepper v-if='this.select == 2' />
   <br><br>
   <q-chip icon="save_alt" square  pointing='down' color="primary">
     Export Project
   </q-chip>
   <export-stepper />
  </q-page>
</template>

<script>
import ImportStepper from 'components/ImportStepper'
import ExportStepper from 'components/ExportStepper'
import ImportWebStepper from 'components/ImportWebStepper'
import ImportBeatSaberStepper from 'components/ImportBeatSaberStepper'
export default {
  // name: 'PageName',
  data () {
    return {
      select: 1,
      selectOptions: [
        {
          label: 'Beatron Standalone Editor',
          value: 1
        },
        {
          label: 'Web Editor',
          value: 0
        },
        {
          label: 'Beat Saber',
          value: 2
        }
      ]
    }
  },
  components: {
    ImportStepper,
    ImportWebStepper,
    ImportBeatSaberStepper,
    ExportStepper
  }
}
</script>

<style>
</style>
