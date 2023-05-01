import { createApp } from 'vue'
import App from './App.vue'
// import './samples/node-api'
import router from './router';
import { sequelize } from "./database"
import './assets/styles.scss';


import PrimeVue from 'primevue/config';
import TabMenu from 'primevue/tabmenu';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';



sequelize.authenticate().then(() => console.log("connected")
).catch((err: any) => console.log(err))

const app = createApp(App)

app.component('TabMenu', TabMenu);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Toast', Toast);
app.component('DataTable', DataTable);
app.component('Column', Column);

app.use(ToastService)
app.use(ConfirmationService)

app.use(router)
app.use(PrimeVue, { ripple: true })
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
