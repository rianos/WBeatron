<template>
<span class="margind">
<q-field
  icon="straighten"
  label="Duration"
  label-width=4
>
<q-input v-model="songDuration"  disable  suffix=' seconds' float-label='Song duration'/>
</q-field>
<q-field
  icon="speaker"
  label="BPM"
  label-width=4
>
<q-input v-model="songBMP"  disable float-label='Beats per minute'/>
</q-field>

<q-field
  icon="last_page"
  label="beat offset"
  label-width=4
>
<q-input v-model="songBeatOffset"  float-label='Beat offset in seconds'/>
</q-field>

<q-field
  icon="play_circle_filled"
  label="Start on Measure"
  label-width=4
>
<q-input v-model="songStartMeasure" float-label='Measure start position'/>
</q-field>
</span>
</template>

<script>
// This is where your Javascript goes
// to define your Vue component, which
// can be a Layout, a Page or your own
// component used throughout the app.
export default {
  computed: {
    songDuration: {
      get () {
        return this.$store.state.general.duration
      }
    },
    songBMP: {
      get () {
        return this.$store.state.general.bpm
      }
    },
    songBeatOffset: {
      get () {
        return this.$store.state.general.beatoffset
      },
      set (value) {
        this.$store.commit('general/beatoffset', value)
      }
    },
    songStartMeasure: {
      get () {
        return this.$store.state.general.start
      },
      set (value) {
        this.$store.commit('general/start', value)
      }
    }
  },
  data () {
    return {
    }
  }
  //
}
</script>
<style>
.margind { margin-left: 30px;}
</style>
