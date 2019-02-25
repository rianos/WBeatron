<template>
  <q-btn :disable='this.disabled' round :outline='this.outline' :color='this.classicon.c' @click='alternate'>
    <q-icon name='gps_fixed' :class='this.classicon.cl' />
  </q-btn>
</template>
<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
    }
  },
  props: [
    'position',
    'value'
  ],
  computed: {
    disabled () {
      return this.$store.state.general.isplaying
    },
    outline () {
      if (this.value === 0) {
        return true
      }
      return false
    },
    classicon () {
      if (this.value === 10) {
        return {c: 'orange', cl: 'text-white'}
      } else {
        return {c: 'blue-9', cl: 'text-white'}
      }
    }
  },
  methods: {
    alternate () {
      let tmpv = this.value
      if (this.value === 10) {
        tmpv = 0
      } else {
        tmpv = 10
      }
      var tmp = {
        val: tmpv,
        pos: this.position
      }
      this.$emit('updated', tmp)
    }
  }
}
</script>
<style>
</style>
