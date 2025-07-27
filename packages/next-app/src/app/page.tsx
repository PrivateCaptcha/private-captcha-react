'use client';
import PrivateCaptcha from '@private-captcha/react';

export default function Home() {
  return (
    <div>
      <h1>Testing Captcha</h1>
      <form>
        <PrivateCaptcha
          siteKey="aaaaaaaabbbbccccddddeeeeeeeeeeee"
          theme="dark"
        />
      </form>
    </div>
  );
}
