import VeeValidate from "vee-validate";
import Vue from "vue";
import Component from "vue-class-component";
import {mask} from "vue-the-mask";
import Captcha from "../Captcha/index.vue";
import getFinger from "./lib/fingerprint";

Vue.use(VeeValidate, {classes: true});

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
  protected url: string;
  // protected captcha: Promise<any>;
  protected finger: Promise<any>;
  protected fullname: string = null;
  protected email: string = null;
  protected telephone: string = null;
  protected postalcode: string = null;
  protected age: number = null;
  protected hideForm: boolean = false;
  protected hideLoader: boolean = true;
  protected isSubmitDisabled: boolean = false;
  protected hideMessage: boolean = true;
  protected resultMessage: boolean = false;

  protected validateBeforeSubmit() {
    this.$validator.validateAll().then((result) => {
      if (result) {
        this.hideLoader = true;
        this.hideForm = !this.hideLoader;
        this.resultMessage = true;
        console.log(result);
        return;
      }
    });
  }

  protected clearErrors() {
    this.$validator.reset();
  }

  protected showForm() {
    this.fullname = this.email = this.telephone = this.postalcode = "";
    this.age = null;
    this.hideMessage = true;
    this.isSubmitDisabled = true;
    this.clearErrors();
    this.hideForm = false;
  }
}
