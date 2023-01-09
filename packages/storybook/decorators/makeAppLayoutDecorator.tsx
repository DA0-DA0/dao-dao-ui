import { DecoratorFn } from '@storybook/react'

import {
  Default as AppLayoutStory,
  DefaultArgs as AppLayoutStoryArgs,
} from '@dao-dao/stateless/components/layout/AppLayout.stories'
import { NavigationProps } from '@dao-dao/stateless/components/layout/Navigation'
import { RightSidebarProps } from '@dao-dao/stateless/components/layout/RightSidebar'

export const makeAppLayoutDecorator: (props?: {
  navigationProps?: Partial<NavigationProps>
  rightSidebarProps?: Partial<Omit<RightSidebarProps, 'setContentRef'>>
}) => DecoratorFn = ({ navigationProps, rightSidebarProps } = {}) =>
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
