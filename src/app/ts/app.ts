import Vue from "vue";
import App from "./App.vue";
import Register from "./components/register/Register.vue";

import * as Webfont from "webfontloader";

Webfont.load({
  google: {
    families: [
      "Annie Use Your Telescope",
      "PT Sans Narrow",
      "Roboto",
  ],
  },
});

const ContactUs = Vue.component("contact-us", {
  template: "<h1>This is a test</h1>",
});

import "../../scss/app.scss";

let siteUrl: string; // eslint-disable-line
if (__IS_PROD__) {
  siteUrl = "production";
} else {
  siteUrl = "development";
}

const app = new Vue({
  el: "#root",
  render: (h) => h(App),
});
