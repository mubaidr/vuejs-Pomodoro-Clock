// eslint-disable-next-line
Vue.config.productionTip = false
// eslint-disable-next-line
var myApp = new Vue({
  el: '#app',
  data: {
    duration: {
      break: 15,
      session: 30
    },
    modes: ['Session', 'Break'],
    activeModeId: 0,
    isActive: true,
    dateNow: '',
    intervalID: null
  },
  created () {
    setInterval(this.updateTime, 1000)
  },
  mounted () {},
  watch: {},
  computed: {
    activeMode () {
      return this.modes[this.activeModeId]
    },
    remainingTime () {

    }
  },
  methods: {
    setBreak (val) {
      if (this.duration.break + val > 0) {
        this.duration.break += val
      }
      this.isActive = false
    },
    setSession (val) {
      if (this.duration.session + val > 0) {
        this.duration.session += val
      }
      this.isActive = false
    },
    toggleClock () {
      this.isActive = !this.isActive
      this.startClock()
    },
    startClock () {

    },
    setNextMode () {
      if (this.activeModeId++ > (this.modes.length - 1)) {
        this.activeModeId = 0
      }
    },
    updateTime () {
      this.dateNow = new Date(new Date().getTime()).toLocaleTimeString()
    }
  }
})
