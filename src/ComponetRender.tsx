import React, { createElement, FC, Fragment, useContext, useMemo } from 'react';
import { NODE } from './addAndParseBlock';
import { preProcessTagNode } from './preProcessNode';
import { tagSettings, ThemeContext } from './ThemeProvider';

export interface ComponetsMap {
  [key: string]: FC<any>;
}
//Ideally this would be in a context provider
let defaultComponents: ComponetsMap = {
  p: ({ children, className }) => <p className={className}>{children}</p>,
};

const defaultAllowedAttributes = [
  'class',
  'id'
]
const getAllowedAttribues = (nodeType: string,
  tagSettings?:tagSettings
): string[] => {
  if (tagSettings) {
    if (tagSettings.hasOwnProperty(nodeType)) {
      return tagSettings[nodeType];
    }
  }
  let allowed = defaultAllowedAttributes;
  switch (nodeType) {
    case 'a':
      allowed = [...allowed, 'href', '_target'];
      break;
  }

  return allowed;
};
export const createAttributes = (
  node: NODE,
  tagSettings?:tagSettings
): { [key: string]: string } => {
  let allowed = getAllowedAttribues(
    node.name as string,
    tagSettings
  );
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

  const tagSettings = useMemo(() => {
    if (!_themeContext|| !_themeContext.tagSettings) {
      return undefined;
    }
    return _themeContext.tagSettings
  }, [_themeContext]);

  return createElement(
    node.name && components.hasOwnProperty(node.name)
      ? components[node.name]
      : (node.name as string),
    createAttributes(node,tagSettings),
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
