import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useSupportedChainContext } from '@dao-dao/stateless'
import { ActionComponent, ActionContextType, ActionKey } from '@dao-dao/types'
import { instantiateSmartContract, processError } from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { useWallet } from '../../../../hooks'
import { useActionOptions } from '../../../react'
import { InstantiateNftCollection as StatelessInstantiateNftCollection } from './stateless/InstantiateNftCollection'
import { MintNftData } from './types'

export const InstantiateNftCollection: ActionComponent = (props) => {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<MintNftData>()
  const { context } = useActionOptions()
  const { address: walletAddress, getSigningCosmWasmClient } = useWallet()

  const [instantiating, setInstantiating] = useState(false)

  const {
    chainId,
    config: { codeIds },
  } = useSupportedChainContext()

  const instantiateMsg = watch(
    (props.fieldNamePrefix + 'instantiateMsg') as 'instantiateMsg'
  )

  const onInstantiate = async () => {
    if (!instantiateMsg) {
      toast.error(t('error.loadingData'))
      return
    }

    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    const signingCosmWasmClient = await getSigningCosmWasmClient()

    setInstantiating(true)
    try {
      const contractAddress = await instantiateSmartContract(
        signingCosmWasmClient,
        walletAddress,
        codeIds.Cw721Base ? codeIds.Cw721Base : codeIds.Sg721Base ?? -1,
        'NFT Collection',
        instantiateMsg
      )

      // Update action form data with address.
      setValue(
        (props.fieldNamePrefix + 'collectionAddress') as 'collectionAddress',
        contractAddress,
        {
          shouldValidate: true,
        }
      )
      // Indicate that contract is ready.
      setValue(
        (props.fieldNamePrefix + 'contractChosen') as 'contractChosen',
        true,
        {
          shouldValidate: true,
        }
      )
      // Display success.
      toast.success(t('success.nftCollectionContractInstantiated'))

      // Add display NFT action if in a DAO.
      if (props.isCreating && context.type === ActionContextType.Dao) {
        props.addAction({
          actionKey: ActionKey.ManageCw721,
          data: {
            chainId,
            adding: true,
            address: contractAddress,
          },
        })
      }
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setInstantiating(false)
    }
  }

  return (
    <StatelessInstantiateNftCollection
      {...props}
      options={{
        instantiating,
        onInstantiate,
        AddressInput,
      }}
    />
  )
}
