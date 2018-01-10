const getCaptcha  = new Promise( (resolve) => {

    if ( typeof Window !== "undefined" ) {
        (window as any).initCaptcha = () => {
          console.log('captcha activated');
            resolve((window as any).grecaptcha);
        };
    }
});

export default getCaptcha;
