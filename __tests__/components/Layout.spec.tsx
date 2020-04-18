import React from 'react';
import { shallow } from 'enzyme';
import Layout from '@components/layout/Layout';

describe('Layout', () => {
  let wrapper;
  const appTitle = 'Test';

  // eslint-disable-next-line
  beforeEach(() => (wrapper = shallow(<Layout>{appTitle}</Layout>)));

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render children', () => {
    expect(wrapper.find('div#wrapper').length).toEqual(1);
    expect(wrapper.find('Header')).toHaveLength(1);
    expect(wrapper.find('div#content').length).toEqual(1);
    expect(wrapper.find('NavBar')).toHaveLength(1);
  });

  it('renders the value passed', () => {
    expect(wrapper.find('div#content').text()).toEqual(appTitle);
  });
});
