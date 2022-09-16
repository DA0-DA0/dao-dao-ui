import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useMemo, useState } from 'react'

import { AppLayout, AppLayoutProps } from './AppLayout'
import { NavigationProps } from './Navigation'
import { Default as NavigatonStory } from './Navigation.stories'
import { PageHeader, PageHeaderProps } from './PageHeader'
import { Default as PageHeaderStory } from './PageHeader.stories'
import { DefaultArgs as RightSidebarStoryArgs } from './RightSidebar.stories'

export default {
  title: 'DAO DAO / packages / ui / components / layout / AppLayout',
  component: AppLayout,
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof AppLayout>

export const DefaultArgs: AppLayoutProps = {
  navigationProps: NavigatonStory.args as NavigationProps,
  children: (
    <div className="flex flex-col px-6 h-full">
      <PageHeader {...(PageHeaderStory.args as PageHeaderProps)} />

      <div className="flex grow justify-center items-center">
        <p>App content</p>
      </div>
    </div>
  ),
  rightSidebarProps: RightSidebarStoryArgs,
  context: {
    responsiveNavigation: {
      enabled: true,
      toggle: () => alert('toggle'),
    },
  },
}

const Template: ComponentStory<typeof AppLayout> = (args) => {
  const [compact, setCompact] = useState(false)
  const [responsiveNavigationEnabled, setResponsiveNavigationEnabled] =
    useState(false)

  return (
    <AppLayout
      {...args}
      context={useMemo(
        () => ({
          responsiveNavigation: {
            enabled: responsiveNavigationEnabled,
            toggle: () => setResponsiveNavigationEnabled((v) => !v),
          },
        }),
        [responsiveNavigationEnabled]
      )}
      navigationProps={{
        ...args.navigationProps,
        compact,
        setCompact,
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = DefaultArgs
