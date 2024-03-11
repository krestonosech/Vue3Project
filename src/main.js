import { createApp } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createYmaps } from 'vue-yandex-maps';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(createYmaps({
  apikey: '2344aa66-cfc5-439d-90e1-47cb3f72d475',
}));
app.mount('#app');
