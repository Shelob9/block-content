import React from 'react';
import { render } from '@testing-library/react';
import { paragraphs } from '../fixtures/blockContents';
import BlockContent, {transform} from '../src/index';

describe('BlockContent', () => {
  it('renders', () => {
    const { container} = render(<BlockContent rawContent={paragraphs} transformer={transform}  />);
    expect(container).toMatchSnapshot();
  });

  it('Prints a paragraph', () => {
    const { getByText} = render(<BlockContent rawContent={`<!-- wp:paragraph -->
    <p>Hi Roy</p>
    <!-- /wp:paragraph -->`} transformer={transform}  />);
    expect(getByText('Hi Roy')).toEqual('<p>Hi Roy</p>');
  });
});
