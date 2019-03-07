<template>
    <span style='border-width: 1px; border-style: dotted; border-color: lightgrey;padding: 0px;margin:0px;'>
    <q-icon size='1rem' :name='this.icono' :class='this.classes'/>
    </span>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      matrix: [
        { type: 'void', rotation: 0, icon: 'blur_on', class: 'text-white bg-white', color: 'bg-white' },
        { type: 'bash', rotation: 0, icon: 'language', class: 'text-purple bg-white', color: 'bg-white' },
        { type: 'slice', rotation: 0, icon: 'arrow_upward', class: 'text-white bg-primary', color: 'bg-primary' },
        { type: 'slice', rotation: 45, icon: 'arrow_upward', class: 'text-white rotate-45 bg-amber-10', color: 'bg-amber-10' },
        { type: 'slice', rotation: 90, icon: 'arrow_forward', class: 'text-white bg-indigo', color: 'bg-indigo' },
        { type: 'slice', rotation: 135, icon: 'arrow_forward', class: 'text-white rotate-45 bg-teal', color: 'bg-teal' },
        { type: 'slice', rotation: 180, icon: 'arrow_downward', class: 'text-white bg-pink bg-pink', color: 'bg-pink' },
        { type: 'slice', rotation: 225, icon: 'arrow_downward', class: 'text-white rotate-45 bg-teal-10', color: 'bg-teal-10' },
        { type: 'slice', rotation: -90, icon: 'arrow_back', class: 'text-white bg-red', color: 'bg-red' },
        { type: 'slice', rotation: -45, icon: 'arrow_back', class: 'text-white rotate-45 bg-green', color: 'bg-green' },
        { type: 'throw', rotation: 0, icon: 'gps_fixed', class: 'text-white bg-orange', color: 'bg-orange' }
      ]
    }
  },
  computed: {
    icono () {
      return this.matrix[this.value].icon
    },
    classes () {
      return this.matrix[this.value].class
    },
    color () {
      return this.matrix[this.value].color
    },
    border () {
      if (this.value === 0 || this.value === 1) {
        return 'border'
      } else {
        return ''
      }
    }
  },
  props: {
    value: 0,
    position: 0
  }
}
</script>
<style>
</style>
