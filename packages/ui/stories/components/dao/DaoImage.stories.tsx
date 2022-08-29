import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoImage } from 'components/dao/DaoImage'

export default {
  title: 'DAO DAO UI V2 / components / dao / DaoImage',
  component: DaoImage,
} as ComponentMeta<typeof DaoImage>

const Template: ComponentStory<typeof DaoImage> = (args) => (
  <DaoImage {...args} />
)

export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  imageUrl: '/placeholders/1.svg',
}

export const SmallWithParent = Template.bind({})
SmallWithParent.args = {
  size: 'sm',
  imageUrl: '/placeholders/1.svg',
  parentDao: {
    href: '#',
    imageUrl: '/placeholders/2.svg',
  },
}

export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  imageUrl: '/placeholders/1.svg',
}

export const LargeWithParent = Template.bind({})
LargeWithParent.args = {
  size: 'lg',
  imageUrl: '/placeholders/1.svg',
  parentDao: {
    href: '#',
    imageUrl: '/placeholders/2.svg',
  },
}
