import React, { PureComponent, createContext, useRef, useContext, useReducer, useEffect, useCallback } from 'react';

const ContextStateDefaultVaule = [{}, () => { console.warn('use ContextStateProvider'); }];
const ContextState = createContext(ContextStateDefaultVaule);

const getDefaultState = (defaultState) => {
  if (defaultState && typeof defaultState !== 'object') throw new Error('`defaultState` should be object');

  return defaultState || ContextStateDefaultVaule[0];
};

export const useRefMounted = () => {
  const refMounted = useRef(false);

  useEffect(() => {
    refMounted.current = true;

    return () => {
      refMounted.current = false;
    };
  }, []);

  return refMounted;
};

export const useContextState = () => useContext(ContextState);

export const useContextStateMember = (key, initialState) => {
  const refMounted = useRefMounted();
  const [state, setState] = useContext(ContextState);
  const _setState = useCallback((value) => {
    setState({ [key]: value });
  }, [key, setState]);

  useEffect(() => {
    if (refMounted.current && !(key in state)) {
      if (typeof initialState === 'function') {
        if (initialState.length >= 1) {
          initialState(_setState);
        } else {
          _setState(initialState());
        }
      } else if (initialState) {
        _setState(initialState);
      }
    }
  }, [key, setState]); // eslint-disable-line react-hooks/exhaustive-deps

  return [state[key], _setState];
};

export const useContextStateMemberReady = (...keys) => {
  const [state] = useContext(ContextState);
  const isReady = keys.every(k => k in state);

  return isReady;
};

export const ContextStateProvider = ({ children, defaultState }) => {
  const [state, setState] = useReducer((s, n) => ({ ...s, ...n }), getDefaultState(defaultState));

  return (
    <ContextState.Provider value={[state, setState]}>
      {children}
    </ContextState.Provider>
  );
};

export class ContextStateProviderLegacy extends PureComponent {
  state = getDefaultState(this.props.defaultState);

  _setState = (next) => {
    // 忽略函数式更新
    typeof next !== 'function' && this.setState(next);
  };

  render() {
    const { children } = this.props;
    return (
      <ContextState.Provider value={[this.state, this._setState]}>
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
