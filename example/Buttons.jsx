import React from 'react';
import { ContextStateConsumer, useContextState } from '@/ContextState';

export default function Buttons({ skey = 'A' }) {
  const [state, setState] = useContextState();

  return (
    <div>
      state.{skey} = {state[skey]}
      <br />
      <button
        onClick={() => setState({ A: !('A' in state) ? 0 : state.A + 1 })}
      >
        setStateA
      </button>
      <button
        onClick={() => setState({ B: !('B' in state) ? 0 : state.B + 1 })}
      >
        setStateB
      </button>
      <button onClick={() => console.log(state)}>console</button>
      <br />
      <ContextStateConsumer>
        {s => <code>{JSON.stringify(s)}</code>}
      </ContextStateConsumer>
    </div>
  );
}
