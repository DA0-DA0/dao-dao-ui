import { createContext } from 'react'

import { DaoInfo } from '@dao-dao/types'

export const DaoInfoContext = createContext<DaoInfo | null>(null)
