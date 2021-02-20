import { NODE } from '../../src';
import { preProcessTagNode } from '../../src/preProcessNode';

test('changes i to em', () => {
  let node: NODE = {
    type: 'tag',
    name: 'i',
    attribs: {},
  };
  expect(preProcessTagNode(node).name).toEqual('em');
});
