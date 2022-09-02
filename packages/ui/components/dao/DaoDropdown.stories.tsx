import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoDropdown } from './DaoDropdown'

export default {
  title: 'DAO DAO / packages / ui / components / dao / DaoDropdown',
  component: DaoDropdown,
} as ComponentMeta<typeof DaoDropdown>

const Template: ComponentStory<typeof DaoDropdown> = (args) => (
  <DaoDropdown {...args} />
)

export const Default = Template.bind({})
Default.args = {
  dao: {
    name: 'Core 1',
    imageUrl: '/placeholders/1.svg',
    subdaos: [],
  },
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=3%3A5779',
  },
}

export const WithSubdaos = Template.bind({})
WithSubdaos.args = {
  dao: {
    name: 'Raw',
    imageUrl: '/placeholders/2.svg',
    subdaos: [
      {
        name: 'Payroll',
        imageUrl: '/placeholders/3.svg',
      },
      {
        name: 'Pool distribution',
        imageUrl: '/placeholders/4.svg',
        subdaos: [
          {
            name: 'Native tokens',
            imageUrl: '/placeholders/5.svg',
          },
        ],
      },
    ],
  },
  defaultExpanded: true,
}
WithSubdaos.parameters = Default.parameters
