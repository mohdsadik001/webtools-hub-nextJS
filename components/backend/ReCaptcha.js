'use client';

import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useImperativeHandle, forwardRef } from 'react';

const ReCaptcha = forwardRef(({ onVerify, onExpired }, ref) => {
  const recaptchaRef = useRef();

  useImperativeHandle(ref, () => ({
    reset: () => {
      recaptchaRef.current?.reset();
    },
    execute: () => {
      recaptchaRef.current?.execute();
    },
  }));

  return (
    <div className="recaptcha-container">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onVerify}
        onExpired={onExpired}
        theme="light"
        size="normal"
      />
    </div>
  );
});

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;
