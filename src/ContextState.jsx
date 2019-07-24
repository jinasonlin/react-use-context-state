import React, { PureComponent, createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const ContextStateDefaultVaule = [{}, () => { console.warn('use ContextStateProvider'); }];
const ContextState = createContext(ContextStateDefaultVaule);

export const useContextState = () => useContext(ContextState);

export const useContextStateMember = (key, initialState) => {
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
  }, [key, dispatch]); // eslint-disable-line

  return [state[key], setState];
};

export const useContextStateMemberReady = (...keys) => {
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

export class ContextStateProviderLegacy extends PureComponent {
  state = ContextStateDefaultVaule[0];

  dispatch = (next) => {
    // 忽略函数式更新
    typeof next !== 'function' && this.setState(next);
  }

  render() {
    const { children } = this.props;
    return (
      <ContextState.Provider value={[this.state, this.dispatch]}>
        {children}
      </ContextState.Provider>
    );
  }
}

export const ContextStateConsumer = ({ children }) => {
  return (
    <ContextState.Consumer>
      {([state, dispatch]) => { return typeof children === 'function' ? children(state, dispatch) : children; }}
    </ContextState.Consumer>
  );
};

export default useContextState;
