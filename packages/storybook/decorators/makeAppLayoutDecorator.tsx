import { DecoratorFn } from '@storybook/react'

import {
  Default as AppLayoutStory,
  DefaultArgs as AppLayoutStoryArgs,
} from '@dao-dao/ui/components/layout/AppLayout.stories'
import { NavigationProps } from '@dao-dao/ui/components/layout/Navigation'
import { RightSidebarProps } from '@dao-dao/ui/components/layout/RightSidebar'

export const makeAppLayoutDecorator: (props: {
  navigationProps?: Partial<NavigationProps>
  rightSidebarProps: Pick<RightSidebarProps, 'children'> &
    Partial<Omit<RightSidebarProps, 'children'>>
}) => DecoratorFn = ({ navigationProps, rightSidebarProps }) =>
  function AppLayoutDecorator(Story) {
    return (
      <AppLayoutStory
        {...AppLayoutStoryArgs}
        navigationProps={{
          // Allow overriding default arguments from the AppLayout story.
          ...AppLayoutStoryArgs.navigationProps,
          ...navigationProps,
        }}
        rightSidebarProps={{
          // Allow overriding default arguments from the AppLayout story.
          ...AppLayoutStoryArgs.rightSidebarProps,
          ...rightSidebarProps,
        }}
      >
        <Story />
      </AppLayoutStory>
    )
  }
