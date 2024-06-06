import { useQueries, useQueryClient } from '@tanstack/react-query'
import Fuse from 'fuse.js'
import { useMemo } from 'react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { waitForNone } from 'recoil'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import { profileQueries } from '@dao-dao/state/query'
import { searchDaosSelector } from '@dao-dao/state/recoil'
import {
  AddressInput as StatelessAddressInput,
  useCachedLoadable,
  useChain,
} from '@dao-dao/stateless'
import { AddressInputProps, Entity, EntityType } from '@dao-dao/types'
import {
  POLYTONE_CONFIG_PER_CHAIN,
  getAccountAddress,
  isValidBech32Address,
  makeCombineQueryResultsIntoLoadingData,
} from '@dao-dao/utils'

import { useQueryLoadingDataWithError } from '../hooks'
import { entityQueries } from '../queries/entity'
import { EntityDisplay } from './EntityDisplay'

export const AddressInput = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>(
  props: AddressInputProps<FV, FieldName>
) => {
  const currentChain = useChain()
  const { t } = useTranslation()

  // Null if not within a FormProvider.
  const formContext = useFormContext<FV>()
  const watch = props.watch || formContext?.watch
  const formValue = watch?.(props.fieldName) as string | undefined

  const hasFormValue =
    formValue &&
    formValue.length >= 3 &&
    // Don't search name if it's an address.
    !isValidBech32Address(formValue, currentChain.bech32_prefix)

  const searchProfilesLoading = useQueryLoadingDataWithError(
    profileQueries.searchByNamePrefix(
      hasFormValue && props.type !== 'contract'
        ? {
            chainId: currentChain.chain_id,
            namePrefix: formValue,
          }
        : undefined
    )
  )

  // Search DAOs on current chains and all polytone-connected chains so we can
  // find polytone accounts.
  const searchDaosLoadable = useCachedLoadable(
    hasFormValue && props.type !== 'wallet'
      ? waitForNone(
          [
            // Current chain.
            currentChain.chain_id,
            // Chains that have polytone connections with the current chain.
            ...POLYTONE_CONFIG_PER_CHAIN.filter(([, destChains]) =>
              Object.keys(destChains).includes(currentChain.chain_id)
            ).map(([chainId]) => chainId),
          ].map((chainId) =>
            searchDaosSelector({
              chainId,
              query: formValue,
              limit: 5,
            })
          )
        )
      : undefined
  )

  const queryClient = useQueryClient()
  const loadingEntities = useQueries({
    queries: [
      ...(!searchProfilesLoading.loading && !searchProfilesLoading.errored
        ? searchProfilesLoading.data.map(({ address }) =>
            entityQueries.info(queryClient, {
              chainId: currentChain.chain_id,
              address,
            })
          )
        : []),
      ...(searchDaosLoadable.state === 'hasValue'
        ? searchDaosLoadable.contents.flatMap((loadable) =>
            loadable.state === 'hasValue'
              ? loadable.contents.map(({ chainId, id: address }) =>
                  entityQueries.info(queryClient, {
                    chainId,
                    address,
                  })
                )
              : []
          )
        : []),
    ],
    combine: useMemo(
      () =>
        makeCombineQueryResultsIntoLoadingData<Entity>({
          firstLoad: 'none',
          transform: (entities) =>
            // Only show entities that are on the current chain or are DAOs with
            // accounts (polytone probably) on the current chain.
            entities.filter(
              (entity) =>
                entity.chainId === currentChain.chain_id ||
                (entity.type === EntityType.Dao &&
                  getAccountAddress({
                    accounts: entity.daoInfo.accounts,
                    chainId: currentChain.chain_id,
                  }))
            ),
        }),
      [currentChain.chain_id]
    ),
  })

  // Use Fuse to search combined profiles and DAOs by name so that is most
  // relevant (as opposed to just sticking DAOs after profiles).
  const fuse = useMemo(
    () =>
      new Fuse(loadingEntities.loading ? [] : loadingEntities.data, {
        keys: ['name'],
      }),
    // Only reinstantiate fuse when entities deeply changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useDeepCompareMemoize([loadingEntities])
  )
  const searchedEntities = useMemo(
    () => (hasFormValue ? fuse.search(formValue).map(({ item }) => item) : []),
    [formValue, fuse, hasFormValue]
  )

  return (
    <StatelessAddressInput<FV, FieldName>
      {...props}
      EntityDisplay={props.EntityDisplay || EntityDisplay}
      autoComplete="off"
      autofillEntities={
        hasFormValue
          ? {
              entities: searchedEntities,
              loading:
                (props.type !== 'contract' &&
                  (searchProfilesLoading.loading ||
                    (!searchProfilesLoading.errored &&
                      searchProfilesLoading.updating))) ||
                (props.type !== 'wallet' &&
                  (searchDaosLoadable.state === 'loading' ||
                    (searchDaosLoadable.state === 'hasValue' &&
                      (searchDaosLoadable.updating ||
                        searchDaosLoadable.contents.some(
                          (loadable) => loadable.state === 'loading'
                        ))))) ||
                loadingEntities.loading ||
                !!loadingEntities.updating,
            }
          : undefined
      }
      placeholder={
        props.placeholder ||
        t('form.addressInputPlaceholder', { context: props.type || 'any' })
      }
    />
  )
}
