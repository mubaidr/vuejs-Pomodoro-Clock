// eslint-disable-next-line
Vue.config.productionTip = false
// eslint-disable-next-line
var myApp = new Vue({
  el: '#app',
  data: {
    duration: {
      break: 1,
      session: 1
    },
    remainingTime: {
      minutes: 0,
      seconds: 0
    },
    modes: ['Session', 'Break'],
    activeModeId: 0,
    isActive: false,
    dateNow: '',
    intervalID: null
  },
  created () {
    setInterval(this.updateTime, 1000)
  },
  mounted () {},
  watch: {
    'isActive' (val) {
      // resetclock mode
      this.activeModeId = 0
      if (val) {
        this.startClock()
      } else {
        this.stopClock()
      }
    },
    'remainingTime.seconds' (val) {
      // handle minute update when second changes
      if (val === 59) {
        this.remainingTime.minutes -= 1
      } else if (val === 0) {
        if (this.remainingTime.minutes === 0) {
          // update mode when time ends for current
          this.setNextMode()
        }
      }
    },
    'activeModeId' () {
      // when mode changes, re-start the clock
      this.startClock()
    }
  },
  computed: {
    bckFillHeight () {
      let totalSeconds = this.duration[this.modes[this.activeModeId].toLowerCase()] * 60
      let remSeconds = this.remainingTime.minutes * 60 + this.remainingTime.seconds
      return `height: ${100 - ((remSeconds * 100) / totalSeconds)}%`
    },
    activeMode () {
      return this.modes[this.activeModeId]
    },
    displayTime () {
      let m = this.remainingTime.minutes
      let s = this.remainingTime.seconds

      return (m < 10 ? '0' + m.toString() : m) + ':' + (s < 10 ? '0' + s.toString() : s)
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
      // toggle clock state on clock click
      this.isActive = !this.isActive
    },
    startClock () {
      // set initial time
      this.remainingTime.minutes = this.duration[this.modes[this.activeModeId].toLowerCase()]
      this.remainingTime.seconds = 0

      clearInterval(this.intervalID)
      this.intervalID = setInterval(() => {
        if (--this.remainingTime.seconds < 0) {
          this.remainingTime.seconds = 59
        }
      }, 1000)
    },
    stopClock () {
      // clear interval and mode
      this.activeModeId = 0
      clearInterval(this.intervalID)
    },
    setNextMode () {
      // move to next mode
      if (++this.activeModeId > (this.modes.length - 1)) {
        this.activeModeId = 0
      }
    },
    updateTime () {
      // display current time when clock not active
      this.dateNow = new Date(new Date().getTime()).toLocaleTimeString()
    }
  }
})
