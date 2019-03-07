<template>
  <div>
    <beat-map-item :beat='n' v-for='n in this.totalBeats()' :key='n' />
  </div>
</template>

<script>
import BeatMapItem from 'components/BeatMapItem'
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  components: {
    BeatMapItem
  },
  methods: {
    totalBeats () {
      let duration = this.$store.state.general.duration
      let bpm = this.$store.state.general.bpm
      let beats = duration * bpm / 60
      return Math.round(beats) + 1
    }
  }
}
</script>

<style>
</style>
