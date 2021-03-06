import Vue from "vue";
import * as Webfont from "webfontloader";
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

let siteUrl: string = "http://localhost:5000/register";
let captchaKey: string = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
Vue.config.devtools = true;

if (__IS_PROD__) {
  siteUrl = "production";
  captchaKey = "";
  Vue.config.devtools = false;
}

const app = new Vue({
  el: "#root",
  render: (h) => h(ContactUs, {
    props: {
      captcha: captchaKey,
      url: siteUrl,
    },
  }),
});
