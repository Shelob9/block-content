import React from 'react';
import { render } from '@testing-library/react';
import ComponetRender from '../src/ComponetRender';
import { NODE } from '../src';

describe('ComponetRender', () => {
  it('renders paragraph with text children', () => {
    let node : NODE = {
      type: 'tag',
      name: 'p',
      attribs: {
        class: 'food'
      },
      children: [
        {
          type: 'text',
          data: 'Hi Roy',
          attribs: {}
        },
      ]
    }
    const { container,getByText } = render(
    <ComponetRender node={node} />);
    expect(getByText('Hi Roy')).toBeTruthy();

    expect(container.querySelectorAll('p').length).toBe(1);
    expect(container.querySelectorAll('.food').length).toBe(1);

  });
  it('renders paragraph with tag children', () => {
    let node : NODE = {
      type: 'tag',
      name: 'p',
      attribs: {
        class: 'food'
      },
      children: [
        {
          type: 'tag',
          name: 'em',
          attribs: {
            class: 'food'
          },
          children: [
            {
              type: 'text',
              data: 'Hi Roy',
              attribs: {}
            },
          ]
        }
      ]
    }
    const { container,getByText } = render(
    <ComponetRender node={node} />);
    

    expect(container.querySelectorAll('p').length).toBe(1);
    expect(container.querySelectorAll('em').length).toBe(1);

    expect(container.querySelectorAll('.food').length).toBe(2);
    expect(getByText('Hi Roy')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  
});
