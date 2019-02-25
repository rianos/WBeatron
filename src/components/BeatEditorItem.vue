<template>
  <div>
   <div :title='this.beat' @click='gotobeat'><q-chip :class='bg' class='cursor-pointer' size='2em' name='crop_din' :color='color' >{{this.mark}}</q-chip><q-icon  v-if='(beat % 400) === 0' class='rotate-90' size='1em' name='drag_handle' /></div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  methods: {
    gotobeat () {
      this.$emit('gotobeat', this.beat)
    }
  },
  props: [
    'color',
    'beat',
    'mark',
    'bg'
  ]
}
</script>

<style>
</style>
