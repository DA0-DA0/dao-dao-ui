import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DeletePostComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / Press / actions / DeletePost',
  component: DeletePostComponent,
} as ComponentMeta<typeof DeletePostComponent>

const Template: ComponentStory<typeof DeletePostComponent> = (args) => (
  <DeletePostComponent {...args} />
)

const now = new Date()

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  options: {
    postsLoading: {
      loading: false,
      data: [
        {
          id: '1',
          title: 'Post 1',
          content: 'Content 1',
          created: now,
          pastVersions: [],
          initiallyCreated: now,
        },
        {
          id: '2',
          title: 'Post 2',
          content: 'Content 2',
          created: now,
          pastVersions: [],
          initiallyCreated: now,
        },
      ],
    },
    postLoading: {
      loading: true,
    },
  },
}
