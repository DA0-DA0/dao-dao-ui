import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useSupportedChainContext } from '@dao-dao/stateless'
import { ActionComponent, ActionContextType, ActionKey } from '@dao-dao/types'
import {
  getChainAddressForActionOptions,
  instantiateSmartContract,
  processError,
} from '@dao-dao/utils'

import { useWallet } from '../../../../hooks'
import { useActionOptions } from '../../../react'
import { InstantiateNftCollection as StatelessInstantiateNftCollection } from './stateless/InstantiateNftCollection'
import { MintNftData } from './types'

export const InstantiateNftCollection: ActionComponent = (props) => {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<MintNftData>()
  const options = useActionOptions()
  const {
    chainId,
    config: { codeIds },
  } = useSupportedChainContext()

  const [instantiating, setInstantiating] = useState(false)

  const { address: walletAddress, getSigningClient } = useWallet({
    chainId,
  })

  const instantiateData = watch(
    (props.fieldNamePrefix + 'instantiateData') as 'instantiateData'
  )

  const onInstantiate = async () => {
    if (!instantiateData) {
      toast.error(t('error.loadingData'))
      return
    }
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }
    const minter = getChainAddressForActionOptions(options, chainId)
    if (!codeIds.Cw721Base || !minter) {
      toast.error(t('error.invalidChain'))
      return
    }

    setInstantiating(true)
    try {
      const contractAddress = await instantiateSmartContract(
        getSigningClient,
        walletAddress,
        codeIds.Cw721Base,
        instantiateData.name,
        {
          minter,
          name: instantiateData.name,
          symbol: instantiateData.symbol,
        }
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
      if (props.isCreating && options.context.type === ActionContextType.Dao) {
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
      }}
    />
  )
}
