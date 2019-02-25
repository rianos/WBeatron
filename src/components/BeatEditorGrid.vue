<template>
  <div class='scrollmenu'>
    <q-btn flat round dense icon="chevron_left" color="blue" @click='previoubeat' />
    <span v-for="item in items" :key="item.beat">
     <beat-editor-item :bg='item.background' :color='item.color' :beat='item.beat' :mark='item.mark' @gotobeat='gotobeat'/>
    </span>
    <q-btn flat round dense icon="chevron_right" color="blue" @click='nextbeat' />
  </div>
</template>

<script>
import BeatEditorItem from 'components/BeatEditorItem'
export default {
  data () {
    return {
      lastmes: 0
    }
  },
  components: {
    BeatEditorItem
  },
  props: [
    'typemeasure'
  ],
  methods: {
    beat () {
      let timing = this.$store.state.general.position - parseFloat(this.$store.state.general.beatoffset)
      let beatinplayer = timing * this.$store.state.general.bpm / 60
      return beatinplayer
    },
    measure () {
      let m = parseInt((this.beat() - 1) / 4) + 1
      return m
    },
    gotobeat (b) {
      this.$emit('gotobeat', b)
    },
    previoubeat () {
      let timing = this.$store.state.general.position - parseFloat(this.$store.state.general.beatoffset)
      let beatinplayer = Math.round((timing * this.$store.state.general.bpm / 60) * 100)
      this.$emit('pbeat', Math.max(0, beatinplayer))
    },
    nextbeat () {
      let timing = this.$store.state.general.position - parseFloat(this.$store.state.general.beatoffset)
      let beatinplayer = Math.round((timing * this.$store.state.general.bpm / 60) * 100)
      this.$emit('nbeat', Math.max(0, beatinplayer))
    }
  },
  computed: {
    items () {
      let items = []
      let m = this.beat()
      let fb = this.$store.state.general.flagbeats
      let c = 0
      let step = 50
      let notes = 0
      switch (this.typemeasure) {
        case 8:
          step = 50
          m = parseInt(m * 100 / step) * step
          notes = 20
          break
        case 4:
          step = 100
          m = parseInt(m * 100 / step) * step
          notes = 10
          break
        case 10:
          step = 40
          m = parseInt(m * 100 / step) * step
          notes = 25
          break
        case 5:
          step = 80
          m = parseInt(m * 100 / step) * step
          notes = 12
          break
        case 16:
          step = 25
          m = parseInt(m * 100 / step) * step
          notes = 20
      }
      // let inicio = m
      let previousnotes = 5
      let inicio = m - step * previousnotes
      for (let i = 0; i < notes; i++) {
        let beat = inicio + (i * step)
        let color = 'light'
        c = 0
        for (let j = 0; j < fb.length; j++) {
          if (fb[j] >= beat && fb[j] < (beat + step)) {
            if (fb[j] !== beat) {
              c = 7
            }
            c++
          }
          if (fb[j] >= beat + step) {
            break
          }
        }
        if (c === 1) {
          color = 'primary'
        }
        if (c > 1) {
          color = 'purple'
        }
        let background = 'text-white'
        if (i === previousnotes) {
          background = 'round-borders'
        }
        let mark = ((beat - step) % (step * (this.typemeasure)) / step)
        if (mark < 0) {
          mark = '-'
        }
        let item = {
          beat: beat,
          mark: mark,
          color: color,
          background: background
        }
        items.push(item)
      }
      return items
    }
  }
}
</script>

<style>
div.scrollmenu {
  overflow: scroll;
  white-space: nowrap;
}
div.scrollmenu span {
  display: inline-block;
  text-align: center;
  padding: 0px;
  text-decoration: none;
}
</style>
