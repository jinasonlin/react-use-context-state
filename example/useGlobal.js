import { useEffect } from 'react';
import { useRefMounted, useContextStateMember, useContextStateMemberReady } from '@/ContextState';

export const useGlobalTag = () => {
  const [state] = useContextStateMember('tag', (setTag) => {
    setTimeout(() => {
      console.log('global tag，未初始化时进行更新');
      setTag('global tag，未初始化时进行更新');
    }, 1500);
  });

  return state;
};

export const useGlobalBag = () => {
  const refMounted = useRefMounted(false);
  const [state, setState] = useContextStateMember('bag');

  useEffect(() => {
    if (refMounted.current) {
      setTimeout(() => {
        console.log('global bag，每次使用都会更新');
        setState('global bag，每次使用都会更新');
      }, 3000);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
};

export const useGlobalReady = () => {
  const isReady = useContextStateMemberReady('tag', 'bag');

  return isReady;
};
