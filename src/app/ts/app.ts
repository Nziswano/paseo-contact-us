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

import "../../scss/app.scss";

let siteUrl: string; // eslint-disable-line
if (__IS_PROD__) {
  siteUrl = "production";
} else {
  siteUrl = "development";
}

const el = document.getElementById("root");

el.innerHTML += `<h1>${siteUrl}</h1>`;
