import { ComponentProps, ComponentType } from 'react'
import { Trans } from 'react-i18next'

import { LoaderProps } from './Loader'

export interface TransProps extends ComponentProps<typeof Trans> {
  Loader?: ComponentType<LoaderProps>
}
