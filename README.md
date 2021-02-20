# Parsing Block Content Renderer


## Install

```sh
yarn add https://github.com/Shelob9/block-content
```

## Usage

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
