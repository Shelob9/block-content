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
});
