import { SubmitHandler } from 'react-hook-form'

import { LoadingData } from '../misc'
import { AddChainsChainStatus, AddChainsStatus, ProfileChain } from '../profile'

export type ProfileAddChainsProps = {
  /**
   * Prompt text that opens the chain picker popup.
   */
  prompt: string
  /**
   * Optional tooltip next to prompt text.
   */
  promptTooltip?: string
  /**
   * Optional class name applied to the prompt text.
   */
  promptClassName?: string
  /**
   * Whether or not the prompt to add new chains is disabled. Defaults to
   * `false`.
   */
  disabled?: boolean
  /**
   * List of profile chains.
   */
  chains: LoadingData<ProfileChain[]>
  /**
   * Add chains form submit handler. If undefined, it is not yet ready.
   */
  onAddChains: SubmitHandler<ProfileAddChainsForm> | undefined
  /**
   * Add chain process status.
   *
   * - `idle` - nothing loading
   * - `chains` - connecting and signing each chain's allowance
   * - `registering` - signing registration and firing request
   */
  status: AddChainsStatus
  /**
   * The size of the UI.
   */
  size?: 'sm' | 'default'
  /**
   * Whether or not to only show supported chains. Defaults to `false`.
   */
  onlySupported?: boolean
  /**
   * Whether or not to auto-add when a chain is selected instead of allowing
   * multiple and showing checkboxes. Defaults to `false`.
   */
  autoAdd?: boolean
  /**
   * Optionally use text button style for prompt. Defaults to `false`.
   */
  textPrompt?: boolean
  /**
   * Optional container class name.
   */
  className?: string
}

export type ProfileAddChainsForm = {
  chains: {
    chainId: string
    /**
     * Status to display while submitting.
     */
    status: AddChainsChainStatus
  }[]
}

export type StatefulProfileAddChainsProps = Omit<
  ProfileAddChainsProps,
  'chains' | 'onAddChains' | 'status'
>
