import React from 'react';
import { render } from '@testing-library/react';
import { paragraphs } from '../fixtures/blockContents';
import BlockContent from '../src/index';

describe('BlockContent', () => {
  it('renders', () => {
    const { container } = render(<BlockContent rawContent={paragraphs} />);
    expect(container).toMatchSnapshot();
  });

  it('Prints a paragraph', () => {
    const { getByText } = render(
      <BlockContent
        rawContent={`<!-- wp:paragraph -->
    <p>Hi Roy</p>
    <!-- /wp:paragraph -->`}
      />
    );
    expect(getByText('Hi Roy')).toBeTruthy();
  });
  it('Prints a paragraph with em inside', () => {
    const { container } = render(
      <BlockContent
        rawContent={`<!-- wp:paragraph -->
    <p class="outer"><em class="inner">Hi Roy</em></p>
    <!-- /wp:paragraph -->`}
      />
    );
    expect(container.querySelectorAll('p').length)
    .toEqual(1);
    expect(container.querySelectorAll('em').length)
    .toEqual(1);
      //With the className
      expect(container.querySelectorAll('.outer').length)
    .toEqual(1);
    expect(container.querySelectorAll('.inner').length)
    .toEqual(1);
  });
});
