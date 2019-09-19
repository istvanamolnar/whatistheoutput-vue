import Vue from 'vue'
import App from './App.vue';
import 'bootstrap';
import'./assets/app.scss';
import router from "./router";

import VueHighlightJS from 'vue-highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atelier-savanna-dark.css';


Vue.use(VueHighlightJS, {
	languages: {
		javascript
	}
});

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
