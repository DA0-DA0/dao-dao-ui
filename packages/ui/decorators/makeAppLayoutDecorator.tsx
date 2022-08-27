import { DecoratorFn } from '@storybook/react'

import { AppLayout, AppLayoutProps, NavigationProps } from 'components/layout'
import { Default } from 'stories/components/layout/Navigation.stories'

export const makeAppLayoutDecorator: (
  // Require setting `rightSidebar` while allowing page stories to override any
  // navigation props.
  props: Pick<AppLayoutProps, 'rightSidebar'> & {
    navigationProps: Partial<NavigationProps>
  }
) => DecoratorFn =
  ({ navigationProps, ...props }) =>
  // eslint-disable-next-line react/display-name
  (Story) =>
    (
      <AppLayout
        navigationProps={{
          // Use default arguments from the Navigation story.
          ...(Default.args as NavigationProps),
          ...navigationProps,
        }}
        {...props}
      >
        <Story />
      </AppLayout>
    )
