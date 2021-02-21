import React, { createElement, FC, Fragment, useContext, useMemo } from 'react';
import { NODE } from '.';
import { preProcessTagNode } from './preProcessNode';
import { ThemeContext } from './ThemeProvider';

export interface ComponetsMap {
  [key: string]: FC<{ children: any; className: string }>;
}
//Ideally this would be in a context provider
let defaultComponents: ComponetsMap = {
  p: ({ children, className }) => <p className={className}>{children}</p>,
};
const ComponetRender: FC<{ node: NODE; components?: ComponetsMap }> = props => {
  const { node } = props;
  let _themeContext = useContext(ThemeContext);
  const components = useMemo(() => {
    if (props.components) {
      return props.components;
    }
    if (_themeContext) {
      return {
        ...defaultComponents,
        ..._themeContext.components,
      };
    }
    return {
      ...defaultComponents,
    };
  }, [props.components, _themeContext]);

  return createElement(
    node.name && components.hasOwnProperty(node.name)
      ? components[node.name]
      : (node.name as string),
    {
      //@ts-ignore
      className:
        node.attribs && node.attribs.class
          ? (node.attribs.class as string)
          : undefined,
    },
    node.children
      ? node.children.map((child: NODE, i: number) => {
          return (
            <Fragment key={i}>
              {'text' === child.type ? (
                <Fragment>{child.data}</Fragment>
              ) : (
                <ComponetRender
                  components={components}
                  node={preProcessTagNode(child)}
                />
              )}
            </Fragment>
          );
        })
      : []
  );
};

export default ComponetRender;
