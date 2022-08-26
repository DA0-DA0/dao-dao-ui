import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileHomeDisconnectedCardProps } from 'components/profile/ProfileHomeDisconnectedCard'
import { makeAppLayoutDecorator } from 'decorators'
import { HomeDisconnected } from 'pages/HomeDisconnected'
import { Default as ProfileHomeDisconnectedCard } from 'stories/components/profile/ProfileHomeDisconnectedCard.stories'

export default {
  title: 'DAO DAO UI V2 / pages / HomeDisconnected',
  component: HomeDisconnected,
  decorators: [
    makeAppLayoutDecorator({
      rightCard: (
        <ProfileHomeDisconnectedCard
          {...(ProfileHomeDisconnectedCard.args as ProfileHomeDisconnectedCardProps)}
        />
      ),
    }),
  ],
} as ComponentMeta<typeof HomeDisconnected>

const Template: ComponentStory<typeof HomeDisconnected> = (_args) => (
  <HomeDisconnected />
)

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=272%3A64768',
  },
}
