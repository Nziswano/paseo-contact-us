import Vue from "vue";
import * as Webfont from "webfontloader";
import getCaptcha from "./captcha";
import ContactUs from "./components/ContactUs/index.vue";

Webfont.load({
  google: {
    families: [
      "Annie Use Your Telescope",
      "PT Sans Narrow",
      "Roboto",
  ],
  },
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
  render: (h) => h(ContactUs, {
    props: {
      captcha: getCaptcha,
    },
  }),
});
