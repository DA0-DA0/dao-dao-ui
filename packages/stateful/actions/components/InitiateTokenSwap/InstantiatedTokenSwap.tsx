import { useTranslation } from 'react-i18next'

import { HandshakeEmoji, TokenSwapStatus } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'

import { ActionCard } from '../ActionCard'
import { InitiateTokenSwapOptions } from '../InitiateTokenSwap'

// This action requires the user to first instantiate a token swap contract
// themself, and then the user can use this action to propose funding that token
// swap to the DAO. The token swap contract instantiator is irrelevant, so
// there's no reason to make the DAO submit two proposals (one to instantiate
// and one to fund). Thus, this action has a preliminary step, in which the user
// enters the token swap contract instantiation information and executes the
// instantiation. Once done, the action is ready to submit.

// Displayed when displaying an existing token swap.
export const InstantiatedTokenSwap: ActionComponent<
  InitiateTokenSwapOptions
> = ({ onRemove, isCreating, options }) => {
  const { t } = useTranslation()

  // This component should not be displaying if this is false.
  if (!options.contractInstantiated) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <ActionCard
      Icon={HandshakeEmoji}
      onRemove={onRemove}
      title={t('title.initiateTokenSwap')}
    >
      <TokenSwapStatus {...options.tokenSwapStatusProps} />
    </ActionCard>
  )
}
