import React from 'react';
import { mount } from 'enzyme';

import Index from '../pages/index';
import withMockRouter from '../__mocks__/utils';

describe('index page', () => {
  it('should have Layout component', () => {
    const component = mount(withMockRouter(<Index />));

    // eslint-disable-next-line
    console.log(component);

    expect(component.find('Layout')).toHaveLength(1);
  });
});
