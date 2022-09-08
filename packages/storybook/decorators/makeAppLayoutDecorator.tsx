import { DecoratorFn } from '@storybook/react'
import { useState } from 'react'

import { AppLayout, NavigationProps } from '@dao-dao/ui/components/layout'
import { DefaultArgs as NavigationStoryArgs } from '@dao-dao/ui/components/layout/Navigation.stories'
import { RightSidebarProps } from '@dao-dao/ui/components/layout/RightSidebar'
import { DefaultArgs as RightSidebarStoryArgs } from '@dao-dao/ui/components/layout/RightSidebar.stories'

export const makeAppLayoutDecorator: (props: {
  navigationProps?: Partial<NavigationProps>
  rightSidebarProps: Pick<RightSidebarProps, 'children'> &
    Partial<Omit<RightSidebarProps, 'children'>>
}) => DecoratorFn = ({ navigationProps, rightSidebarProps }) =>
  function AppLayoutDecorator(Story) {
    const [compact, setCompact] = useState(false)
    const [responsiveNavigation, setResponsiveNavigation] = useState(false)

    return (
      <AppLayout
        navigationProps={{
          // Use default arguments from the Navigation story.
          ...NavigationStoryArgs,
          compact,
          setCompact,
          responsiveMenuEnabled: responsiveNavigation,
          ...navigationProps,
        }}
        rightSidebarProps={{
          ...RightSidebarStoryArgs,
          ...rightSidebarProps,
        }}
        toggleResponsiveNavigation={() => setResponsiveNavigation((v) => !v)}
      >
        <Story />
      </AppLayout>
    )
  }
