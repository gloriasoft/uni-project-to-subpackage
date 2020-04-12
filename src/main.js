import Vue from 'vue'
import App from './App'

import store from './store'
// require('./pages.js')

Vue.config.productionTip = false

Vue.prototype.$store = store

// console.log(require('./pages.js'),8888)
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
