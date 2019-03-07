<template>
<div >
<div class='borderspan'>
<span  class='borderspan2 spaceditem'>{{measure}} </span><span class='borderspan2 spaceditem'>{{((beat - 1) % 4) + 1}}</span>
<span><beat-map-item-matrix v-for='(item,index) in flagbeats.beat1' :key='index' :beat='item'/></span>
</div>
<div class='borderspan'>
<span  class='borderspan2 spaceditem'>{{measure}} </span><span class='borderspan2 grey spaceditem'>{{((beat - 1) % 4) + 1.5}}</span>
<span><beat-map-item-matrix class='scrollmenu' v-for='(item2,index2) in flagbeats.beat2' :key='index2' :beat='item2'/>
</span>
</div>
</div>
</template>

<script>
import BeatMapItemMatrix from 'components/BeatMapItemMatrix'
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  components: {
    BeatMapItemMatrix
  },
  props: {
    beat: 0
  },
  computed: {
    measure () {
      return Math.round((this.beat + 1) / 4)
    },
    flagbeats () {
      let flagbeats = this.$store.state.general.flagbeats
      let result1 = []
      let result2 = []
      for (let i = 0; i < flagbeats.length; i++) {
        if (flagbeats[i] > (this.beat * 100 + 100)) {
          break
        }
        if (flagbeats[i] >= this.beat * 100 && flagbeats[i] < this.beat * 100 + 50) {
          result1.push(flagbeats[i])
        }
        if (flagbeats[i] >= this.beat * 100 + 50 && flagbeats[i] < this.beat * 100 + 100) {
          result2.push(flagbeats[i])
        }
      }
      return {beat1: result1, beat2: result2}
    }
  }
}
</script>

<style>
.borderspan {
  border-width: 1px;
  border-style: solid;
  border-color: lightgrey;
  padding: 2px;
}
.borderspan2 {
  border-width: 0px 1px 0px 0px;
  border-style: solid;
  border-color: lightgrey;
  padding: 2px;
}
.grey {
  color: grey
}
.spaceditem {
  display: inline-block;width: 30px;
}
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
