<template>
  <div>
   <div :title='this.beat' @click='gotobeat'><q-chip :class='bg' class='cursor-pointer' size='2em' name='crop_din' :color='color' >{{this.mark}}</q-chip></div>
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
.bordermark {
  border-width: 7px;
  border-style: solid;
  border-color: black;
}
.bordermarkINTER {
  border-width: 7px;
  border-style: solid;
  border-color: darkblue;

}
</style>
