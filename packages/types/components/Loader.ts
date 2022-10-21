import { ComponentType } from 'react'

import { LogoProps } from './Logo'

export interface LoaderProps {
  fill?: boolean
  size?: number | string
  className?: string
  Logo?: ComponentType<LogoProps>
}
