// eslint-disable-next-line
Vue.config.productionTip = false
// eslint-disable-next-line
var myApp = new Vue({
  el: '#app',
  data: {
    title: 'Session',
    time: '12:39',
    duration: {
      break: 15,
      session: 30
    }
  },
  created () {},
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    setBreak (val) {
      this.duration.break += val
    },
    setSession (val) {
      this.duration.session += val
    }
  }
})
