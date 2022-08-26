import { DecoratorFn } from '@storybook/react'
import { ReactNode } from 'react'

import { FooterProps } from 'components/Footer'
import { NavigationProps } from 'components/Navigation'
import { Default as Footer } from 'stories/components/Footer.stories'
import { Default as Navigation } from 'stories/components/Navigation/Navigation.stories'

export interface makeAppLayoutDecoratorProps {
  rightCard: ReactNode
  navigationProps?: Partial<NavigationProps>
}

export const makeAppLayoutDecorator: (
  props: makeAppLayoutDecoratorProps
) => DecoratorFn =
  ({ rightCard, navigationProps }) =>
  // eslint-disable-next-line react/display-name
  (Story) =>
    (
      <div className="flex flex-row items-stretch w-full h-full">
        <div className="shrink-0 w-[264px]">
          <Navigation
            {...(Navigation.args as NavigationProps)}
            {...navigationProps}
          />
        </div>

        <main className="overflow-hidden grow min-h-screen border-x border-border-base">
          <Story />
        </main>

        <div className="flex flex-col shrink-0 items-stretch p-6 space-y-6 w-[336px]">
          {rightCard}

          <Footer {...(Footer.args as FooterProps)} />
        </div>
      </div>
    )
