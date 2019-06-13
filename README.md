ContextState
---

用于全局状态管理

```javascript
import React, { render, useEffect } from 'react';
import { ContextStateProvider, useContextState } from '../ContextState';

const App = () => {
  const [state, setState] = useContextState();
  const { say } = state;

  useEffect(() => {
    setTimeout(() => {
      setState({
        say: 'Hello',
      });
    }, 1000);
  }, []);

  return <div>App: {say}</div>;
}

const Other = () => {
  const [state, setState] = useContextState();
  const { say } = state;

  return <div>Other: {say}</div>;
}

render(
  <ContextStateProvider>
    <App />
    <Other />
  </ContextStateProvider>
  document.getElementById('app'),
)

```