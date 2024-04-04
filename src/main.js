import { createApp } from 'vue'
import 'animate.css';


import App from './App.vue'
import router from '../vue-router.js';

import { createPinia } from 'pinia';

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight, faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
library.add(faArrowRight, faInstagram, faMagnifyingGlass, faHeart, faHeartRegular);

//vue-meta
import { createMetaManager, defaultConfig } from 'vue-meta'

const app = createApp(App)

const pinia = createPinia()

app.use(router)
app.use(pinia)
    .component("font-awesome-icon", FontAwesomeIcon)

app.use(createMetaManager(false, {
    ...defaultConfig,
    meta: { tag: 'meta', nameless: true },
}))
app.mount('#app')
