import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  WalletProviderDecorator,
  makeAppLayoutDecorator,
  makeCreateDaoFormDecorator,
} from '@dao-dao/storybook/decorators'

import { CreateDaoStart } from './Start'

export default {
  title: 'DAO DAO / packages / ui / components / dao / create / pages / Start',
  component: CreateDaoStart,
  decorators: [
    // Direct ancestor of rendered story.
    makeCreateDaoFormDecorator(0),
    makeAppLayoutDecorator(),
    WalletProviderDecorator,
  ],
} as ComponentMeta<typeof CreateDaoStart>

// makeCreateDaoFormDecorator renders the page based on the initialIndex set to
// `0` in the decorators above.
const Template: ComponentStory<typeof CreateDaoStart> = (_args) => <></>

export const Default = Template.bind({})
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=782%3A44121',
  },
}
