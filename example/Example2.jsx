import React from 'react';
import { useGlobalTag, useGlobalBag, useGlobalReady } from './useGlobal';

export default function Example() {
  const tag = useGlobalTag();
  const bag = useGlobalBag();
  const isReady = useGlobalReady();

  return (
    <div>
      <p>isReady = {`${isReady}`}</p>
      <p>{tag}</p>
      <p>{bag}</p>
    </div>
  );
}
