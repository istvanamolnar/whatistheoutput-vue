import Vue from 'vue';
import App from './App.vue';
import VueHighlightJS from 'vue-highlightjs';
import 'bootstrap';
import'./assets/app.scss';

Vue.use(VueHighlightJS)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
