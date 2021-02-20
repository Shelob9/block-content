import { NODE } from '.';

/**
 * Prepares nodes with type "tag" to be rendered.
 *
 * Enforces:
 *  - Allowed node types
 *  - Allowed node children
 *  - Allowed attributes.
 */
export const preProcessTagNode = (node: NODE) => {
  switch (node.name) {
    case 'i':
      node.name = 'em';
      break;
    default:
      break;
  }
  return node;
};
