import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
// #ifndef VUE3
import Vue from 'vue'
// import VConsole from 'vconsole/dist/vconsole.min.js'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
})
// const vConsole = new VConsole()
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
// #endif
