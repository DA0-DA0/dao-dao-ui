import { useMemo } from 'react'

import { VotingModuleType } from '@dao-dao/utils'

import { Template } from './components'
import {
  spendTemplate,
  mintTemplate,
  stakeTemplate,
  addTokenTemplate,
  removeTokenTemplate,
  customTemplate,
} from './templates'

export const templates: Template[] = [
  spendTemplate,
  mintTemplate,
  stakeTemplate,
  addTokenTemplate,
  removeTokenTemplate,
  // Ensure custom is always last for two reasons:
  // 1. It should display last since it is a catch-all.
  // 2. It should be the last template type matched against when listing proposals in the UI since it will match any message (see templateAndDataForDecodedCosmosMsg below).
  customTemplate,
]

export const useTemplatesForVotingModuleType = (
  type: VotingModuleType
): Template[] =>
  useMemo(
    () =>
      templates.filter(({ votingModuleTypes }) =>
        votingModuleTypes.includes(type)
      ),
    [type]
  )

export * from './components/common'
export * from './components/TemplateRenderer'
