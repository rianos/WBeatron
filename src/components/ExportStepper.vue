<template>
 <div>
    <q-btn outline icon="save_alt" color="primary" label='Save Meta file' @click='save_meta' />
    <q-btn outline icon="save_alt" color="primary" label='Save Beats file' @click='save_beats' />
    <q-btn c outline icon="save_alt" color="tertiary" label='Save Web format' @click='save_web' />
    <q-btn c outline icon="file_copy" color="tertiary" label='Drop WBE file to clipboard' @click='save_web_clipboard' />
    <br><br><textarea id='textc' contentEditable='true' readOnly='false' v-show='this.visible' v-model='webcontent'></textarea>
 </div>
</template>

<script>
import { saveAs } from 'file-saver'
import * as clipboard from 'clipboard-polyfill'
export default {
  // name: 'ComponentName',
  data () {
    return {
      visible: false,
      webcontent: ''
    }
  },
  methods: {
    writeText (str) {
      return new Promise(function (resolve, reject) {
        var success = false
        function listener (e) {
          e.clipboardData.setData('text/plain', str)
          e.preventDefault()
          success = true
        }
        document.addEventListener('copy', listener)
        document.execCommand('copy')
        document.removeEventListener('copy', listener)
        success ? resolve() : reject(new Error('error copying to clipboard'))
      })
    },
    generate_wbe () {
      let web = {
        songTitle: this.$store.state.general.songTitle,
        songArtist: this.$store.state.general.songArtist,
        songAttribution: this.$store.state.general.songAttribution,
        start: this.$store.state.general.start,
        beatoffset: this.$store.state.general.beatoffset,
        bpm: this.$store.state.general.bpm,
        beats: this.$store.state.general.beats,
        flagbeats: this.$store.state.general.flagbeats,
        mobileWeb: this.$store.state.general.mobileWeb
      }
      return web
    },
    save_web_clipboard () {
      let web = this.generate_wbe()
      this.visible = true
      this.webcontent = JSON.stringify(web)
      clipboard.writeText(this.webcontent)
    },
    save_web () {
      let web = this.generate_wbe()
      let filename = this.$store.state.general.songTitle.replace(/ /g, '-')
      filename = filename + '-web.wbe'
      let blob = new Blob([JSON.stringify(web)], {type: 'application/json;charset=utf8'})
      saveAs(blob, filename)
    },
    save_meta () {
      let content = 'title: ' + this.$store.state.general.songTitle + '\n'
      content = content + 'artist: ' + this.$store.state.general.songArtist + '\n'
      content = content + 'attribution: ' + this.$store.state.general.songAttribution + '\n'
      content = content + 'bpm: ' + this.$store.state.general.bpm + '\n'
      content = content + 'beatOffset: ' + this.$store.state.general.beatoffset + '\n'
      content = content + 'startOnMeasure: ' + this.$store.state.general.start + '\n'
      let filename = this.$store.state.general.songTitle.replace(/ /g, '-')
      filename = filename + '-meta.txt'
      let blob = new Blob([content], {type: 'text/plain;charset=utf8'})
      saveAs(blob, filename)
    },
    save_beats () {
      let content = []
      let head = 'Measure,Beat,Levels,Event Type,Position,Rotation,Details,Comment'
      content.push(head)
      let flagbeats = this.$store.state.general.flagbeats
      let beats = this.$store.state.general.beats
      for (let i = 0; i < (flagbeats.length - 1); i++) {
        let flag = flagbeats[i]
        let pattern = beats[flag].pattern
        let measure = parseInt(flag / 100 / 4) + 1
        let beatp = ((flag - ((measure - 1) * 4 * 100)) / 100) + 1
        let level = '1234'
        head = ''
        head = measure + ',' + beatp.toFixed(2) + ',' + level
        for (let j = 0; j < pattern.length; j++) {
          if (pattern[j] === 0) {
            continue
          }
          let contentb = ''
          switch (pattern[j]) {
            case 1:
              contentb = ',Bash,' + j + ',90,,'
              content.push(head + contentb)
              break
            case 2:
              contentb = ',Slice,' + j + ',0,,'
              content.push(head + contentb)
              break
            case 3:
              contentb = ',Slice,' + j + ',45,,'
              content.push(head + contentb)
              break
            case 4:
              contentb = ',Slice,' + j + ',90,,'
              content.push(head + contentb)
              break
            case 5:
              contentb = ',Slice,' + j + ',135,,'
              content.push(head + contentb)
              break
            case 6:
              contentb = ',Slice,' + j + ',180,,'
              content.push(head + contentb)
              break
            case 7:
              contentb = ',Slice,' + j + ',225,,'
              content.push(head + contentb)
              break
            case 8:
              contentb = ',Slice,' + j + ',270,,'
              content.push(head + contentb)
              break
            case 9:
              contentb = ',Slice,' + j + ',315,,'
              content.push(head + contentb)
              break
            case 10:
              contentb = ',Throw,' + j + ',0,,'
              content.push(head + contentb)
              break
          }
        }
      }
      let filename = this.$store.state.general.songTitle.replace(/ /g, '-')
      filename = filename + '-beatdata.csv'
      let blob = new Blob([content.join('\n')], {type: 'text/plain;charset=utf8'})
      saveAs(blob, filename)
    }
  }
}
</script>

<style>
</style>
