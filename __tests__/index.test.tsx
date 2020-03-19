import React from 'react';
import { mount } from 'enzyme';
import Index from '../pages/index';

describe('index page', () => {
  it('should have Layout component', () => {
    const subject = mount(<Index />);

    expect(subject.find('Layout')).toHaveLength(1);
  });
});
