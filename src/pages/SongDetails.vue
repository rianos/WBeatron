<template>
    <q-page class="row inline items-start">
    <q-card class='margind'>
      <q-card-title class='bg-primary text-white'>
        <q-icon name='queue_music' size="2rem" />
        Song details
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <song-details>
        </song-details>
      </q-card-main>
    </q-card>
     <q-card class='margind'>
      <q-card-title class='bg-primary text-white'>
      <q-icon name='build' size="2rem" />
        Technical song details
      </q-card-title>
      <q-card-separator />
      <q-card-main>
       <song-technicals></song-technicals>
      </q-card-main>
    </q-card>
    </q-page>
  </template>
<style>
  .margind {
    margin: 20px;
  }
</style>
<script>
import SongDetails from 'components/SongDetails'
import SongTechnicals from 'components/SongTechnicals'
export default {
  name: 'PageSongDetails',
  components: {
    SongDetails,
    SongTechnicals
  }
}
</script>
