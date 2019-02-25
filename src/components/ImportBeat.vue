<template>
   <q-uploader hide-upload-button auto-expand @add='localuploadbeat' url='' extensions='.csv'/>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  methods: {
    localuploadbeat (files) {
      var self = this
      if (files.length > 0) {
        this.visile = true
        this.$q.loading.show({
          spinner: 'QSpinnerAudio',
          message: 'Processing MetaFile. Please wait',
          messageColor: 'white',
          spinnerSize: 100, // in pixels
          spinnerColor: 'primary',
          customClass: 'bg-blue-4'
        })
        var file = files[0]
        var reader = new FileReader()
        reader.onload = function (fileEvent) {
          let beats
          beats = self.parsefile(reader.result)
          self.$store.commit('general/beats', beats)
          self.$q.loading.hide()
          self.$emit('success')
        }
        reader.readAsText(file)
      }
    },
    parsefile (filecontent) {
      let beats = []
      let lines = filecontent.split('\n')
      beats[0] = {
        pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
      for (let i = 1; i < lines.length - 1; i++) {
        let data = lines[i].split(',')
        // Prueba
        let beat = ((data[0] - 1) * 4 + (data[1] - 1)) * 100 //  para redondear indice entero
        if (data[2].indexOf('4') === -1) {
          continue
        }
        if (beats[beat] === undefined) {
          beats[beat] = {
            pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          let flagbeats = this.$store.state.general.flagbeats
          flagbeats.push(beat)
          this.$store.commit('general/flagbeats', flagbeats)
        }
        // Fim
        // let beat = ((data[0] - 1) * 4 * 2) + ((data[1] - 1) * 2)
        // let level = [0, 0, 0, 0]
        // for (let j = 0; j < data[2].length; j++) {
        //   level[data[2].charAt(j) - 1] = 1
        // }
        // beats[beat].level = level
        let matrix = {
          '0': 2,
          '45': 3,
          '90': 4,
          '135': 5,
          '180': 6,
          '225': 7,
          '-90': 8,
          '-45': 9,
          '270': 8,
          '315': 9
        }
        switch (data[3]) {
          case 'Throw':
            beats[beat].pattern[data[4]] = 10
            break
          case 'Bash':
            beats[beat].pattern[data[4]] = 1
            break
          case 'Slice':
            beats[beat].pattern[data[4]] = matrix[data[5]]
        }
      }
      beats[100000] = {
        pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
      let flagbeats = this.$store.state.general.flagbeats
      flagbeats.push(100000)
      this.$store.commit('general/flagbeats', flagbeats)
      return beats
    }
  }
}
</script>

<style>
</style>
