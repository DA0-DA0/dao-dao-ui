/* eslint-disable i18next/no-literal-string */
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Inbox } from '@dao-dao/icons'

import { Row } from 'components/Navigation/Row'

export default {
  title: 'DAO DAO UI V2 / components / Navigation / Row',
  component: Row,
} as ComponentMeta<typeof Row>

const Template: ComponentStory<typeof Row> = (args) => (
  <div className="w-40">
    <Row {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  Icon: Inbox,
  label: 'Inbox',
  onClick: undefined,
  children: (
    <>
      <p>This is a child.</p>
    </>
  ),
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=127%3A31185',
  },
}
