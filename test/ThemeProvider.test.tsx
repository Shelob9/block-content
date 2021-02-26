import React from 'react';
import { render } from '@testing-library/react';
import BlockContent from '../src';
import ThemeProvider from '../src/ThemeProvider';
import { ComponetsMap } from '../src/ComponetRender';



test('uses componets', () => {
  const Test = () => {
    return (
      <BlockContent
        rawContent={`<!-- wp:paragraph -->
          <p><span>One</span></p>
          <!-- /wp:paragraph -->
          <!-- wp:paragraph -->
          <p><em>Two</em></p>
          <!-- /wp:paragraph -->`}
      />
    );
  };
  const components: ComponetsMap = {
    p: ({ children }) => <p className="test">{children}</p>,
    span: ({ children }) => <strong>{children}</strong>,
    a: ({ children, href }) => <a href={href}>{children}</a>,
  };

  const { container, getByText } = render(
    <ThemeProvider components={components}>
      <Test />
    </ThemeProvider>
  );
  expect(getByText('One')).toBeTruthy();
  expect(getByText('Two')).toBeTruthy();

  //Did it use the custom span component that is actual a strong element?
  expect(container.querySelectorAll('strong').length).toBe(1);
  //No em componet. Still works?
  expect(container.querySelectorAll('em').length).toBe(1);
  //Are there still paragrpahs?
  expect(container.querySelectorAll('p').length).toBe(2);
});

test('Respects allowed attributes rules', () => {
  const Test = () => {
    return (
      <BlockContent
        rawContent={`<!-- wp:paragraph -->
          <p class="food" id="time">One</p>
          <!-- /wp:paragraph -->
         `}
      />
    );
  };
  const components: ComponetsMap = {
    
  };

  const { container } = render(
    <ThemeProvider components={components}>
      <Test />
    </ThemeProvider>
  );
  expect(container.querySelectorAll('.food')).toBeTruthy();
  expect(container.querySelectorAll('#time')).toBeTruthy();
});
