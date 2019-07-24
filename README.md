ContextState
---

上下文状态

#### 使用

```javascript
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ContextStateProvider, useContextState } from 'ContextState';

const App = () => {
  const [state, setState] = useContextState();
  const { say } = state;

  useEffect(() => {
    setTimeout(() => {
      setState({
        say: 'Hello',
      });
    }, 3000);
  }, []);

  return <div>App: {say}</div>;
}

const Other = () => {
  const [state, setState] = useContextState();
  const { say } = state;

  return <div>Other: {say}</div>;
}

ReactDOM.render(
  <ContextStateProvider>
    <App />
    <Other />
  </ContextStateProvider>,
  document.getElementById('root'),
)
```

#### 自定义

```javascript
import { useEffect } from 'react';
import { useContextStateMember } from 'ContextState';

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
    }, 5000);
  }, []);

  return state;
};

```