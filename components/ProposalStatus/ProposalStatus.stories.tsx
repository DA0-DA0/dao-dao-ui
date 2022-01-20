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

export const OpenStatus = Template.bind({})
OpenStatus.args = { status: 'open' }

export const ExecutedStatus = Template.bind({})
ExecutedStatus.args = { status: 'executed' }

export const PassedStatus = Template.bind({})
PassedStatus.args = { status: 'passed' }

export const RejectedStatus = Template.bind({})
RejectedStatus.args = { status: 'rejected' }

const params = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/BziXUrCZhMxKCierPZm2od/v1.0-Da%C3%B8-Da%C3%B8?node-id=7%3A7200',
  },
}

OpenStatus.parameters = params
ExecutedStatus.parameters = params
PassedStatus.parameters = params
RejectedStatus.parameters = params
