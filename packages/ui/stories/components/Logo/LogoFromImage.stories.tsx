import { ComponentMeta, ComponentStory } from '@storybook/react'

import { LogoFromImage } from 'components/Logo'

export default {
  title: 'DAO DAO UI / components / LogoFromImage',
  component: LogoFromImage,
} as ComponentMeta<typeof LogoFromImage>

const Template: ComponentStory<typeof LogoFromImage> = (args) => (
  <LogoFromImage {...args} />
)

export const Default = Template.bind({})
Default.args = {
  src: 'https://moonphase.is/image.svg',
}
