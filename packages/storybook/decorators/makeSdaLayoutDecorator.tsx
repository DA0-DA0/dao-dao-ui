import { DecoratorFn } from '@storybook/react'

import {
  Default as SdaLayoutStory,
  DefaultArgs as SdaLayoutStoryArgs,
} from '@dao-dao/stateless/components/layout/SdaLayout.stories'
import { SdaNavigationProps } from '@dao-dao/types'

export const makeSdaLayoutDecorator: (props?: {
  navigationProps?: Partial<SdaNavigationProps>
}) => DecoratorFn = ({ navigationProps } = {}) =>
  function DappLayoutDecorator(Story) {
    return (
      <SdaLayoutStory
        {...SdaLayoutStoryArgs}
        navigationProps={{
          // Allow overriding default arguments from the AppLayout story.
          ...SdaLayoutStoryArgs.navigationProps,
          ...navigationProps,
        }}
      >
        <Story />
      </SdaLayoutStory>
    )
  }
