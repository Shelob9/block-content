import { Block, parse } from '@wordpress/block-serialization-default-parser';
import React, { createElement, ReactNode, useMemo, FC } from 'react';
import { addAndParseBlock } from './transformNodes';

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
