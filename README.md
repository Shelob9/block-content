# Block Content Renderer

[![CI](https://github.com/Shelob9/block-content/actions/workflows/main.yml/badge.svg)](https://github.com/Shelob9/block-content/actions/workflows/main.yml)
![npm](https://img.shields.io/npm/v/@shelob9/block-content?style=flat-square)

Renders "raw" post content with WordPress block markup in it using React components you optionally provide. Uses `@wordpress/block-serialization-default-parser`.  

This works with the "raw" value returned by WordPress REST API for post title, content, excerpt, etc. You must request with `?context=edit` which requires permission to edit the post.

__BETA__ Probably don't use. An experiment by [Josh Pollock](https://joshpress.net).
### Why / Status

WordPress parses block-based content to HTML before displaying it in a front-end theme. This HTML is also returned by the REST API and WPGraphQL. With a JavaScript front-end, in a headless site or what not, you may want to treat the block content as an object for several reasons.

- Change the markup -- add classes to paragraphs, change element types, etc.
- Sanitize content
- Re-order or reformat content.

WordPress' block parser converts blocks to objects. These objects have block attributes and the inner HTML. This library will provide the ability to:

- ✔️ Remove script and style tags
- Set a list of allowed elements and attributes (TODO)
- ✔️ Use your own component library to render block-based content.
- ✔️ Use block columns.
  - Needs CSS

## Install

```sh
yarn add @Shelob9/block-content
```

## Usage

The `<BlockContent>` component parses raw blocks to React elements and renders it:

```jsx
import BlockContent from "@shelob9/block-content";
const Post = ({postTitleRaw,postContentRaw}) => {
  return (
    <article>
      <BlockContent rawContent={postTitleRaw} />
      <BlockContent rawContent={postContentRaw} />
    </article>
  )
}
```

For saftery reasons, it's best to use `<RenderBlockContent />`. If given raw content, it works the same as `<BlockContent>`, but falls back to using rendered HTML.

```jsx
import {RenderBlockContent} from "@shelob9/block-content";

const PostContent = ({post}) => {
  return (
    <article>
      <RenderBlockContent 
          raw={post.content.raw}
          rendered={post.content.rendered}
       />
    </article>
  )
}
```

### Theme Provider

#### Customize Components

To provide your own custom components, wrap your app in the `<ThemeProvider>` and provide an object of render functions for each element you wish to customize:

```jsx
import {ThemeProvider} from "@shelob9/block-content";

//A map like object of element type and a render function for each
const components = {
  p => ({children,className}) => (
    <p className={`${className} custom-class`}>{children}</p>
  ), 
}
//Wrap everything in the theme provider
const App = () => {
  return(
    <ThemeProvider components={}>
      <div>Put the rest of your app here</div>
    </ThemeProvider>
  )
}
```

By default, each allowed element has a basic render function. You can use this to replace `a` elements with a `<Link>` element from Gatsby or NextJS.

#### Restricting Element Types

By default, script and style tags are removed. The rest of this feature is not yet implimented.

## Development

```bash
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run either Storybook or the example playground:

### Storybook

Run inside another terminal:

```bash
yarn storybook
```

This loads the stories from `./stories`.

## Contribute

Copyright Josh Pollock. License: GPL 2.0 or later. Please share with your neighbor and [feal free to contribute](https://github.com/Shelob9/block-content/pulls).
