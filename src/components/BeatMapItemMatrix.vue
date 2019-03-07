<template>
  <span>
     <span>&nbsp;&nbsp;<q-icon color='primary' name='insert_link' /></span>
     <beat-map-item-matrix-item :value='this.state[13]' position=13 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[14]' position=14 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[15]' position=15 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[1]' position=1 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[2]' position=2 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[3]' position=3 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[4]' position=4 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[5]' position=5 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[6]' position=6 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[7]' position=7 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[8]' position=8 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[9]' position=9 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[10]' position=10 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[11]' position=11 @updated='update'/>
     <beat-map-item-matrix-item :value='this.state[12]' position=12 @updated='update'/>
 </span>
</template>

<script>
import BeatMapItemMatrixItem from 'components/BeatMapItemMatrixItem'
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  props: {
    beat: 0
  },
  methods: {
    update () {

    }
  },
  components: {
    BeatMapItemMatrixItem
  },
  computed: {
    state () {
      let beats = this.$store.state.general.beats
      if (beats[this.beat] === undefined || beats[this.beat] === null) {
        let p = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        return p
      } else {
        return beats[this.beat].pattern
      }
    }
  }
}
</script>

<style>
</style>
