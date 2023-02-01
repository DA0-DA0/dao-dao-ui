import { DecoratorFn } from '@storybook/react'

import { RightSidebarProps } from '@dao-dao/stateless/components/layout/RightSidebar'
import {
  Default as SdaLayoutStory,
  DefaultArgs as SdaLayoutStoryArgs,
} from '@dao-dao/stateless/components/layout/SdaLayout.stories'
import { SdaNavigationProps } from '@dao-dao/types'

export const makeSdaLayoutDecorator: (props?: {
  navigationProps?: Partial<SdaNavigationProps>
  rightSidebarProps?: Partial<Omit<RightSidebarProps, 'setContentRef'>>
}) => DecoratorFn = ({ navigationProps, rightSidebarProps } = {}) =>
  function DappLayoutDecorator(Story) {
    return (
      <SdaLayoutStory
        {...SdaLayoutStoryArgs}
        navigationProps={{
          // Allow overriding default arguments from the AppLayout story.
          ...SdaLayoutStoryArgs.navigationProps,
          ...navigationProps,
        }}
        rightSidebarProps={{
          // Allow overriding default arguments from the AppLayout story.
          ...SdaLayoutStoryArgs.rightSidebarProps,
          ...rightSidebarProps,
        }}
      >
        <Story />
      </SdaLayoutStory>
    )
  }
