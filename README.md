# Parsing Block Content Renderer

[![CI](https://github.com/Shelob9/block-content/actions/workflows/main.yml/badge.svg)](https://github.com/Shelob9/block-content/actions/workflows/main.yml)

Uses `@wordpress/block-serialization-default-parser` to render WordPress block content with React. Blocks are parsed to HTML, and then converted to React components using `react-html-parser`.

This works with the "raw" value returned by WordPress REST API for post title, content, excerpt, etc. You must request with `?context=edit` which requires permission to edit the post.

### Why?

The parser converts blocks to objects. These objects have block attributes and the inner HTML. This library will provide the ability to:

- ✔️ Remove script and style tags
- Set a list of allowed elements and attributes
- Define which class/ids and other attributes each element should have for themeing reasons, without changing HTML in post content.
- ✔️ Use block columns.

## Install

```sh
yarn add https://github.com/Shelob9/block-content
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
