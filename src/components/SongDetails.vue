<template>
<span class="margind">
<q-field
  icon="audiotrack"
  label="Title"
  label-width=4
>
<q-input v-model="songTitle"  float-label='Song name'/>
</q-field>
<q-field
  icon="perm_identity"
  label="Artist"
  label-width=4
>
<q-input v-model="songArtist"  float-label='Artist name'/>
</q-field>
<q-field
  icon="face"
  label="Attribution"
  label-width=4
>
<q-input v-model="songAttribution"  float-label='Attribution name'/>
</q-field>
</span>
</template>

<script>
// This is where your Javascript goes
// to define your Vue component, which
// can be a Layout, a Page or your own
// component used throughout the app.
export default {
  created () {
  },
  computed: {
    songTitle: {
      get () {
        return this.$store.state.general.songTitle
      },
      set (value) {
        this.$store.commit('general/songTitle', value)
      }
    },
    songArtist: {
      get () {
        return this.$store.state.general.songArtist
      },
      set (value) {
        this.$store.commit('general/songArtist', value)
      }
    },
    songAttribution: {
      get () {
        return this.$store.state.general.songAttribution
      },
      set (value) {
        this.$store.commit('general/songAttribution', value)
      }
    }
  },
  methods: {
    existLocalFile () {
      let title = localStorage.getItem('songTitle')
      if (title) {
        this.$q.notify(title)
        this.$store.commit('general/songTitle', title)
      } else {
        this.$q.notify({
          message: 'Previous work not found',
          color: 'negative',
          timeout: 1000,
          icon: 'warning'
        })
        this.$router.push('/asistant')
      }
    }
  },
  data () {
    return {
      fichero: false
    }
  }
  //
}
</script>

<style>
.margind { margin: 30px;}
</style>
