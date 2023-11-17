import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EntityDisplay } from '@dao-dao/stateful'
import { CHAIN_ID } from '@dao-dao/storybook'
import { EntityType } from '@dao-dao/types'

import { IconButtonLink } from '../icon_buttons'
import { ProposalContentDisplay } from './ProposalContentDisplay'

export default {
  title:
    'DAO DAO / packages / stateless / components / proposal / ProposalContentDisplay',
  component: ProposalContentDisplay,
} as ComponentMeta<typeof ProposalContentDisplay>

const Template: ComponentStory<typeof ProposalContentDisplay> = (args) => (
  <ProposalContentDisplay {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'Enable liquidity rewards for Junoswap LPs',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.\n\nAenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna.',
  // Random date in the past 5 days.
  createdAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000),
  innerContentDisplay: (
    <p className="rounded-md border border-border-primary p-4 text-center">
      Action display placeholder
    </p>
  ),
  creator: {
    entity: {
      loading: false,
      data: {
        type: EntityType.Wallet,
        chainId: CHAIN_ID,
        address: 'juno789def000ghi',
        name: 'wallet Person!',
        imageUrl: '/placeholders/1.svg',
      },
    },
    address: 'juno789def000ghi',
  },
  EntityDisplay,
  IconButtonLink,
  onRefresh: () => alert('refresh'),
  refreshing: false,
  duplicateUrl: '#',
}
