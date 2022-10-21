import { BookOutlined, FlagOutlined, Timelapse } from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalCard, ProposalCardProps } from './ProposalCard'

export default {
  title:
    'DAO DAO / packages / stateless / components / proposal / ProposalCard',
  component: ProposalCard,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof ProposalCard>

const Template: ComponentStory<typeof ProposalCard> = (args) => (
  <div className="max-w-xs">
    <ProposalCard {...args} />
  </div>
)

export const makeProps = (): ProposalCardProps => ({
  dao: {
    coreAddress: 'daoCoreAddress',
    imageUrl: '/dog.jpg',
  },
  id: 'A13',
  title: 'Inviting Zeke as a new member',
  description:
    'Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Sed posuere consectetur est at lobortis',
  info: [
    {
      Icon: BookOutlined,
      label: 'Threshold: Majority',
    },
    {
      Icon: FlagOutlined,
      label: 'Quorum: 20%',
    },
    {
      Icon: Timelapse,
      label: '8 days',
    },
  ],
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=1010%3A47570',
  },
}
