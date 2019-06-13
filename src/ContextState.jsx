import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const ContextStateDefaultVaule = [{}, () => { console.warn('use ContextStateProvider'); }];
const ContextState = createContext(ContextStateDefaultVaule);

export const useContextState = () => useContext(ContextState);

export const useGlobalMember = (key, initialState) => {
  const [state, dispatch] = useContext(ContextState);
  const setState = useCallback((value) => {
    dispatch({ [key]: value });
  }, [key, dispatch]);

  useEffect(() => {
    if (!(key in state)) {
      if (typeof initialState === 'function') {
        if (initialState.length >= 1) {
          initialState(setState);
        } else {
          setState(initialState());
        }
      } else if (initialState) {
        setState(initialState);
      }
    }
  }, [key, dispatch]);

  return [state[key], setState];
};

export const useGlobalMemberReady = (...keys) => {
  const [state] = useContext(ContextState);
  const isReady = keys.every(k => k in state);

  return isReady;
};

export const ContextStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((s, n) => ({ ...s, ...n }), ContextStateDefaultVaule[0]);

  return (
    <ContextState.Provider value={[state, dispatch]}>
      {children}
    </ContextState.Provider>
  );
};

export const ContextStateConsumer = ({ children }) => {
  return (
    <ContextState.Consumer>
      {([state, dispatch]) => { return typeof children === 'function' ? children(state, dispatch) : children; }}
    </ContextState.Consumer>
  );
};

export default useContextState;
