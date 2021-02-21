import React from 'react';
import { render } from '@testing-library/react';
import BlockContent from '../src';
import ThemeProvider from '../src/ThemeProvider'
import { ComponetsMap } from '../src/ComponetRender';

const Test = () => {
    return (
        <BlockContent rawContent={`<!-- wp:paragraph -->
        <p><span>One</span></p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph -->
        <p><em>Two</em></p>
        <!-- /wp:paragraph -->`} />
    )
}

test('uses componets', () => {
    const components : ComponetsMap = {
        'p': ({children}) => (<p className="test">{children}</p>),
        'span': ({children}) => (<strong>{children}</strong>)
    }
    const {container,getByText} = render(
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