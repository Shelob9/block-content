import React from 'react';
import { Meta, Story } from '@storybook/react';
import BlockContent, { PROPS } from '../src';
import { columns } from '../fixtures/blockContents';

const meta: Meta = {
  title: 'Columns',
  component: BlockContent,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;


const Template: Story<PROPS> = args => <BlockContent rawContent={columns} {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
