import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faPlusSquare } from '@fortawesome/fontawesome-free-solid'

/* add icons to the library */
library.add(faPlusSquare);

const app = createApp(App).component("FontAwesomeIcon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
