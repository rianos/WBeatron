<template>
<div>
  <beat-editor-toolbar :typemeasure='this.typemeasure' @playpreview='playpreview'  @gotobeat='gotobeat' @pbeat='pbeat' @nbeat='nbeat' @pmeasure='pmeasure' @nmeasure='nmeasure' @changegrid='changegrid'/>
  <beat-editor-grid @pbeat='pbeat' @nbeat='nbeat' :typemeasure='typemeasure' @gotobeat='gotobeat'/>
</div>
</template>

<script>
import BeatEditorToolbar from 'components/BeatEditorToolbar'
import BeatEditorGrid from 'components/BeatEditorGrid'
export default {
  // name: 'ComponentName',
  data () {
    return {
      typemeasure: 4
    }
  },
  methods: {
    playpreview () {
      this.$emit('playpreview')
    },
    pmeasure () {
      this.$emit('pmeasure')
    },
    nmeasure () {
      this.$emit('nmeasure')
    },
    gotobeat (b) {
      this.$emit('gotobeat', b)
    },
    pbeat (r) {
      switch (this.typemeasure) {
        case 4:
          r = r - 100
          break
        case 5:
          r = r - 80
          break
        case 8:
          r = r - 50
          break
        case 10:
          r = r - 40
          break
        case 16:
          r = r - 25
          break
      }
      this.$emit('gotobeat', r)
    },
    nbeat (r) {
      switch (this.typemeasure) {
        case 4:
          r = r + 100
          break
        case 5:
          r = r + 80
          break
        case 8:
          r = r + 50
          break
        case 10:
          r = r + 40
          break
        case 16:
          r = r + 25
          break
      }
      this.$emit('gotobeat', r)
    },
    changegrid () {
      switch (this.typemeasure) {
        case 4:
          this.typemeasure = 5
          break
        case 5:
          this.typemeasure = 8
          break
        case 8:
          this.typemeasure = 10
          break
        case 10:
          this.typemeasure = 16
          break
        case 16:
          this.typemeasure = 4
          break
      }
    }
  },
  components: {
    BeatEditorToolbar,
    BeatEditorGrid
  }
}
</script>

<style>
</style>
