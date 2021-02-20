/**
 * Example of block content with paragraphs
 */
export const paragraphs: string = `<style>a</style>
<!-- wp:paragraph -->
<p class="noms"><i>First</i></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p><em>Second</em></p>
<!-- /wp:paragraph -->`;

/**
 * Example of block content with paragraph, style and script
 */
export const styleAndScript: string = `
<!-- wp:paragraph -->
<p>Safe</p>
<style>p{color: red;}</style>
<script>alert('UNSAFE1');</script>
<!-- /wp:paragraph -->
<style>p{color: blue;}</style>
<script>alert('UNSAFE2');</script>
`;
/**
 * Example of block contents with columns
 */
export const columns = `<!-- wp:paragraph -->
<p>Before Columns</p>
<!-- /wp:paragraph -->
<!-- wp:columns {"columns":3} -->
<div class="wp-block-columns has-3-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p>Left</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p><strong>Middle</strong></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:list -->
<ul><li>1 Right</li><li>2 Right</li></ul>
<!-- /wp:list --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->
<!-- wp:paragraph -->
<p>After Columns</p>
<!-- /wp:paragraph -->`;
