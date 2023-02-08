import { createContext } from 'react'

import { IDaoContext } from '@dao-dao/types'

export const DaoContext = createContext<IDaoContext | null>(null)
