import { Block, parse } from '@wordpress/block-serialization-default-parser';
import React, {
  createElement,
  ReactNode,
  useMemo,
  Fragment,
  ReactElement,
  FC,
} from 'react';
import ReactHtmlParser from 'react-html-parser';
import ComponetRender from './ComponetRender';
import { preProcessTagNode } from './preProcessNode';

/**
 * Node being parsed to element
 */
export type NODE = {
  type: 'style' | 'tag' | 'text' | 'script';
  name?: string;
  attribs: any;
  children?: NODE[];
  next?: NODE;
  data?: string;
};

//Transform function for react-html-parser
export function transform(node: NODE, index: number): ReactElement {
  if ('style' === node.type || 'script' === node.type) {
    return <Fragment key={index} />;
  }
  if ('tag' === node.type) {
    node = preProcessTagNode(node);
    return (
      <Fragment key={index}>
        <ComponetRender node={node} />
      </Fragment>
    );
  }
  return <Fragment key={index} />;
}

//@todo make this step not needed.
const addAndParseBlock = (block: Block, els: ReactNode[]) => {
  if (block.innerBlocks.length) {
    //Special handling for columns
    // @todo use same render function as other elements
    switch (block.blockName) {
      case 'core/columns':
        let innerBlockEls: ReactElement[] = [];
        Object.values(block.innerBlocks).forEach((innerBlock: Block) => {
          addAndParseBlock(innerBlock, innerBlockEls);
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
          addAndParseBlock(innerBlock, innerBlockEls);
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

/**
 * Render block content with fallback to rendered.
 *
 * Safer option than default export
 */
export const RenderBlockContent: FC<{ raw?: string; rendered: string }> = ({
  raw,
  rendered,
}) => {
  function createMarkup() {
    return { __html: rendered };
  }
  if (!raw) {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }
  return <BlockContent rawContent={raw} />;
};
export type PROPS = {
  rawContent: string;
};
/**
 * Render a block
 *
 * Only works with raw block content.
 */
const BlockContent = (props: PROPS) => {
  let { rawContent } = props;
  let Component = useMemo(() => {
    let blocks = parse(rawContent);
    let els: ReactNode[] = [];
    Object.values(blocks).forEach((block: Block) => {
      addAndParseBlock(block, els);
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
