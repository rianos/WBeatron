<template>
<div>Checking...
<q-modal ref='modeldi' v-model="this.opened">
   <q-card>
      <q-card-title class='text-primary'>
        <q-icon color='primary' size='2em' name="library_music" /> {{this.web.songTitle}}
      </q-card-title>
  <q-card-separator />
  <q-card-main>
    Do you want to continue your previous work, or begin a new one ?
    <br><br>
    <b> You will have to provide the MP3 file location again</b>
  </q-card-main>
  <q-card-actions>
    <q-btn
      color="primary"
      @click="continueaction"
      label="Continue"
    />
     <q-btn
      color="primary"
      outline
      @click="newaction"
      label="New"
    />
  </q-card-actions>
</q-card>
  </q-modal>
</div>
</template>

<script>
// This is where your Javascript goes
// to define your Vue component, which
// can be a Layout, a Page or your own
// component used throughout the app.

export default {
  created () {
    this.existLocalFile()
  },
  methods: {
    newaction () {
      this.closed = true
      this.$q.localStorage.remove('saved_file')
      this.$router.push('/asistant')
    },
    continueaction () {
      this.closed = true
      this.$router.push('/asistantsaved')
    },
    existLocalFile () {
      if (this.$q.localStorage.has('saved_file')) {
        this.web = this.$q.localStorage.get.item('saved_file')
        this.opened = true
      } else {
        this.$q.notify({
          message: 'Previous local work not found',
          detail: 'We are going to launch the new project assitant',
          color: 'negative',
          timeout: 3000,
          icon: 'warning',
          position: 'center'
        })
        this.$router.push('/asistant')
      }
    }
  },
  data () {
    return {
      fichero: false,
      opened: false,
      web: null
    }
  }
  //
}
</script>

<style>
/* This is where your CSS goes */
</style>
