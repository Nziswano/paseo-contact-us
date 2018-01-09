import Vue from "vue";
import * as Webfont from "webfontloader";
import ContactForm from "../components/ContactForm/ContactForm";

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
  render(h) {
    return h(ContactUs);
  },
  el: "#root",
});
