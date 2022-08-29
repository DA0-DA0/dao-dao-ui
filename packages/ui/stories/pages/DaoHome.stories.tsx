import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ProfileHomeCard,
  ProfileHomeCardProps,
} from 'components/profile/ProfileHomeCard'
import { DaoPageWrapperDecorator, makeAppLayoutDecorator } from 'decorators'
import { DaoHome } from 'pages/DaoHome'
import { Default as ProfileHomeCardStory } from 'stories/components/profile/ProfileHomeCard.stories'

export default {
  title: 'DAO DAO UI V2 / pages / DaoHome',
  component: DaoHome,
  decorators: [
    makeAppLayoutDecorator({
      rightSidebar: (
        <ProfileHomeCard
          {...(ProfileHomeCardStory.args as ProfileHomeCardProps)}
        />
      ),
    }),
    DaoPageWrapperDecorator,
  ],
} as ComponentMeta<typeof DaoHome>

const Template: ComponentStory<typeof DaoHome> = (args) => <DaoHome {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A28615',
  },
}
