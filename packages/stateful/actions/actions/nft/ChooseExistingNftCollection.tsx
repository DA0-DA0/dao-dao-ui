import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilCallback } from 'recoil'

import { Cw721BaseSelectors, DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { useCachedLoadable } from '@dao-dao/stateless'
import { ActionComponent, ActionContextType } from '@dao-dao/types'
import { objectMatchesStructure, processError } from '@dao-dao/utils'

import { ChooseExistingNftCollection as StatelessChooseExistingNftCollection } from '../../components/nft'
import { useActionOptions } from '../../react'

export const ChooseExistingNftCollection: ActionComponent = (props) => {
  const { context, address, chainId, t } = useActionOptions()
  const { watch, setValue, setError, clearErrors, trigger } = useFormContext()

  const collectionAddress: string | undefined = watch(
    props.fieldNamePrefix + 'collectionAddress'
  )

  // If in DAO context, get cw721 collections for which the DAO is the minter.
  // If in wallet context, can't check so return undefined to trigger infinite
  // loading state and load nothing.
  const existingCollectionsLoadable = useCachedLoadable(
    context.type === ActionContextType.Dao
      ? DaoCoreV2Selectors.allCw721CollectionsWithDaoAsMinterSelector({
          contractAddress: address,
          chainId,
        })
      : undefined
  )

  const [chooseLoading, setChooseLoading] = useState(false)
  const onChooseExistingContract = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setChooseLoading(true)
        try {
          clearErrors(props.fieldNamePrefix + 'collectionAddress')

          // Manually validate the contract address.
          const valid = await trigger(
            props.fieldNamePrefix + 'collectionAddress'
          )
          if (!valid) {
            // Error will be set by trigger.
            return
          }

          // Should never happen due to validation above; just typecheck.
          if (!collectionAddress) {
            throw new Error(t('error.loadingData'))
          }

          // Verify contract exists and looks like a cw721 contract.
          let info
          try {
            info = await snapshot.getPromise(
              Cw721BaseSelectors.contractInfoSelector({
                contractAddress: collectionAddress,
                chainId,
                params: [],
              })
            )
          } catch (err) {
            console.error(err)

            // If query failed, different contract.
            if (
              err instanceof Error &&
              err.message.includes('Query failed') &&
              err.message.includes('unknown variant')
            ) {
              throw new Error(t('error.notAnNftCollectionAddress'))
            }

            // If unrecognized error, rethrow.
            throw err
          }

          // Verify info response looks correct.
          if (
            !objectMatchesStructure(info, {
              name: {},
              symbol: {},
            })
          ) {
            throw new Error(t('error.notAnNftCollectionAddress'))
          }

          // Indicate contract is ready and store name/symbol for display.
          setValue(props.fieldNamePrefix + 'instantiateMsg', {
            // Clone to avoid mutating original.
            ...info,
          })
          setValue(props.fieldNamePrefix + 'contractChosen', true, {
            shouldValidate: true,
          })
        } catch (err) {
          console.error(err)
          setError(props.fieldNamePrefix + 'collectionAddress', {
            type: 'custom',
            message:
              err instanceof Error ? err.message : `${processError(err)}`,
          })
          return
        } finally {
          setChooseLoading(false)
        }
      },
    [
      trigger,
      props.fieldNamePrefix,
      setValue,
      collectionAddress,
      setError,
      clearErrors,
      setChooseLoading,
    ]
  )

  return (
    <StatelessChooseExistingNftCollection
      {...props}
      options={{
        chooseLoading,
        onChooseExistingContract,
        existingCollections:
          existingCollectionsLoadable.state === 'hasValue'
            ? existingCollectionsLoadable.contents
            : [],
      }}
    />
  )
}
