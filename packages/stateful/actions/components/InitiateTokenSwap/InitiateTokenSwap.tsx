import { ActionComponent } from '@dao-dao/types/actions'

import { InstantiatedTokenSwap } from './InstantiatedTokenSwap'
import { InstantiateTokenSwap } from './InstantiateTokenSwap'
import { InitiateTokenSwapOptions } from './types'

// This action requires the user to first instantiate a token swap contract
// themself, and then the user can use this action to propose funding that token
// swap to the DAO. The token swap contract instantiator is irrelevant, so
// there's no reason to make the DAO submit two proposals (one to instantiate
// and one to fund). Thus, this action has a preliminary step, in which the user
// enters the token swap contract instantiation information and executes the
// instantiation. Once done, the action is ready to submit.

export const InitiateTokenSwapComponent: ActionComponent<
  InitiateTokenSwapOptions
> = (props) =>
  props.options.contractInstantiated ? (
    <InstantiatedTokenSwap {...props} />
  ) : (
    <InstantiateTokenSwap {...props} />
  )
