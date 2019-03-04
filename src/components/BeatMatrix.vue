<template>
  <div class='column flex-center'>
    <div class="row group">
     <q-btn flat round dense icon="chevron_left" color="blue" @click='previousflagbeat'>
       <q-tooltip :delay='1000'>Go to <b>previous</b> beat with targets</q-tooltip>
     </q-btn>
     <beat-item-special :value='this.state[13]' position=13 @updated='update'/>
     <beat-item-special :value='this.state[14]' position=14 @updated='update'/>
     <beat-item-special :value='this.state[15]' position=15 @updated='update'/>
     <q-btn flat round dense icon="chevron_right" color="blue" @click='nextflagbeat'>
       <q-tooltip :delay='1000'>Go to <b>next</b> beat with targets</q-tooltip>
     </q-btn>
    </div>
    <div class="row group">
     <beat-item-normal :value='this.state[1]' position=1 @updated='update'/>
     <beat-item-normal :value='this.state[2]' position=2 @updated='update'/>
     <beat-item-normal :value='this.state[3]' position=3 @updated='update'/>
     <beat-item-normal :value='this.state[4]' position=4 @updated='update'/>
    </div>
    <div class="row group">
     <beat-item-normal :value='this.state[5]' position=5 @updated='update'/>
     <beat-item-normal :value='this.state[6]' position=6 @updated='update'/>
     <beat-item-normal :value='this.state[7]' position=7 @updated='update'/>
     <beat-item-normal :value='this.state[8]' position=8 @updated='update'/>
    </div>
    <div class="row group">
     <beat-item-normal :value='this.state[9]' position=9 @updated='update'/>
     <beat-item-normal :value='this.state[10]' position=10 @updated='update'/>
     <beat-item-normal :value='this.state[11]' position=11 @updated='update'/>
     <beat-item-normal :value='this.state[12]' position=12 @updated='update'/>
    </div>
  </div>
</template>

<script>
import BeatItemNormal from 'components/BeatItemNormal'
import BeatItemSpecial from 'components/BeatItemSpecial'
export default {
  // name: 'ComponentName',
  data () {
    return {
      i: 0
    }
  },
  methods: {
    reference () {
      let timing = this.$store.state.general.position - parseFloat(this.$store.state.general.beatoffset)
      let beatinplayer = Math.round((timing * this.$store.state.general.bpm / 60) * 100)
      return Math.max(0, beatinplayer)
    },
    previousflagbeat () {
      this.$emit('pflagbeat')
    },
    nextflagbeat () {
      this.$emit('nflagbeat')
    },
    update (o) {
      let tmp = this.state.slice()
      tmp[o.pos] = o.val
      // this.$set(this.state, o.pos, o.val)
      this.$emit('updated', tmp, this.reference())
    },
    update_ini (p) {
      this.ini = p
    },
    getclosedbeat (beats, index) {
      let found = false
      let i = this.i
      let last = 0
      if (isNaN(index)) {
        found = true
      }
      if (beats[i] > index) {
        i = 0
      }
      while (!found) {
        if (beats[i] >= index) {
          found = true
          if (i !== this.i) {
            let b = this.$store.state.general.beats
            if (b[last].pattern.indexOf(1) !== -1) {
              this.$store.state.general.bashsound.play()
            } else {
              this.$store.state.general.slashsound.play()
            }
          }
        } else {
          last = beats[i]
          i++
        }
      }
      this.i = i
      return last
    }
  },
  computed: {
    state () {
      let beats = this.$store.state.general.beats
      let timing = this.$store.state.general.position - parseFloat(this.$store.state.general.beatoffset)
      let flagbeats = this.$store.state.general.flagbeats
      let index = Math.round(timing * this.$store.state.general.bpm * 100 / 60)
      let closedbeat = 0
      if (this.$store.state.general.song.playing()) {
        closedbeat = this.getclosedbeat(flagbeats, index)
        if (index - closedbeat > 150) {
          return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
        return beats[closedbeat].pattern
      } else {
        closedbeat = index
        if (beats[index] === undefined || beats[index] === null) {
          let p = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          return p
        } else {
          return beats[index].pattern
        }
      }
    }
  },
  components: {
    BeatItemNormal,
    BeatItemSpecial
  }
}
</script>

<style>
</style>
