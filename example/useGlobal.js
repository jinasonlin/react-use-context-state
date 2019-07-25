import { useEffect } from 'react';
import { useContextStateMember, useContextStateMemberReady } from '@/ContextState';

export const useGlobalTag = () => {
  const [state] = useContextStateMember('tag', (setTag) => {
    setTimeout(() => {
      setTag('global tag，未初始化时进行更新');
    }, 4000);
  });

  return state;
};

export const useGlobalBag = () => {
  const [state, setState] = useContextStateMember('bag');

  useEffect(() => {
    setTimeout(() => {
      setState('global bag，每次使用都会更新');
    }, 8000);
  }, []);

  return state;
};

export const useGlobalReady = () => {
  const isReady = useContextStateMemberReady('tag', 'bag');

  return isReady;
}