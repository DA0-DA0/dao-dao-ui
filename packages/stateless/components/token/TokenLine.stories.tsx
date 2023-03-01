import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { makeProps as makeTokenCardProps } from './TokenCard.stories'
import { TokenLine } from './TokenLine'

export default {
  title: 'DAO DAO / packages / stateless / components / token / TokenLine',
  component: TokenLine,
} as ComponentMeta<typeof TokenLine>

const Template: ComponentStory<typeof TokenLine> = (args) => (
  <div className="max-w-xs">
    <TokenLine {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = makeTokenCardProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A15313',
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...makeTokenCardProps(),
  lazyInfo: { loading: true },
}
