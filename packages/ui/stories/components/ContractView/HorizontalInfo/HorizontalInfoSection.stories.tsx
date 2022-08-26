import { ComponentMeta, ComponentStory } from '@storybook/react'

import { HorizontalInfoSection } from 'components/ContractView/HorizontalInfo'

export default {
  title: 'DAO DAO UI / components / ContractView / HorizontalInfoSection',
  component: HorizontalInfoSection,
} as ComponentMeta<typeof HorizontalInfoSection>

const Template: ComponentStory<typeof HorizontalInfoSection> = (args) => (
  <HorizontalInfoSection {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'Section content',
}
