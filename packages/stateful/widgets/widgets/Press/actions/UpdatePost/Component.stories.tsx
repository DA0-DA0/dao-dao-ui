import { ComponentMeta, ComponentStory } from '@storybook/react'

import { UpdatePostComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / Press / actions / UpdatePost',
  component: UpdatePostComponent,
} as ComponentMeta<typeof UpdatePostComponent>

const Template: ComponentStory<typeof UpdatePostComponent> = (args) => (
  <UpdatePostComponent {...args} />
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
    postsLoading: {
      loading: false,
      data: [
        {
          id: '1',
          title: 'Post 1',
          content: 'Content 1',
          created: new Date(),
          order: 1,
          pastVersions: [],
        },
        {
          id: '2',
          title: 'Post 2',
          content: 'Content 2',
          created: new Date(),
          order: 2,
          pastVersions: [],
        },
      ],
    },
  },
}
