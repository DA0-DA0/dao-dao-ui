import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FormattedJSONDisplay } from 'components/FormattedJSONDisplay'

export default {
  title: 'DAO DAO UI / FormattedJSONDisplay',
  component: FormattedJSONDisplay,
} as ComponentMeta<typeof FormattedJSONDisplay>

const Template: ComponentStory<typeof FormattedJSONDisplay> = (args) => (
  <FormattedJSONDisplay {...args} />
)

export const Default = Template.bind({})
Default.args = {
  jsonLoadable: null, // TODO: Fill in default value.
}
