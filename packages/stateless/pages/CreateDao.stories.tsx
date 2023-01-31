import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ComponentType } from 'react'

import {
  WalletProviderDecorator,
  makeCreateDaoFormDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'

export default {
  title: 'DAO DAO / packages / stateless / pages / CreateDao',
  decorators: [
    // Direct ancestor of rendered story.
    makeCreateDaoFormDecorator(0),
    makeDappLayoutDecorator(),
    WalletProviderDecorator,
  ],
} as ComponentMeta<ComponentType>

// makeCreateDaoFormDecorator renders the CreateDao page.
const Template: ComponentStory<ComponentType> = (_args) => <></>

export const Default = Template.bind({})
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=779%3A39683',
  },
}
