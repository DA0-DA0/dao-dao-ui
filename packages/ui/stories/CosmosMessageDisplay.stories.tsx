import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CosmosMessageDisplay } from 'components/CosmosMessageDisplay'

export default {
  title: 'DAO DAO UI / CosmosMessageDisplay',
  component: CosmosMessageDisplay,
} as ComponentMeta<typeof CosmosMessageDisplay>

const Template: ComponentStory<typeof CosmosMessageDisplay> = (args) => <CosmosMessageDisplay {...args} />

export const Default = Template.bind({})
Default.args = {
  "value": null // TODO: Fill in default value.
}
