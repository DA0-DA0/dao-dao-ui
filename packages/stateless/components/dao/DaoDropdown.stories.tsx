import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CHAIN_ID } from '@dao-dao/storybook'

import { LinkWrapper } from '../LinkWrapper'
import { DaoDropdown } from './DaoDropdown'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / DaoDropdown',
  component: DaoDropdown,
} as ComponentMeta<typeof DaoDropdown>

const Template: ComponentStory<typeof DaoDropdown> = (args) => (
  <DaoDropdown {...args} />
)

export const Default = Template.bind({})
Default.args = {
  dao: {
    chainId: CHAIN_ID,
    coreAddress: 'core1',
    name: 'Core 1',
    imageUrl: '/placeholders/1.svg',
    subDaos: [],
  },
  LinkWrapper,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/XNQp9ODFr22gkxg1HR92wS/%E2%99%A3%EF%B8%8E--Components?node-id=1530%3A11039',
  },
}

export const WithSubdaos = Template.bind({})
WithSubdaos.args = {
  dao: {
    chainId: CHAIN_ID,
    coreAddress: 'raw',
    name: 'Raw',
    imageUrl: '/placeholders/2.svg',
    subDaos: [
      {
        chainId: CHAIN_ID,
        coreAddress: 'payroll',
        name: 'Payroll',
        imageUrl: '/placeholders/3.svg',
      },
      {
        chainId: CHAIN_ID,
        coreAddress: 'pool',
        name: 'Pool distribution',
        imageUrl: '/placeholders/4.svg',
        subDaos: [
          {
            chainId: CHAIN_ID,
            coreAddress: 'native',
            name: 'Native tokens',
            imageUrl: '/placeholders/5.svg',
          },
        ],
      },
    ],
  },
  LinkWrapper,
}
WithSubdaos.parameters = Default.parameters
