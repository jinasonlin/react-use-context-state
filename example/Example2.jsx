import React, { useEffect } from 'react';
import { useContextStateMember } from '@/ContextState';
import { useGlobalTag, useGlobalBag, useGlobalReady } from './useGlobal';

export default function Example() {
  const tag = useGlobalTag();
  const bag = useGlobalBag();
  const isReady = useGlobalReady();
  const [times, setTimes] = useContextStateMember('times', 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimes(t => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <p>times = {`${times}`}</p>
      <p>isReady = {`${isReady}`}</p>
      <p>{tag}</p>
      <p>{bag}</p>
    </div>
  );
}
