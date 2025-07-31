# Private Captcha React Component

[![NPM Version badge](https://img.shields.io/npm/v/%40private-captcha/private-captcha-react)](https://www.npmjs.com/package/@private-captcha/private-captcha-react) ![Lint](https://github.com/PrivateCaptcha/private-captcha-react/actions/workflows/eslint.yml/badge.svg)

A React component for integrating Private Captcha's client-side proof-of-work captcha into your React applications.

## Installation

```bash
npm install @private-captcha/private-captcha-react
```

## Basic Usage

> NOTE: Captcha component is only being rendered **inside the form**

```tsx
import React from 'react';
import { PrivateCaptcha } from '@private-captcha/private-captcha-react';

function MyForm() {
  const handleCaptchaFinished = (opts) => {
    console.log('Captcha solved!', opts.solution());
    // Submit your form here or enable the submit button
  };

  return (
    <form>
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />

      <PrivateCaptcha
        siteKey="your-site-key-here"
        theme="dark"
        finishedCallback={handleCaptchaFinished}
      />

      <button type="submit">Login</button>
    </form>
  );
}
```

## Props API

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `siteKey` | `string` | Your Private Captcha site key |

### Optional Props

Please refer to the [official widget options](https://docs.privatecaptcha.com/docs/reference/widget-options/) documentation.

### Callback Props

All callback functions receive an `opts` object with these methods:
- `start()` - Start solving the captcha
- `reset()` - Reset the captcha
- `solution()` - Get the current solution string

| Prop | Type | Description |
|------|------|-------------|
| `initCallback` | `(opts) => void` | Called when captcha is initialized |
| `startedCallback` | `(opts) => void` | Called when solving starts |
| `finishedCallback` | `(opts) => void` | Called when solving completes |
| `erroredCallback` | `(opts) => void` | Called when an error occurs |

## Examples

### EU-isolation

```tsx
<PrivateCaptcha
  siteKey="your-site-key"
  eu={true}
/>
```

## Requirements

- React  18+

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues with this React component, please open an issue on GitHub.

For Private Captcha service questions, visit [privatecaptcha.com](https://privatecaptcha.com).
