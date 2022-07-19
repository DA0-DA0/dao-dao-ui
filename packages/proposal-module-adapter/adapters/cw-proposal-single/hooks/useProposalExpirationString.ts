import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import {
  expirationAtTimeToSecondsFromNow,
  secondsToWdhms,
} from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'

export const useProposalExpirationString = () => {
  const { t } = useTranslation()
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const proposal = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )?.proposal

  if (!proposal) {
    throw new Error(t('error.loadingData'))
  }

  const proposalEndString = useMemo(() => {
    if (proposal.status !== Status.Open) {
      return t('info.completed')
    }

    if ('at_time' in proposal.expiration) {
      const secondsFromNow = expirationAtTimeToSecondsFromNow(
        proposal.expiration
      )
      // Type check, but should never happen.
      if (secondsFromNow === undefined) {
        return
      }

      if (secondsFromNow <= 0) {
        return t('info.completed')
      } else {
        return secondsToWdhms(secondsFromNow)
      }
    }
    // Not much we can say about proposals that expire at a block
    // height / never.
  }, [proposal.expiration, proposal.status, t])

  return proposalEndString
}
