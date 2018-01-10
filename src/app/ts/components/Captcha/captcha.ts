import Vue from "vue";
import Component from "vue-class-component";
import getCaptcha from "./lib/captcha";

@Component({
  props: {
    captchaKey: {
      type: String,
    },
  },
})
export default class Captcha extends Vue {
  // protected captcha: Promise<any>;
  protected localCaptcha: any = null;
  protected widgetId: any =  null;
  protected captchaKey: string;
  protected captchaResponse: string = null;
  protected captchaId: string = null;
  protected createCaptcha: any = (siteCaptcha) => {
    siteCaptcha.then((captcha) => {
      const widgetId = captcha.render("recaptcha", {
        callback: this.validate_captcha,
        sitekey: this.captchaKey,
      });
      this.setWidgetId(widgetId);
      this.setLocalCaptcha(captcha);
    });
  }

  protected mounted() {
    const captcha = getCaptcha;
    console.log("This is captcha:", this.captchaKey);
    this.createCaptcha(captcha);
  }

  protected setLocalCaptcha(data) {
    this.localCaptcha = data;
  }

  protected resetLocalCaptcha() {
    this.localCaptcha.reset();
  }

  protected setWidgetId(data) {
    this.widgetId = data;
  }

  protected validate_captcha(response) {
    this.captchaResponse = response;
  }
}
