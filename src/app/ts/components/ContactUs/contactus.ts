import axios from "axios";
import VeeValidate, {Validator} from "vee-validate";
import Vue from "vue";
import Component from "vue-class-component";
import {mask} from "vue-the-mask";
import Captcha from "../Captcha/index.vue";
import getFinger from "./lib/fingerprint";

Vue.use(VeeValidate, {classes: true});

// tslint:disable:no-console

@Component({
  components: {
    Captcha,
  },
  directives: {mask},
  props: {
      captcha: {
       type: String,
     },
    url: {
      type: String,
    },
  },
})
export default class ContactUs extends Vue {

  public $refs: any = {
    captchaComponent: Captcha,
  };

  // Properties
  protected url: string;
  protected captcha: string;
  protected finger: any;
  // Form Vars
  protected fullname: string = null;
  protected email: string = null;
  protected telephone: string = null;
  protected postalcode: string = null;
  protected age: number = null;
  // Component Vars
  protected captchaResponse: string = null;
  protected isSubmitDisabled: boolean = true;
  protected hideLoader: boolean = true;
  protected hideForm: boolean = false;
  protected hideMessage: boolean = true;
  protected resultMessage: boolean = false;
  protected errors: any;

  /**
   * Component mounts
   */
  protected mounted() {
    getFinger.then( (result) => {
      this.finger = result;
    } );
  }
  /**
   * Form validation
   */
  protected validateBeforeSubmit() {
    this.$validator.validateAll().then((result) => {
      if (result) {
        this.hideLoader = false;
        this.hideForm = true;
        this.isSubmitDisabled = true;
        const fields = {
          age: this.age,
          captcha: this.captchaResponse,
          email: this.email,
          fingerprint: this.finger,
          fullname: this.fullname,
          mobile: this.telephone,
          postalcode: this.postalcode,
          time: new Date().toLocaleString(),
        };

        setTimeout(() => {
          console.log("data:", fields);
          this.hideLoader = true;
          this.hideMessage = false;
          this.resultMessage = true;
        }, 1000);

        return;
      }
    });
  }

  /** CaptchaKey */
  protected get captchaKey() {
    return this.captcha;
  }

  /**
   * Reset Form
   */
  protected clearErrors() {
    this.$validator.reset();
  }

  /**
   * Captcha response from Captcha component
   * @param response string
   */
  protected validateCaptcha(response) {
    this.captchaResponse = response;
    this.isSubmitDisabled = false;
  }

  /**
   * Reset the form to blank
   */
  protected showForm() {
    this.fullname
    = this.email
    = this.telephone
    = this.age
    = this.postalcode = null;
    this.hideMessage = true;
    this.clearErrors();
    this.$refs.captchaComponent.resetLocalCaptcha();
    this.hideForm = false;
  }

}
