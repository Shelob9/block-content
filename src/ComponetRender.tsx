import React, { createElement, FC, Fragment, useMemo } from 'react';
import { NODE } from '.';
import { preProcessTagNode } from './preProcessNode';

export interface ComponetsMap  {[key:string]: FC<{children:any,className:string}>};
let defaultComponents : ComponetsMap = {
  'p':({children,className}) => (
    <p className={className}>{children}</p>
  )
}
const ComponetRender: FC<{ node: NODE,components?:ComponetsMap }> = (props) => {
  const {node} = props;
  const components = useMemo(() => {
    if( ! props.components ){
      return defaultComponents;
    }
    return {
      ...defaultComponents,
      ...props.components,
    }
  }, [props.node]);
  
  return createElement(
    node.name && components.hasOwnProperty(node.name) ? components[node.name] : node.name as string,
    {
      //@ts-ignore
      className:
        node.attribs && node.attribs.class ? node.attribs.class as string : undefined,
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
