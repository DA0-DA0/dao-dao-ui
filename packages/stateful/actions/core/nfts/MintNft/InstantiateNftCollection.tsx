import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Button, useSupportedChainContext } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ChainId,
} from '@dao-dao/types'
import { instantiateSmartContract, processError } from '@dao-dao/utils'

import { Trans } from '../../../../components'
import { useWallet } from '../../../../hooks'
import { useActionForKey, useActionOptions } from '../../../react'
import { InstantiateNftCollection as StatelessInstantiateNftCollection } from './stateless/InstantiateNftCollection'
import { MintNftData } from './types'

export const InstantiateNftCollection: ActionComponent = (props) => {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<MintNftData>()
  const {
    context,
    chain: { chain_id: nativeChainId },
    address,
  } = useActionOptions()

  const [instantiating, setInstantiating] = useState(false)

  const {
    chainId,
    config: { codeIds },
  } = useSupportedChainContext()

  const { address: walletAddress, getSigningCosmWasmClient } = useWallet({
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

    if (!codeIds.Cw721Base) {
      toast.error(t('error.invalidChain'))
      return
    }

    const signingCosmWasmClient = await getSigningCosmWasmClient()

    setInstantiating(true)
    try {
      const minter =
        context.type !== ActionContextType.Dao || nativeChainId === chainId
          ? address
          : context.info.polytoneProxies[chainId] ?? ''

      const contractAddress = await instantiateSmartContract(
        signingCosmWasmClient,
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

  const createNftCollectionActionDefaults = useActionForKey(
    ActionKey.CreateNftCollection
  )?.action.useDefaults()

  return chainId === ChainId.StargazeMainnet ||
    chainId === ChainId.StargazeTestnet ? (
    <>
      <p className="primary-text max-w-prose">
        {t('info.stargazeCreateCollectionFirst')}
      </p>

      <Button
        onClick={() => {
          props.addAction?.(
            {
              actionKey: ActionKey.CreateNftCollection,
              data: createNftCollectionActionDefaults,
            },
            props.index
          )

          props.remove?.()
        }}
      >
        {t('button.createNftCollection')}
      </Button>
    </>
  ) : (
    <StatelessInstantiateNftCollection
      {...props}
      options={{
        instantiating,
        onInstantiate,
        Trans,
      }}
    />
  )
}
