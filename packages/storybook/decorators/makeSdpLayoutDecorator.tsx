import { DecoratorFn } from '@storybook/react'

import { RightSidebarProps } from '@dao-dao/stateless/components/layout/RightSidebar'
import {
  Default as SdpLayoutStory,
  DefaultArgs as SdpLayoutStoryArgs,
} from '@dao-dao/stateless/components/layout/SdpLayout.stories'
import { SdpNavigationProps } from '@dao-dao/types'

export const makeSdpLayoutDecorator: (props?: {
  navigationProps?: Partial<SdpNavigationProps>
  rightSidebarProps?: Partial<Omit<RightSidebarProps, 'setContentRef'>>
}) => DecoratorFn = ({ navigationProps, rightSidebarProps } = {}) =>
  function DappLayoutDecorator(Story) {
    return (
      <SdpLayoutStory
        {...SdpLayoutStoryArgs}
        navigationProps={{
          // Allow overriding default arguments from the AppLayout story.
          ...SdpLayoutStoryArgs.navigationProps,
          ...navigationProps,
        }}
        rightSidebarProps={{
          // Allow overriding default arguments from the AppLayout story.
          ...SdpLayoutStoryArgs.rightSidebarProps,
          ...rightSidebarProps,
        }}
      >
        <Story />
      </SdpLayoutStory>
    )
  }
