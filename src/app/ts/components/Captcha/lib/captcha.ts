const getCaptcha  = new Promise( (resolve) => {

    if ( typeof Window !== "undefined" ) {
        (window as any).initCaptcha = () => {
          resolve((window as any).grecaptcha);
        };
    }
});

export default getCaptcha;
