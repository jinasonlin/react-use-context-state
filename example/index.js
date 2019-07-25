import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ContextStateProvider, ContextStateProviderLegacy } from '@/ContextState';
import ExampleOne from './Example1';
import ExampleTwo from './Example2';

function App() {
  const [showExampleTwo, toggleShowExampleTwo] = useState(true);

  return (
    <React.Fragment>
      <ContextStateProvider defaultState={{ A: 100 }}>
        <div>
          <h1>Example</h1>
          <ExampleOne />
        </div>
        <div style={{ border: '1px solid gray', padding: 10 }}>
          <button onClick={() => toggleShowExampleTwo(!showExampleTwo)}>toggle ExampleTwo</button>
          { showExampleTwo && <ExampleTwo />}
        </div>
      </ContextStateProvider>
      <hr />
      <hr />
      <ContextStateProviderLegacy defaultState={{ B: 100 }}>
        <div>
          <h1>Legacy</h1>
          <ExampleOne />
        </div>
      </ContextStateProviderLegacy>
    </React.Fragment>
  );
}

const rootElement = document.getElementById('app');

ReactDOM.render(<App />, rootElement);
