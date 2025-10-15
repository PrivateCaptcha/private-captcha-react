'use client';
import React, { useEffect, useRef, useState } from 'react';
// @ts-expect-error - no types definition for this package
import { CaptchaWidget } from '@private-captcha/private-captcha-js-core';

type CaptchaEventDetail = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  widget: any;
  element: HTMLElement;
};

type PrivateCaptchaProps = {
  siteKey: string;
  onInit?: (detail: CaptchaEventDetail) => void;
  onError?: (detail: CaptchaEventDetail) => void;
  onStart?: (detail: CaptchaEventDetail) => void;
  onFinish?: (detail: CaptchaEventDetail) => void;
  theme?: 'light' | 'dark';
  startMode?: 'click' | 'auto';
  debug?: boolean;
  fieldName?: string;
  puzzleEndpoint?: string;
  displayMode?: 'widget' | 'popup' | 'hidden';
  lang?: string;
  styles?: string;
  storeVariable?: string;
  eu?: boolean;
  compat?: 'recaptcha';
};

export const PrivateCaptcha = (props: PrivateCaptchaProps) => {
  const { siteKey, onInit, onError, onStart, onFinish, ...widgetOptions } = props;
  const captchaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded || !captchaRef.current) return;
    setIsLoaded(true);

    // Filter out undefined values and event handlers from the options
    const filteredOptions = Object.fromEntries(
      Object.entries(widgetOptions).filter(([, value]) => value !== undefined)
    );

    new CaptchaWidget(captchaRef.current, filteredOptions);
  }, [isLoaded, captchaRef, widgetOptions]);

  // Set up event listeners
  useEffect(() => {
    const element = captchaRef.current;
    if (!element) return;

    const handleInit = (event: CustomEvent<CaptchaEventDetail>) => {
      onInit?.(event.detail);
    };

    const handleError = (event: CustomEvent<CaptchaEventDetail>) => {
      onError?.(event.detail);
    };

    const handleStart = (event: CustomEvent<CaptchaEventDetail>) => {
      onStart?.(event.detail);
    };

    const handleFinish = (event: CustomEvent<CaptchaEventDetail>) => {
      onFinish?.(event.detail);
    };

    element.addEventListener('privatecaptcha:init', handleInit as EventListener);
    element.addEventListener('privatecaptcha:error', handleError as EventListener);
    element.addEventListener('privatecaptcha:start', handleStart as EventListener);
    element.addEventListener('privatecaptcha:finish', handleFinish as EventListener);

    return () => {
      element.removeEventListener('privatecaptcha:init', handleInit as EventListener);
      element.removeEventListener('privatecaptcha:error', handleError as EventListener);
      element.removeEventListener('privatecaptcha:start', handleStart as EventListener);
      element.removeEventListener('privatecaptcha:finish', handleFinish as EventListener);
    };
  }, [onInit, onError, onStart, onFinish]);

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
