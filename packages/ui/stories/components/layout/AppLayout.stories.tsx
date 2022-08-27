/* eslint-disable i18next/no-literal-string */
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AppLayout } from 'components/layout/AppLayout'
import { NavigationProps } from 'components/layout/Navigation'
import { ProfileHomeDisconnectedCard } from 'components/profile/ProfileHomeDisconnectedCard'
import { Default as NavigatonStory } from 'stories/components/layout/Navigation.stories'

export default {
  title: 'DAO DAO UI V2 / components / layout / AppLayout',
  component: AppLayout,
} as ComponentMeta<typeof AppLayout>

const Template: ComponentStory<typeof AppLayout> = (args) => (
  <AppLayout {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: (
    <div className="flex justify-center items-center h-full">
      <p>App content</p>
    </div>
  ),
  rightSidebar: <ProfileHomeDisconnectedCard />,
  navigationProps: NavigatonStory.args as NavigationProps,
}
