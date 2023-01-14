import { ComponentMeta, ComponentStory } from '@storybook/react'

import { LinkWrapper } from '../LinkWrapper'
import { DaoImage } from './DaoImage'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / DaoImage',
  component: DaoImage,
} as ComponentMeta<typeof DaoImage>

const Template: ComponentStory<typeof DaoImage> = (args) => (
  <DaoImage {...args} />
)

export const Small = Template.bind({})
Small.args = {
  daoName: 'DAO',
  size: 'sm',
  imageUrl: '/placeholders/1.svg',
  LinkWrapper,
}

export const SmallWithParent = Template.bind({})
SmallWithParent.args = {
  daoName: 'DAO',
  size: 'sm',
  imageUrl: '/placeholders/1.svg',
  parentDao: {
    name: 'Parent DAO',
    coreAddress: 'parent',
    imageUrl: '/placeholders/2.svg',
    registeredSubDao: true,
  },
  LinkWrapper,
}

export const Large = Template.bind({})
Large.args = {
  daoName: 'DAO',
  size: 'lg',
  imageUrl: '/placeholders/1.svg',
  LinkWrapper,
}

export const LargeWithParent = Template.bind({})
LargeWithParent.args = {
  daoName: 'DAO',
  size: 'lg',
  imageUrl: '/placeholders/1.svg',
  parentDao: {
    name: 'Parent DAO',
    coreAddress: 'parent',
    imageUrl: '/placeholders/2.svg',
    registeredSubDao: true,
  },
  LinkWrapper,
}
