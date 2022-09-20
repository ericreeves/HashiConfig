import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import { Consul } from '..';

const shallowRenderer = createRenderer();

describe('<Consul />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<Consul />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
