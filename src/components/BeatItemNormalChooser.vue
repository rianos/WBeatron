<template>
 <div class='column flex-center'>
    <div class="row group">
     <q-btn size=lg color='green' @click='val(9)' >
      <q-icon size='2rem' name='arrow_back' class='text-white bg-green rotate-45'/>
     </q-btn>
     <q-btn size=lg color='primary' @click='val(2)'>
      <q-icon size='2rem' name='arrow_upward' class='text-white bg-primary' />
     </q-btn>
     <q-btn size=lg color='amber-10' @click='val(3)'>
      <q-icon size='2rem' name='arrow_upward' class='text-white bg-amber-10 rotate-45' />
     </q-btn>
    </div>
    <div class="row group">
     <q-btn size=lg color='red' @click='val(8)'>
      <q-icon size='2rem' name='arrow_back' class='text-white bg-red' />
     </q-btn>
     <q-btn size=lg color='white' @click='val(1)'>
      <q-icon size='2rem' name='language' class='text-purple bg-white' />
     </q-btn>
     <q-btn size=lg color='indigo' @click='val(4)'>
      <q-icon size='2rem' name='arrow_forward' class='text-white bg-indigo' />
     </q-btn>
    </div>
    <div class="row group">
      <q-btn size=lg color='teal-10' @click='val(7)'>
      <q-icon size='2rem' name='arrow_downward' class='text-white bg-teal-10 rotate-45' />
     </q-btn>
     <q-btn size=lg color='pink' @click='val(6)'>
      <q-icon size='2rem' name='arrow_downward' class='text-white bg-pink' />
     </q-btn>
     <q-btn size=lg color='teal' @click='val(5)'>
      <q-icon size='2rem' name='arrow_forward' class='text-white bg-teal rotate-45' />
     </q-btn>
    </div>
    <div class="row group" @click='val(0)'>
     <q-btn size=lg color='white'>
      <q-icon size='2rem' name='block' class='text-red bg-white' />
     </q-btn>
     <q-btn size=lg color='white'>
      <q-icon size='2rem' name='block' class='text-red bg-white' />
     </q-btn>
     <q-btn size=lg color='white'>
      <q-icon size='2rem' name='block' class='text-red bg-white' />
     </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      value: 0
    }
  },
  methods: {
    val (v) {
      this.value = v
      this.$emit('changed', this.value)
    }
  }
}
</script>

<style>
</style>
