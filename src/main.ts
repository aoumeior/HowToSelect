import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

declare global {
  interface Window { require: any }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
