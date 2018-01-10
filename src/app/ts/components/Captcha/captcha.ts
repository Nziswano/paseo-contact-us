import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    captcha: {
      type: Promise,
    },
  },
})
export default class Captcha extends Vue {
  protected captcha: Promise<any>;
  protected localCaptcha: any = null;
  protected widgetId: any =  null;
  protected captchaKey: string = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  protected captchaResponse: string = null;
  protected captchaId: string = null;
  /* data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" */
  protected createCaptcha: any = () => {
    this.captcha.then((captcha) => {
      const widgetId = captcha.render("recaptcha", {
        callback: this.validate_captcha,
        sitekey: this.captchaKey,
      });
      this.setWidgetId(widgetId);
      this.setLocalCaptcha(captcha);
    });
  }

  protected mounted() {
    console.log("This is captcha:", this.captcha);
    this.createCaptcha();
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
