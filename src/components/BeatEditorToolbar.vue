<template>
 <q-toolbar color="dark" inverted>
  <span>
   <q-tooltip :delay='1000'>Exact Beat Position in Editor<br><b>Click to enter beat number to navigate</b></q-tooltip>  <q-chip color='primary'>
    <q-popover>
      <q-input numeric-keyboard-toggle autofocus inverted @change='gotospebeat' :value='parseInt(this.reference)' type='number' />
    </q-popover>
    {{reference}}
   </q-chip>
  </span>
  <q-btn flat round dense icon="hearing" color="blue" @click='playpreview'>
    <q-tooltip :delay='1000'><b>Playback some seconds</b><br>and then stop to hear how the new target sounds</q-tooltip>
  </q-btn>
  <q-btn flat round dense icon="fast_rewind" color="blue" @click='previousmeasure'>
    <q-tooltip :delay='1000'>Go to <b>previous</b> measure</q-tooltip>
  </q-btn>
  <q-btn flat round dense icon="chevron_left" color="blue" @click='previoubeat'>
    <q-tooltip :delay='1000'>Go to <b>previous</b> beat</q-tooltip>
  </q-btn>
  <q-btn flat round dense icon="chevron_right" color="blue" @click='nextbeat'>
    <q-tooltip :delay='1000'>Go to <b>next</b> beat</q-tooltip>
  </q-btn>
  <q-btn flat round dense icon="fast_forward" color="blue" @click='nextmeasure'>
    <q-tooltip :delay='1000'>Go to <b>next</b> measure</q-tooltip>
  </q-btn>
  <q-btn flat icon="dashboard" color="blue" :label='this.typemeasure' @click='changegrid'>
    <q-tooltip :delay='1000'>Change <b>beats per measure</b> displayed.<br>Press several times to change different modes</q-tooltip>
  </q-btn>
  <q-chip  color='secondary'>
    <q-tooltip :delay='1000'>Meausure  {{measure}} / Beat  {{(beat % 4) + 1}}</q-tooltip>
    {{measure}} / {{(beat % 4) + 1}}
  </q-chip>
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
