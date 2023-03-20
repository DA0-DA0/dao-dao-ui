import { DecoratorFn } from '@storybook/react'

import {
  Default as DappLayoutStory,
  DefaultArgs as DappLayoutStoryArgs,
} from '@dao-dao/stateless/components/layout/DappLayout.stories'
import { DappNavigationProps } from '@dao-dao/stateless/components/layout/DappNavigation'
import { RightSidebarProps } from '@dao-dao/stateless/components/layout/RightSidebar'

export const makeDappLayoutDecorator: (props?: {
  navigationProps?: Partial<DappNavigationProps>
  rightSidebarProps?: Partial<Omit<RightSidebarProps, 'setContentRef'>>
}) => DecoratorFn = ({ navigationProps, rightSidebarProps } = {}) =>
  function DappLayoutDecorator(Story) {
    return (
      <DappLayoutStory
        {...DappLayoutStoryArgs}
        navigationProps={{
          // Allow overriding default arguments from the AppLayout story.
          ...DappLayoutStoryArgs.navigationProps,
          ...navigationProps,
        }}
        rightSidebarProps={{
          // Allow overriding default arguments from the AppLayout story.
          ...DappLayoutStoryArgs.rightSidebarProps,
          ...rightSidebarProps,
        }}
      >
        <Story />
      </DappLayoutStory>
    )
  }
