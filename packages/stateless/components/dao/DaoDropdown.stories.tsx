import { ComponentMeta, ComponentStory } from '@storybook/react'

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
    coreAddress: 'core1',
    name: 'Core 1',
    imageUrl: '/placeholders/1.svg',
    subdaos: [],
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
    coreAddress: 'raw',
    name: 'Raw',
    imageUrl: '/placeholders/2.svg',
    subdaos: [
      {
        coreAddress: 'payroll',
        name: 'Payroll',
        imageUrl: '/placeholders/3.svg',
      },
      {
        coreAddress: 'pool',
        name: 'Pool distribution',
        imageUrl: '/placeholders/4.svg',
        subdaos: [
          {
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
