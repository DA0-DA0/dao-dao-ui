import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { AppLayout } from './AppLayout'
import { NavigationProps } from './Navigation'
import { Default as NavigatonStory } from './Navigation.stories'
import { RightSidebarProps } from './RightSidebar'
import { Default as RightSidebarStory } from './RightSidebar.stories'

export default {
  title: 'DAO DAO / packages / ui / components / layout / AppLayout',
  component: AppLayout,
} as ComponentMeta<typeof AppLayout>

const Template: ComponentStory<typeof AppLayout> = (args) => {
  const [compact, setCompact] = useState(false)

  return (
    <AppLayout
      {...args}
      navigationProps={{
        ...args.navigationProps,
        compact,
        setCompact,
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  navigationProps: NavigatonStory.args as NavigationProps,
  children: (
    <div className="flex justify-center items-center h-full">
      <p>App content</p>
    </div>
  ),
  rightSidebarProps: RightSidebarStory.args as RightSidebarProps,
}
