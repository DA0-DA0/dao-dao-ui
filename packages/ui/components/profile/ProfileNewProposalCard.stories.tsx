import {
  AttachMoney,
  CancelOutlined,
  FlagOutlined,
  MultilineChart,
} from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileNewProposalCard } from './ProfileNewProposalCard'

export default {
  title:
    'DAO DAO / packages / ui / components / profile / ProfileNewProposalCard',
  component: ProfileNewProposalCard,
} as ComponentMeta<typeof ProfileNewProposalCard>

const Template: ComponentStory<typeof ProfileNewProposalCard> = (args) => (
  <div className="max-w-xs">
    <ProfileNewProposalCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  daoName: 'Dog Dao',
  walletAddress: 'wallet',
  walletName: 'Modern-Edamame',
  profileImgUrl: '/noah.jpg',
  info: {
    loading: false,
    data: {
      lines: [
        {
          Icon: MultilineChart,
          label: 'Passing threshold',
          value: 'Majority',
        },
        {
          Icon: FlagOutlined,
          label: 'Quorum',
          value: '20%',
        },
        {
          Icon: AttachMoney,
          label: 'Proposal deposit',
          value: '2,000 $DOG',
        },
        {
          Icon: CancelOutlined,
          label: 'Failed proposals',
          value: 'No Refund',
          valueClassName: '!border-component-badge-error',
        },
      ],
      addresses: [
        {
          label: 'Dog Dao address',
          address:
            'juno1czh5dy2kxwwt5hlw6rr2q25clj96sheftsdccswg9qe34m3wzgdswmw8ju',
        },
        {
          label: 'DAO Staking address',
          address:
            'juno1czh5dy2kxwwt5hlw6rr2q25clj96sheftsdccswg9qe34m3wzgdswmw8ju',
        },
        {
          label: 'Governance token address',
          address:
            'juno1czh5dy2kxwwt5hlw6rr2q25clj96sheftsdccswg9qe34m3wzgdswmw8ju',
        },
      ],
    },
  },
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=1012%3A49063',
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  info: {
    loading: true,
  },
}
