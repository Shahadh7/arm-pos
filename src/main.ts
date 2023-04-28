import { createApp } from 'vue'
import App from './App.vue'
// import './samples/node-api'
import router from './router';
import { sequelize } from "./database"
import PrimeVue from 'primevue/config';

import './assets/styles.scss';

sequelize.authenticate().then(() => console.log("connected")
).catch((err: any) => console.log(err))

const app = createApp(App)

app.use(router)
app.use(PrimeVue, { ripple: true })
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
