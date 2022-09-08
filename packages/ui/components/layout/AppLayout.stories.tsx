import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { AppLayout } from './AppLayout'
import { NavigationProps } from './Navigation'
import { Default as NavigatonStory } from './Navigation.stories'
import { PageHeader, PageHeaderProps } from './PageHeader'
import { Default as PageHeaderStory } from './PageHeader.stories'
import { RightSidebarProps } from './RightSidebar'
import { Default as RightSidebarStory } from './RightSidebar.stories'

export default {
  title: 'DAO DAO / packages / ui / components / layout / AppLayout',
  component: AppLayout,
} as ComponentMeta<typeof AppLayout>

const Template: ComponentStory<typeof AppLayout> = (args) => {
  const [compact, setCompact] = useState(false)
  const [responsiveNavigationEnabled, setResponsiveNavigationEnabled] =
    useState(false)

  return (
    <AppLayout
      {...args}
      navigationProps={{
        ...args.navigationProps,
        compact,
        setCompact,
      }}
      responsiveNavigationEnabled={responsiveNavigationEnabled}
      toggleResponsiveNavigation={() =>
        setResponsiveNavigationEnabled((v) => !v)
      }
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  navigationProps: NavigatonStory.args as NavigationProps,
  children: (
    <div className="flex flex-col px-6 h-full">
      <PageHeader {...(PageHeaderStory.args as PageHeaderProps)} />

      <div className="flex grow justify-center items-center">
        <p>App content</p>
      </div>
    </div>
  ),
  rightSidebarProps: RightSidebarStory.args as RightSidebarProps,
}
