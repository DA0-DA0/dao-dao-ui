import { ReactNode } from 'react'

import { DaoPageMode } from '../dao'

export type IRootContext = {
  mode: DaoPageMode
}

export type RootContextProviderProps = {
  mode: DaoPageMode
  children: ReactNode
}
