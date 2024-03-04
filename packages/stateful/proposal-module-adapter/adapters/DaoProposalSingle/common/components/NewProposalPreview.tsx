import { useFormContext } from 'react-hook-form'

import { ProposalContentDisplay, RawActionsRenderer } from '@dao-dao/stateless'

import { useLoadedActionsAndCategories } from '../../../../../actions'
import { EntityDisplay } from '../../../../../components'
import { useEntity, useWallet } from '../../../../../hooks'
import { NewProposalForm } from '../../types'

export const NewProposalPreview = () => {
  const { loadedActions } = useLoadedActionsAndCategories()
  const { watch } = useFormContext<NewProposalForm>()

  const { address: walletAddress = '' } = useWallet()
  const { entity } = useEntity(walletAddress)

  const proposalDescription = watch('description')
  const proposalTitle = watch('title')

  const actionData = watch('actionData') || []

  return (
    <ProposalContentDisplay
      EntityDisplay={EntityDisplay}
      createdAt={new Date()}
      creator={{
        address: walletAddress,
        entity,
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
