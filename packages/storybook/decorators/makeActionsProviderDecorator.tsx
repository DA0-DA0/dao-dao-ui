// Inspired by https://storybook.js.org/addons/storybook-dark-mode README

import { DecoratorFn } from '@storybook/react'

import { ActionsProvider, ActionsProviderProps } from '@dao-dao/common/actions'

export const makeActionsProviderDecorator = (
  options: ActionsProviderProps['options']
): DecoratorFn =>
  function ActionsProviderDecorator(Story) {
    return (
      <ActionsProvider options={options}>
        <Story />
      </ActionsProvider>
    )
  }
