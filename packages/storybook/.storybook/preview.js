import '@dao-dao/stateless/styles/index.css'

import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'

import i18n from './i18next'
import {
  NotificationsDecorator,
  RecoilDecorator,
  ThemeDecorator,
  makeAppLayoutContextDecorator,
} from '../decorators'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
  },
  nextRouter: {
    isReady: true,
  },
  // Fixes out of memory error caused by react-hook-form circular references
  // that storybook does not know how to handle.
  // https://github.com/storybookjs/storybook/issues/12747
  docs: {
    source: {
      type: 'code',
    },
  },
  viewport: {
    viewports: {
      mobile1_5: {
        name: 'Tall small mobile',
        styles: {
          height: '768px',
          width: '320px',
        },
        type: 'mobile',
      },
      ...MINIMAL_VIEWPORTS,
    },
  },
  // No need to enable `darkMode.stylePreview` because we handle theme manually
  // in `ThemeDecorator`.
}

export const decorators = [
  ThemeDecorator,
  RecoilDecorator,
  NotificationsDecorator,
  makeAppLayoutContextDecorator(),
]
