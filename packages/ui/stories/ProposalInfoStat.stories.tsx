import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalInfoStat } from 'components/ProposalInfoStat'

export default {
  title: 'DAO DAO UI / ProposalInfoStat',
  component: ProposalInfoStat,
} as ComponentMeta<typeof ProposalInfoStat>

const Template: ComponentStory<typeof ProposalInfoStat> = (args) => <ProposalInfoStat {...args} />

export const Default = Template.bind({})
Default.args = {
  "Icon": null, // TODO: Fill in default value.
  "title": null // TODO: Fill in default value.
}
