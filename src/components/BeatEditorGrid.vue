<template>
  <div>
  <div class='scrollmenu'>
    <span v-for="item in items" :key="item.beat">
     <beat-editor-item :bg='item.background' :color='item.color' :beat='item.beat' :mark='item.mark' @gotobeat='gotobeat'/>
    </span>
  </div>
  <div v-if='!this.$store.state.general.isplaying' class='scrollmenu'>
   <span v-for="item in subitems" :key="item.beat">
     <beat-editor-item :bg='item.background' :color='item.color' :beat='item.beat' :mark='item.mark' @gotobeat='gotobeat'/>
    </span>
  </div>
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
    subitems () {
      let items = []
      let m = this.beat()
      let exactBeat = Math.round(m * 100)
      let fb = this.$store.state.general.flagbeats
      let step = 50
      let notes = 0
      switch (this.typemeasure) {
        case 8:
          step = 50
          m = parseInt(m * 100 / step) * step
          notes = 50
          break
        case 4:
          step = 100
          m = parseInt(m * 100 / step) * step
          notes = 100
          break
        case 10:
          step = 40
          m = parseInt(m * 100 / step) * step
          notes = 40
          break
        case 5:
          step = 80
          m = parseInt(m * 100 / step) * step
          notes = 80
          break
        case 16:
          step = 25
          m = parseInt(m * 100 / step) * step
          notes = 25
      }
      let inicio = m
      for (let i = 0; i < notes; i++) {
        let beat = inicio + i
        let color = 'grey-5'
        for (let j = 0; j < fb.length; j++) {
          if (fb[j] === beat) {
            color = 'primary'
            break
          }
        }
        let background = 'text-white'
        let mark = i
        if (beat < 0) {
          color = 'red-2'
          mark = 'X'
        }
        if (beat === 0) {
          color = 'green-8'
          mark = 'START'
        }
        if (beat === exactBeat) {
          background = background + ' bordermark'
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
    },
    items () {
      let items = []
      let m = this.beat()
      let exactBeat = Math.round(m * 100)
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
      let previousnotes = 4
      let inicio = m - step * previousnotes
      for (let i = 0; i < notes; i++) {
        let beat = inicio + (i * step)
        let color = 'grey-7'
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
        let mark = ((beat - step) % (step * (this.typemeasure)) / step)
        if (beat < 0) {
          color = 'red-2'
          mark = 'X'
        }
        if (beat === 0) {
          color = 'green-8'
          mark = 'START'
        }
        if (mark === 0) {
          background = 'round-borders'
        }
        if (beat === exactBeat) {
          background = background + ' bordermark'
        }
        if (beat + step > exactBeat && beat < exactBeat) {
          if (this.$store.state.general.isplaying) {
            background = background + ' bordermark'
          } else {
            background = background + ' bordermarkINTER'
          }
        } else {
          if (beat === exactBeat) {
            background = background + ' bordermark'
          }
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
  padding-bottom: 3px;
  text-decoration: none;
}
</style>
