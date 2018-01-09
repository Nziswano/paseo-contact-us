// import axios from "axios";
// import Validator from "vee-validate";
// import Vue from "vue";
// import Component from "vue-class-component";
// import {mask} from "vue-the-mask";
// // import {TheMask} from "vue-the-mask";
// import getFinger from "../../../ts/fingerprint";

// @Component(
//     {
//         // components: {TheMask},
//         directives: {mask},
//         props:
//         {
//             captcha: {
//                 type: Promise,
//             },
//             url: {
//                 type: String,
//             },
//         },
//     })
// export default class ContactForm extends Vue {
//     protected url: string;
//     protected captcha: Promise<any>;
//     protected captchaResponse: string = null;
//     protected finger: Promise<any>;
//     protected fingerprint: string = null;
//     protected fullname: string = null;
//     protected email: string = null;
//     protected telephone: string = null;
//     protected message: string = null;
//     protected isSubmitDisabled: boolean = true;
//     protected rcaptSigKey: string =  null;
//     protected rcaptId: number = 0; // will be used later
//     protected hideLoader: boolean = true;
//     protected hideForm: boolean = false;
//     protected hideMessage: boolean = true;
//     protected resultMessage: boolean = null;
//     protected nonce: string = null;
//     protected pascheck: string = null;
//     protected localCaptcha: any = null;
//     protected widgetId: any = null;

//     /* Retrieve header information from server to setup local client*/
//     protected getInitHeaders: any = (result) => {
//         axios( {
//                    headers: { "PAS-Fingerprint": result },
//                    method: "get",
//                    url: this.url,
//                } )
//             .then( (response) => {
//                 this.setHeaders(response);
//             });
//     }

//     /* Create captcha after captcha key retrieved from server */
//     protected createCaptcha: any = (captchaKey) => {
//         this.captcha.then( (captcha) => {
//                                const widgetId = captcha.render("recaptcha", {
//                                    callback: this.validate_captcha,
//                                    sitekey: captchaKey,
//                                });
//                                this.setCaptchaKey(captchaKey);
//                                this.setWidgetId(widgetId);
//                                this.setLocalCaptcha(captcha);
//                            },
//         );
//     }

//     /* Set the data to send back to the server when submitting your data */
//     protected setHeaders: any = (response) => {
//         this.setFingerprint(response.headers["pas-fingerprint"]);
//         this.setNonce(response.headers[ "pas-nonce" ]);
//         this.setPascheck(response.headers[ "pas-check" ]);

//         this.createCaptcha(response.headers["pas-captcha"]);
//     }

//     protected mounted() {

//         getFinger.then( (result) => this.getInitHeaders(result) );

//         /* for testing */
//         // show final screen for final
//         // this.resultMessage = false;
//         // this.hideForm = true;
//         // this.hideMessage = false;
//         // this.hideForm = true;
//         // this.hideLoader = false;
//     }

//     /* local captcha so we can reset it */
//     protected setLocalCaptcha( data ) {
//         this.localCaptcha = data;
//     }

//     protected setWidgetId(data) {
//         this.widgetId = data;
//     }

//     /* set information from headers */
//     protected setFingerprint(data) {this.fingerprint = data; }
//     protected setNonce(data) {this.nonce = data; }
//     protected setPascheck(data) { this.pascheck = data; }
//     protected setCaptchaKey(data) {this.rcaptSigKey = data; }

//     protected validate_captcha(response) {
//         this.captchaResponse = response;
//         this.isSubmitDisabled = false;
//     }

//     /* Submit data - validate first */
//     protected validateBeforeSubmit() {
//         this.$validator.validateAll().then((result) => {
//             if (result) {
//                 this.hideLoader = false;
//                 this.hideForm = !this.hideLoader;
//                 axios(
//                     {
//                         data: {
//                             captcha: this.captchaResponse,
//                             email: this.email,
//                             fingerprint: this.fingerprint,
//                             fullname: this.fullname,
//                             message: this.message,
//                             telephone: this.telephone,
//                            },
//                         headers: {
//                             "PAS-Check": this.pascheck,
//                             "PAS-Fingerprint": this.fingerprint,
//                             "PAS-Nonce": this.nonce,
//                             },
//                         method: "post",
//                         url: this.url,
//                     })
//                      .then( (response) => {
//                          this.hideLoader = true;
//                          this.hideMessage = !this.hideLoader;
//                          this.resultMessage = response.data;
//                 })
//                     .catch( (response) => {
//                         this.hideLoader = true;
//                         this.hideMessage = !this.hideLoader;
//                         this.resultMessage = false;
//                     });
//                 return;
//             }
//         });
//     }

//     /* Reset validator */
//     protected clearErrors() {
//         this.$validator.reset();
//     }

//     /* show form after message is dismissed */
//     protected showForm() {
//         this.fullname = this.email = this.telephone = this.message = "";
//         this.hideMessage = true;
//         this.isSubmitDisabled = true;
//         this.clearErrors();
//         this.localCaptcha.reset();
//         this.hideForm = false;
//     }
// }

import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ContactForm extends Vue {
  protected msg: string = "Hello World";
}
