import React, { createElement, FC, Fragment } from 'react';
import { NODE } from '.';
import { preProcessTagNode } from './preProcessNode';

const ComponetRender: FC<{ node: NODE }> = ({ node }) => {
  return createElement(
    node.name as string,
    {
      className:
        node.attribs && node.attribs.class ? node.attribs.class : undefined,
    },
    node.children
      ? node.children.map((child: NODE, i: number) => {
          return (
            <Fragment key={i}>
              {'text' === child.type ? (
                <Fragment>{child.data}</Fragment>
              ) : (
                <ComponetRender node={preProcessTagNode(child)} />
              )}
            </Fragment>
          );
        })
      : []
  );
};

export default ComponetRender;
