'use client';
import PrivateCaptcha from '@private-captcha/react';

export default function Home() {
  const handleInit = (detail: any) => {
    console.log('Captcha initialized', detail);
  };

  const handleError = (detail: any) => {
    console.log('Captcha error', detail);
  };

  const handleStart = (detail: any) => {
    console.log('Captcha started', detail);
  };

  const handleFinish = (detail: any) => {
    console.log('Captcha finished', detail);
    console.log('Solution:', detail.widget.solution());
  };

  return (
    <div>
      <h1>Testing Captcha</h1>
      <form>
        <PrivateCaptcha
          siteKey="aaaaaaaabbbbccccddddeeeeeeeeeeee"
          theme="dark"
          onInit={handleInit}
          onError={handleError}
          onStart={handleStart}
          onFinish={handleFinish}
        />
      </form>
    </div>
  );
}
