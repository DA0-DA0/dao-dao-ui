import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ProposalStatus } from './ProposalStatus'

export default {
  title: 'Design System / Components / ProposalStatus',
  component: ProposalStatus,
} as ComponentMeta<typeof ProposalStatus>

const Template: ComponentStory<typeof ProposalStatus> = (args) => (
  <ProposalStatus {...args} />
)

export const Open = Template.bind({})
Open.args = { status: 'open' }

export const Executed = Template.bind({})
Executed.args = { status: 'executed' }

export const Passed = Template.bind({})
Passed.args = { status: 'passed' }

export const Rejected = Template.bind({})
Rejected.args = { status: 'rejected' }

const params = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/BziXUrCZhMxKCierPZm2od/v1.0-Da%C3%B8-Da%C3%B8?node-id=7%3A7200',
  },
}

Open.parameters = params
Executed.parameters = params
Passed.parameters = params
Rejected.parameters = params
