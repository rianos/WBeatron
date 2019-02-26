<template>
 <q-toolbar color="dark" inverted>
  <q-chip color='primary'>
    <q-popover>
      <q-input numeric-keyboard-toggle autofocus inverted @change='gotospebeat' :value='parseInt(this.reference)' type='number' />
    </q-popover>
    {{reference}}
   </q-chip>
  <q-btn flat round dense icon="hearing" color="blue" @click='playpreview' />
  <q-btn flat round dense icon="fast_rewind" color="blue" @click='previousmeasure' />
  <q-btn flat round dense icon="chevron_left" color="blue" @click='previoubeat' />
  <q-btn flat round dense icon="chevron_right" color="blue" @click='nextbeat' />
  <q-btn flat round dense icon="fast_forward" color="blue" @click='nextmeasure' />
  <q-btn flat icon="dashboard" color="blue" :label='this.typemeasure' @click='changegrid' />
  <q-chip  color='secondary'>{{measure}} / {{(beat % 4) + 1}}</q-chip>
</q-toolbar>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: [
    'typemeasure'
  ],
  methods: {
    playpreview () {
      this.$emit('playpreview')
    },
    previousmeasure () {
      this.$emit('pmeasure')
    },
    nextmeasure () {
      this.$emit('nmeasure')
    },
    changegrid () {
      this.$emit('changegrid')
    },
    previoubeat () {
      this.$emit('pbeat', this.reference)
    },
    nextbeat () {
      this.$emit('nbeat', this.reference)
    },
    gotospebeat (b) {
      this.$emit('gotobeat', b)
    }
  },
  computed: {
    beat () {
      let timing = this.$store.state.general.position - parseFloat(this.$store.state.general.beatoffset)
      let beatinplayer = parseInt(timing * this.$store.state.general.bpm / 60)
      return beatinplayer + 1
    },
    reference () {
      let timing = this.$store.state.general.position - parseFloat(this.$store.state.general.beatoffset)
      let beatinplayer = Math.round((timing * this.$store.state.general.bpm / 60) * 100)
      return Math.max(0, beatinplayer)
    },
    measure () {
      let m = parseInt((this.beat - 1) / 4) + 1
      return m
    }
  }
}
</script>

<style>
</style>
