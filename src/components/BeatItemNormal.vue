<template>
    <q-chip square :color='this.color' :class='this.border'>
     <q-popover :disable='this.disabled' max-height=500px cover ref='popitem' v-close-overlay self='center middle'>
       <beat-item-normal-chooser @changed='registervalue'/>
     </q-popover>
    <q-icon size='2rem' :name='this.icono' :class='this.classes'/>
    </q-chip>
</template>

<script>

import BeatItemNormalChooser from 'components/BeatItemNormalChooser'
export default {
  data () {
    return {
      matrix: [
        { type: 'void', rotation: 0, icon: 'blur_on', class: 'text-white', color: 'white' },
        { type: 'bash', rotation: 0, icon: 'language', class: 'text-purple', color: 'white' },
        { type: 'slice', rotation: 0, icon: 'arrow_upward', class: 'text-white', color: 'primary' },
        { type: 'slice', rotation: 45, icon: 'arrow_upward', class: 'text-white rotate-45', color: 'amber-10' },
        { type: 'slice', rotation: 90, icon: 'arrow_forward', class: 'text-white', color: 'indigo' },
        { type: 'slice', rotation: 135, icon: 'arrow_forward', class: 'text-white rotate-45', color: 'teal' },
        { type: 'slice', rotation: 180, icon: 'arrow_downward', class: 'text-white bg-pink', color: 'pink' },
        { type: 'slice', rotation: 225, icon: 'arrow_downward', class: 'text-white rotate-45', color: 'teal-10' },
        { type: 'slice', rotation: -90, icon: 'arrow_back', class: 'text-white bg-red', color: 'red' },
        { type: 'slice', rotation: -45, icon: 'arrow_back', class: 'text-white rotate-45', color: 'green' }
      ]
    }
  },
  props: [
    'position',
    'value'
  ],
  methods: {
    registervalue (val) {
      this.$refs.popitem.hide()
      var tmp = {
        val: val,
        pos: this.position
      }
      this.$emit('updated', tmp)
    }
  },
  computed: {
    disabled () {
      return this.$store.state.general.isplaying
    },
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
  components: {
    BeatItemNormalChooser
  }
}
</script>
<style>
.border {
  border-width: 1px;
  border-color:steelblue;
  border-style: solid;
  height: 3rem;
}
</style>
