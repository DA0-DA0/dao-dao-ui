import { useFormContext } from 'react-hook-form'

import { ProposalContentDisplay, RawActionsRenderer } from '@dao-dao/stateless'

import { useLoadedActionsAndCategories } from '../../../../../actions'
import { EntityDisplay } from '../../../../../components'
import { useWalletInfo } from '../../../../../hooks'
import { NewProposalForm } from '../../types'

export const NewProposalPreview = () => {
  const { loadedActions } = useLoadedActionsAndCategories()
  const { watch } = useFormContext<NewProposalForm>()

  const { walletAddress = '', walletProfileData } = useWalletInfo()

  const proposalDescription = watch('description')
  const proposalTitle = watch('title')

  const actionData = watch('actionData') || []

  return (
    <ProposalContentDisplay
      EntityDisplay={EntityDisplay}
      createdAt={new Date()}
      creator={{
        address: walletAddress,
        name: walletProfileData.loading
          ? { loading: true }
          : { loading: false, data: walletProfileData.profile.name },
      }}
      description={proposalDescription}
      innerContentDisplay={
        actionData.length ? (
          <RawActionsRenderer
            actionData={actionData}
            loadedActions={loadedActions}
          />
        ) : undefined
      }
      title={proposalTitle}
    />
  )
}
