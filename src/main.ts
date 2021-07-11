import { createApp } from "vue";

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import VueGridLayout from "vue-grid-layout";

import App from "./App.vue";
import store from "./store";
import i18n from "./i18n";

createApp(App)
  .use(i18n)
  .use(store)
  .use(VueGridLayout)
  .mount("#app");
