import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Table } from './Table'

export default {
  title: 'DAO DAO / packages / stateless / components / Table',
  component: Table,
} as ComponentMeta<typeof Table>

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />

export const Default = Template.bind({})
Default.args = {
  headers: ['Header 1', 'Header 2', 'Header 3'],
  rows: [
    ['Row 1, Column 1', 'Row 1, Column 2', 'Row 1, Column 3'],
    ['Row 2, Column 1', 'Row 2, Column 2', 'Row 2, Column 3'],
    ['Row 3, Column 1', 'Row 3, Column 2', 'Row 3, Column 3'],
    ['Row 4, Column 1', 'Row 4, Column 2', 'Row 4, Column 3'],
  ],
}
