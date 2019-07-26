import React, { useEffect } from 'react';
import renderer from 'react-test-renderer';
import { useContextState, ContextStateProvider, ContextStateConsumer } from '../ContextState';

describe('ContextState', () => {
  test('renders provider', () => {
    const tree = renderer
      .create(
        <ContextStateProvider>
          <div>hello world</div>
        </ContextStateProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('renders consumer', () => {
    const tree = renderer
      .create(
        <ContextStateProvider>
          <ContextStateConsumer>
            <div>hello world</div>
          </ContextStateConsumer>
        </ContextStateProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('renders consumer - function children', () => {
    const tree = renderer
      .create(
        <ContextStateProvider>
          <ContextStateConsumer>
            {() => <div>hello world</div>}
          </ContextStateConsumer>
        </ContextStateProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('useContextState', () => {
  it('setState in useEffect', () => {
    const Say = () => {
      const [state, setState] = useContextState();
      const { say } = state;

      useEffect(() => {
        setState({
          say: 'Hello',
        });
      }, []);

      return <div>Say: {say}</div>;
    };

    const SayOther = () => {
      const [state] = useContextState();
      const { say } = state;

      return <div id="SayOther">SayOther: {say}</div>;
    };

    const App = (
      <ContextStateProvider>
        <Say />
        <SayOther />
      </ContextStateProvider>
    );

    const testRenderer = renderer
      .create(App);
    const testInstance = testRenderer.root;

    // expect(testInstance.findByType(SayOther).findByType('div').children).toEqual(['SayOther: ']);
    expect(testInstance.findByProps({ id: 'SayOther' }).children).toEqual(['SayOther: ']);

    // render after setState
    testRenderer.update(App);

    expect(testInstance.findByProps({ id: 'SayOther' }).children).toEqual(['SayOther: ', 'Hello']);

    const tree = testRenderer.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
