<template>
<q-layout>

  <!-- optional -->
  <q-layout-header reveal>
    <q-toolbar>
     <q-toolbar-title>
        Beatron2000 Web Code Editor
        <div slot="subtitle">{{ songTitle }} {{ songArtist}} </div>
     </q-toolbar-title>
    <q-btn flat round dense icon="home" @click='goHome'>
      <q-tooltip :delay='1000'>Go to <b>Main Page</b></q-tooltip>
    </q-btn>
     <q-btn flat round dense icon="save" ref='savetoolbarbutton' @click='saveLocal'>
       <q-tooltip :delay='1000'>Generate and Save <b>WBE export file</b> </q-tooltip>
     </q-btn>
     <q-btn flat round dense icon="add_circle" @click='newSong'>
       <q-tooltip :delay='1000'>Create <b>new</b> Project</q-tooltip>
     </q-btn>
  </q-toolbar>
  <q-tabs animated inverted >
      <q-route-tab slot="title" icon="queue_music" to="/songdetails"  default hide="label" label="Song Details" />
      <q-route-tab slot="title" icon="audiotrack" to="/beatcoder"  hide="label" label="Beat Coder" />
      <q-route-tab slot="title" icon="swap_horiz" to="/importexport"  hide="label" label="Import / Export" />
    </q-tabs>
  </q-layout-header>
  <q-page-container>
    <router-view @autosave='autosave'/>
  </q-page-container>
  <export-stepper v-show='false' ref='exporterAux'/>
</q-layout>
</template>
<script>
import {LocalStorage} from 'quasar'
import ExportStepper from 'components/ExportStepper'
export default {
  name: 'MainLayout',
  components: {
    ExportStepper
  },
  data () {
    return {}
  },
  methods: {
    autosave () {
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
    },
    goHome () {
      this.$router.push('/')
    },
    newSong () {
      this.$router.push('/asistant')
    },
    saveLocal () {
      this.autosave()
      this.$refs.exporterAux.save_web()
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
