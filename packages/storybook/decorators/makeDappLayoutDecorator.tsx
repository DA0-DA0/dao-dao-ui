import { DecoratorFn } from '@storybook/react'

import {
  Default as DappLayoutStory,
  DefaultArgs as DappLayoutStoryArgs,
} from '@dao-dao/stateless/components/layout/DappLayout.stories'
import { DappNavigationProps } from '@dao-dao/stateless/components/layout/DappNavigation'

export const makeDappLayoutDecorator: (props?: {
  navigationProps?: Partial<DappNavigationProps>
}) => DecoratorFn = ({ navigationProps } = {}) =>
  function DappLayoutDecorator(Story) {
    return (
      <DappLayoutStory
        {...DappLayoutStoryArgs}
        navigationProps={{
          // Allow overriding default arguments from the AppLayout story.
          ...DappLayoutStoryArgs.navigationProps,
          ...navigationProps,
        }}
      >
        <Story />
      </DappLayoutStory>
    )
  }
