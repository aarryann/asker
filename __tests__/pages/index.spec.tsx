import React from 'react';
import { mount, shallow } from 'enzyme';
import Layout from '@components/layout/Layout';
import Index from '@pages/index';
import withMockRouter from '@mocks/utils.mock';

describe('Index', () => {
  let wrapper;

  // eslint-disable-next-line
  beforeEach(() => (wrapper = shallow(<Index />)));

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render Index', () => {
    // expect(wrapper.find('div').length).toEqual(1);
    // expect(wrapper.find('Layout')).toHaveLength(1);
    expect(wrapper.containsMatchingElement(<Layout>Welcome to WHATABYTE!</Layout>)).toEqual(true);
  });
});

describe('Index children', () => {
  let wrapper;
  // eslint-disable-next-line
  beforeEach(() => (wrapper = mount(withMockRouter(<Index />))));

  it('should have Layout component', () => {
    expect(wrapper.find('Layout')).toHaveLength(1);
    expect(wrapper.find('NavBar')).toHaveLength(1);
    expect(wrapper.find('NavButton').length).toBeGreaterThan(1);
  });
});
