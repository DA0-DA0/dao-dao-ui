import { DecoratorFn } from '@storybook/react'

import {
  AppLayout,
  AppLayoutProps,
  NavigationProps,
  SidebarWallet,
  SidebarWalletProps,
} from '@dao-dao/ui'
import { DefaultArgs as NavigationStoryArgs } from '@dao-dao/ui/components/layout/Navigation.stories'
import { Connected as ConnectedSidebarWalletStory } from '@dao-dao/ui/components/layout/SidebarWallet.SidebarWallet.stories'

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
