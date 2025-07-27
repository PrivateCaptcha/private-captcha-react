'use client';
import React, { useEffect, useRef, useState } from 'react';
// @ts-expect-error - no types definition for this package
import { CaptchaWidget } from '@private-captcha/private-captcha-js-core';

type CallbackOpts = {
  start: () => void;
  reset: () => void;
  solution: () => string;
};

type PrivateCaptchaProps = {
  siteKey: string;
  finishedCallback?: (opts: CallbackOpts) => void;
  startedCallback?: (opts: CallbackOpts) => void;
  erroredCallback?: (opts: CallbackOpts) => void;
  initCallback?: (opts: CallbackOpts) => void;
  theme?: 'light' | 'dark';
  startMode?: 'click' | 'auto';
  debug?: boolean;
  fieldName?: string;
  puzzleEndpoint?: string;
  displayMode?: 'widget' | 'popup';
  lang?: string;
  styles?: string;
  storeVariable?: string;
  eu?: boolean;
};

export const PrivateCaptcha = (props: PrivateCaptchaProps) => {
  const { siteKey, ...widgetOptions } = props;
  const captchaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded || !captchaRef.current) return;
    setIsLoaded(true);

    // Filter out undefined values from the options
    const filteredOptions = Object.fromEntries(
      Object.entries(widgetOptions).filter(([, value]) => value !== undefined)
    );

    new CaptchaWidget(captchaRef.current, filteredOptions);
  }, [isLoaded, captchaRef, widgetOptions]);

  const buildDataAttributes = () => {
    const attrs: Record<string, string | boolean> = {
      'data-sitekey': siteKey,
    };

    if (props.theme) { attrs['data-theme'] = props.theme; }
    if (props.startMode) { attrs['data-start-mode'] = props.startMode; }
    if (props.debug !== undefined) { attrs['data-debug'] = props.debug; }
    if (props.fieldName) { attrs['data-solution-field'] = props.fieldName; }
    if (props.puzzleEndpoint) { attrs['data-puzzle-endpoint'] = props.puzzleEndpoint; }
    if (props.displayMode) { attrs['data-display-mode'] = props.displayMode; }
    if (props.lang) { attrs['data-lang'] = props.lang; }
    if (props.styles) { attrs['data-styles'] = props.styles; }
    if (props.storeVariable) { attrs['data-store-variable'] = props.storeVariable; }
    if (props.eu !== undefined) { attrs['data-eu'] = props.eu; }

    return attrs;
  };

  return (
    <div
      ref={captchaRef}
      className="private-captcha"
      {...buildDataAttributes()}
    />
  );
};

export default PrivateCaptcha;
