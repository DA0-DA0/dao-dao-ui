import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CreatePostComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / Press / actions / CreatePost',
  component: CreatePostComponent,
} as ComponentMeta<typeof CreatePostComponent>

const Template: ComponentStory<typeof CreatePostComponent> = (args) => (
  <CreatePostComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  options: {
    postLoading: {
      loading: true,
    },
  },
}
