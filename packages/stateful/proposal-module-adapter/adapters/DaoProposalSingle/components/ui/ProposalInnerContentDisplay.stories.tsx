import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalInnerContentDisplay } from './ProposalInnerContentDisplay'

export default {
  title:
    'DAO DAO / packages / stateful / proposal-module-adapter / adapters / DaoProposalSingle / components / ui / ProposalInnerContentDisplay',
  component: ProposalInnerContentDisplay,
} as ComponentMeta<typeof ProposalInnerContentDisplay>

const Template: ComponentStory<typeof ProposalInnerContentDisplay> = (args) => (
  <ProposalInnerContentDisplay {...args} />
)

export const Default = Template.bind({})
Default.args = {
  innerContentDisplay: (
    <p className="rounded-md border border-border-primary p-4 text-center">
      Action display placeholder
    </p>
  ),
  showRaw: false,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
