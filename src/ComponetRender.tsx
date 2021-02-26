import React, { createElement, FC, Fragment, useContext, useMemo } from 'react';
import { NODE } from '.';
import { preProcessTagNode } from './preProcessNode';
import { ThemeContext } from './ThemeProvider';
import sanitizeHtml from 'sanitize-html';

export interface ComponetsMap {
  [key: string]: FC<any>;
}
//Ideally this would be in a context provider
let defaultComponents: ComponetsMap = {
  p: ({ children, className }) => <p className={className}>{children}</p>,
};

const getAllowedAttribues = (nodeType: string): string[] => {
  let allowed = ['class'];
  switch (nodeType) {
    case 'a':
      allowed = [...allowed, 'href', '_target'];
      break;
  }

  return allowed;
};
export const createAttributes = (node: NODE): { [key: string]: string } => {
  let allowed = getAllowedAttribues('a');
  let attributes: { [key: string]: string } = {};
  Object.keys(node.attribs).forEach((att: string) => {
    if (allowed.includes(att)) {
      if ('class' === att) {
        attributes.className = node.attribs[att];
      } else {
        attributes[att] = node.attribs[att];
      }
    }
  });
  return attributes;
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
    createAttributes(node),
    node.children
      ? node.children.map((child: NODE, i: number) => {
          return (
            <Fragment key={i}>
              {'text' === child.type ? (
                <Fragment>{sanitizeHtml(child.data as string)}</Fragment>
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
