import { Block, parse } from '@wordpress/block-serialization-default-parser';
import React, {
  createElement,
  ReactNode,
  useMemo,
  Fragment,
  ReactElement,
} from 'react';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';

export type NODE = {
  type: 'style' | 'tag' | 'text' | 'script';
  name?: string;
  attribs: any;
  children?: NODE[];
  next?: NODE;
};
export type NODE_TRANSFORMER = (node: NODE, index: number) => ReactElement;

export function transform(node: NODE, index: number): ReactElement {
  if ('style' === node.type || 'script' === node.type) {
    return <Fragment />;
  }
  if ('tag' === node.type) {
    switch (node.name) {
      case 'i':
        node.name = 'em';
        break;
      case 'p':
        node.attribs = {
          ...node.attribs,
          //class: "pretzels"
        };
        break;
      default:
        break;
    }
  }
  return convertNodeToElement(node, index, transform);
}

export type PROPS = {
  rawContent: string;
};

let parseAndAdd = (block: Block, els: ReactNode[]) => {
  if (block.innerBlocks.length) {
    switch (block.blockName) {
      case 'core/columns':
        let innerBlockEls: ReactElement[] = [];
        Object.values(block.innerBlocks).forEach((innerBlock: Block) => {
          parseAndAdd(innerBlock, innerBlockEls);
        });
        els.push(
          createElement(
            'div',
            {
              class: `wp-block-columns has-${block.attrs.columns}-columns`,
            },
            innerBlockEls
          )
        );
        return els;
      case 'core/column': {
        let innerBlockEls: ReactElement[] = [];
        Object.values(block.innerBlocks).forEach((innerBlock: Block) => {
          parseAndAdd(innerBlock, innerBlockEls);
        });
        els.push(
          createElement(
            'div',
            {
              class: `wp-block-column`,
            },
            innerBlockEls
          )
        );
        return els;
      }
    }
  } else {
    els.push(
      ReactHtmlParser(block.innerHTML, {
        transform,
      })
    );
  }
  return els;
};

const BlockContent = (props: PROPS) => {
  let { rawContent } = props;
  let Component = useMemo(() => {
    let blocks = parse(rawContent);
    let els: ReactNode[] = [];
    Object.values(blocks).forEach((block: Block) => {
      parseAndAdd(block, els);
    });
    return () => createElement('div', {}, els);
  }, [rawContent]);

  return (
    <>
      <Component />
    </>
  );
};

export default BlockContent;
