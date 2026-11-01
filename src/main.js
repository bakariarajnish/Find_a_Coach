import { createApp } from 'vue';

import store from './store/index.js';

import routes from './router';
import App from './App.vue';

const app = createApp(App);
app.use(store);
app.use(routes);

app.mount('#app');
