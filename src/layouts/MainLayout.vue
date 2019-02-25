<template>
<q-layout>

  <!-- optional -->
  <q-layout-header reveal>
    <q-toolbar>
     <q-toolbar-title>
        Beatron2000 Web Code Editor
        <div slot="subtitle">{{ songTitle }} {{ songArtist}} </div>
     </q-toolbar-title>
    <q-btn flat round dense icon="home" @click='goHome'/>
     <q-btn flat round dense icon="save" @click='saveLocal'/>
     <q-btn flat round dense icon="add_circle" @click='newSong'/>
  </q-toolbar>
  <q-tabs animated inverted >
      <q-route-tab slot="title" icon="queue_music" to="/songdetails"  default hide="label" label="Song Details" />
      <q-route-tab slot="title" icon="audiotrack" to="/beatcoder"  hide="label" label="Beat Coder" />
      <q-route-tab slot="title" icon="swap_horiz" to="/importexport"  hide="label" label="Import / Export" />
    </q-tabs>
  </q-layout-header>
  <q-page-container>
    <router-view />
  </q-page-container>
</q-layout>
</template>
<script>
import {LocalStorage} from 'quasar'
export default {
  name: 'MainLayout',
  data () {
    return {}
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    newSong () {
      this.$router.push('/asistant')
    },
    saveLocal () {
      let web = {
        songTitle: this.$store.state.general.songTitle,
        songArtist: this.$store.state.general.songArtist,
        songAttribution: this.$store.state.general.songAttribution,
        start: this.$store.state.general.start,
        beatoffset: this.$store.state.general.beatoffset,
        bpm: this.$store.state.general.bpm,
        beats: this.$store.state.general.beats,
        flagbeats: this.$store.state.general.flagbeats,
        mobileWeb: this.$store.state.general.mobileView
      }
      LocalStorage.set('saved_file', web)
      this.$q.notify({
        message: 'Project saved in local browser cache',
        detail: 'Next time you open your browser, your work would be available\n\nYou will have to provide the MP3 again',
        color: 'positive',
        timeout: 6000,
        icon: 'info',
        position: 'center'
      })
    }
  },
  computed: {
    songTitle: {
      get () {
        return this.$store.state.general.songTitle
      }
    },
    songArtist: {
      get () {
        if (this.$store.state.general.songArtist) {
          return ' by ' + this.$store.state.general.songArtist
        } else {
          return ''
        }
      }
    }
  }
}
</script>

<style>
</style>
