import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Footer } from 'components/Footer'

export default {
  title: 'DAO DAO UI v2 / Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=93%3A12255',
  },
}
