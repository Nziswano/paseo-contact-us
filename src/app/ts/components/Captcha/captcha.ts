import Vue from "vue";
import Component from "vue-class-component";
import getCaptcha from "./lib/captcha";

@Component({

  props: {
    captchaKey: {
      type: String,
    },
    captchaResponse: {
      type: Function,
    },
  },
})
export default class Captcha extends Vue {
  protected localCaptcha: any = null;
  protected widgetId: any =  null;
  protected captchaKey: string;
  protected captchaId: string = null;

  protected createCaptcha: any = (siteCaptcha) => {
    siteCaptcha.then((captcha) => {
      const widgetId = captcha.render("recaptcha", {
        callback: this.validateCaptcha,
        sitekey: this.captchaKey,
      });
      this.setWidgetId(widgetId);
      this.setLocalCaptcha(captcha);
    });
  }

  protected mounted() {
    const captcha = getCaptcha;
    this.createCaptcha(captcha);
  }

  protected setLocalCaptcha(data) {
    this.localCaptcha = data;
  }

  protected resetLocalCaptcha() {
    if (this.localCaptcha) {
      this.localCaptcha.reset();
    }
  }

  protected setWidgetId(data) {
    this.widgetId = data;
  }

  protected validateCaptcha(response) {
    this.$emit("captchaResponse", response);
  }
}
