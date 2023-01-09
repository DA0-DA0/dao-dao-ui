import { ComponentMeta, ComponentStory } from '@storybook/react'

import { LogoFromImage } from './Logo'

export default {
  title: 'DAO DAO / packages / stateless / components / LogoFromImage',
  component: LogoFromImage,
} as ComponentMeta<typeof LogoFromImage>

const Template: ComponentStory<typeof LogoFromImage> = (args) => (
  <LogoFromImage {...args} />
)

export const Default = Template.bind({})
Default.args = {
  src: 'https://moonphase.is/image.svg',
}
