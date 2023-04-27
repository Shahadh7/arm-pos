import { createApp } from 'vue'
import App from './App.vue'
import './samples/node-api'
import router from './router';

import PrimeVue from 'primevue/config';

import './assets/styles.scss';



const app = createApp(App)

app.use(router)
app.use(PrimeVue, { ripple: true })
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
