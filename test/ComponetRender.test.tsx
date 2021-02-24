import React from 'react';
import { render } from '@testing-library/react';
import ComponetRender, {createAttributes} from '../src/ComponetRender';
import { NODE } from '../src';

describe('ComponetRender', () => {
  it('renders paragraph with text children', () => {
    let node: NODE = {
      type: 'tag',
      name: 'p',
      attribs: {
        class: 'food',
      },
      children: [
        {
          type: 'text',
          data: 'Hi Roy',
          attribs: {},
        },
      ],
    };
    const { container, getByText } = render(<ComponetRender node={node} />);
    expect(getByText('Hi Roy')).toBeTruthy();

    expect(container.querySelectorAll('p').length).toBe(1);
    expect(container.querySelectorAll('.food').length).toBe(1);
  });
  it('renders paragraph with tag children', () => {
    let node: NODE = {
      type: 'tag',
      name: 'p',
      attribs: {
        class: 'food',
      },
      children: [
        {
          type: 'tag',
          name: 'em',
          attribs: {
            class: 'food',
          },
          children: [
            {
              type: 'text',
              data: 'Hi Roy',
              attribs: {},
            },
          ],
        },
      ],
    };
    const { container, getByText } = render(<ComponetRender node={node} />);

    expect(container.querySelectorAll('p').length).toBe(1);
    expect(container.querySelectorAll('em').length).toBe(1);

    expect(container.querySelectorAll('.food').length).toBe(2);
    expect(getByText('Hi Roy')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('Passes href to a', () => {
    let node: NODE = {
      type: 'tag',
      name: 'a',
      attribs: {
        class: 'food',
        href: 'https://hiroy.club'
      },
      children: [
        {
          type: 'text',
          data: 'Hi Roy',
          attribs: {},
        },
      ],
    };
    const { container, getByText } = render(<ComponetRender node={node} />);
    expect(getByText('Hi Roy')).toBeTruthy();

    expect(container.querySelectorAll('a').length).toBe(1);
    expect(container.querySelectorAll('.food').length).toBe(1);
    //@ts-ignore
    expect(container.querySelectorAll('.food')[0].href).toMatch("https://hiroy.club/")
  });
});

describe('createAttributes', () => {
  it('Removes everyhting but className for p', () => {
    let node: NODE = {
      type: 'tag',
      name: 'p',
      attribs: {
        class: 'food',
      },
      children: []
    };
    expect(createAttributes(node)).toMatchObject({className: 'food'})
  });

  it('Allows anchors to have href and _target', () => {
    let  attribs = {
      href: '#cactus',
      _target: '_blank',
      class: 'linky'
    }
    let node: NODE = {
      type: 'tag',
      name: 'a',
      attribs,
      children: []
    };
    expect(createAttributes(node)).toMatchObject({
      href: '#cactus',
      _target: '_blank',
      className: 'linky'
    })
  });
});