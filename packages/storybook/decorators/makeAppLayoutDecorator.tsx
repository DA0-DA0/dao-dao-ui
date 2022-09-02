import { DecoratorFn } from '@storybook/react'

import {
  AppLayout,
  AppLayoutProps,
  NavigationProps,
  SidebarWallet,
  SidebarWalletProps,
} from 'components/layout'
import { DefaultArgs as NavigationStoryArgs } from 'stories/components/layout/Navigation.stories'
import { Connected as ConnectedSidebarWalletStory } from '@dao-dao/ui/stories/components/layout/SidebarWallet/SidebarWallet.SidebarWallet.stories'

export const makeAppLayoutDecorator: (
  // Require setting `rightSidebar` while allowing page stories to override any
  // navigation props and sidebar wallet props.
  props: Pick<AppLayoutProps, 'rightSidebar'> & {
    navigationProps?: Partial<NavigationProps>
    sidebarWalletProps?: SidebarWalletProps
  }
) => DecoratorFn =
  ({ navigationProps, sidebarWalletProps, ...props }) =>
  // eslint-disable-next-line react/display-name
  (Story) =>
    (
      <AppLayout
        navigationProps={{
          // Use default arguments from the Navigation story.
          ...NavigationStoryArgs,
          ...navigationProps,
        }}
        wallet={
          <SidebarWallet
            {...(sidebarWalletProps ??
              (ConnectedSidebarWalletStory.args as SidebarWalletProps))}
          />
        }
        {...props}
      >
        <Story />
      </AppLayout>
    )
