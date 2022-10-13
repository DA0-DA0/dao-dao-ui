import {
  AccountCircleOutlined,
  Cancel,
  HourglassTopRounded,
  Key,
  RotateRightOutlined,
} from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import clsx from 'clsx'

import { ButtonLink } from '../Button'
import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { Logo } from '../Logo'
import { ProposalStatusAndInfo } from './ProposalStatusAndInfo'

export default {
  title:
    'DAO DAO / packages / ui / components / proposal / ProposalStatusAndInfo',
  component: ProposalStatusAndInfo,
} as ComponentMeta<typeof ProposalStatusAndInfo>

const Template: ComponentStory<typeof ProposalStatusAndInfo> = (args) => (
  <div className="max-w-sm">
    <ProposalStatusAndInfo {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  status: 'If the current vote stands, the proposal will pass.',
  info: [
    {
      Icon: ({ className }) => (
        <Logo className={clsx('m-[0.125rem] !h-5 !w-5', className)} />
      ),
      label: 'DAO',
      Value: (props) => (
        <ButtonLink
          onClick={() => alert('go to dao name')}
          variant="underline"
          {...props}
        >
          DAO Name
        </ButtonLink>
      ),
    },
    {
      Icon: AccountCircleOutlined,
      label: 'Creator',
      Value: (props) => (
        <CopyToClipboardUnderline
          takeStartEnd={{
            start: 6,
            end: 4,
          }}
          value="junoabc123asdjasiofjwlk3alkdsm"
          {...props}
        />
      ),
    },
    {
      Icon: RotateRightOutlined,
      label: 'Status',
      Value: (props) => <p {...props}>Open</p>,
    },
    {
      Icon: HourglassTopRounded,
      label: 'Time left',
      Value: (props) => <p {...props}>4 days</p>,
    },
  ],
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=313%3A43541',
  },
}

export const Execute = Template.bind({})
Execute.args = {
  ...Default.args,
  action: {
    label: 'Execute',
    Icon: Key,
    loading: false,
    doAction: () => alert('execute'),
  },
}

export const Close = Template.bind({})
Close.args = {
  ...Default.args,
  action: {
    label: 'Close',
    Icon: Cancel,
    loading: false,
    doAction: () => alert('close'),
  },
}
