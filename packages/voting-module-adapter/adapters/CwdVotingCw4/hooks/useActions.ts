import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Action, ActionContextType, ActionOptions } from '@dao-dao/tstypes'
import { useDaoInfoContext } from '@dao-dao/ui'

import { makeManageMembersAction } from '../actions'

export const useActions = (): Action[] => {
  const { t } = useTranslation()
  const { coreAddress, coreVersion } = useDaoInfoContext()

  return useMemo(() => {
    const options: ActionOptions = {
      t,
      address: coreAddress,
      context: {
        type: ActionContextType.Dao,
        coreVersion,
      },
    }

    return [makeManageMembersAction(options)].filter(Boolean) as Action[]
  }, [coreAddress, coreVersion, t])
}
