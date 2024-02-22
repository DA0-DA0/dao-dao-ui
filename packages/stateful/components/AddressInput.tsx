import Fuse from 'fuse.js'
import { useMemo } from 'react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { waitForNone } from 'recoil'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import {
  searchDaosSelector,
  searchProfilesByNamePrefixSelector,
} from '@dao-dao/state/recoil'
import {
  AddressInput as StatelessAddressInput,
  useCachedLoadable,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { AddressInputProps, Entity, EntityType } from '@dao-dao/types'
import {
  POLYTONE_CONFIG_PER_CHAIN,
  getAccountAddress,
  isValidBech32Address,
} from '@dao-dao/utils'

import { entitySelector } from '../recoil'
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

  const searchProfilesLoadable = useCachedLoadable(
    hasFormValue && props.type !== 'contract'
      ? searchProfilesByNamePrefixSelector({
          chainId: currentChain.chain_id,
          namePrefix: formValue,
        })
      : undefined
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

  const loadingEntities = useCachedLoading(
    waitForNone([
      ...(searchProfilesLoadable.state === 'hasValue'
        ? searchProfilesLoadable.contents.map(({ address }) =>
            entitySelector({
              address,
              chainId: currentChain.chain_id,
            })
          )
        : []),
      ...(searchDaosLoadable.state === 'hasValue'
        ? searchDaosLoadable.contents.flatMap((loadable) =>
            loadable.state === 'hasValue'
              ? loadable.contents.map(({ chainId, id: address }) =>
                  entitySelector({
                    chainId,
                    address,
                  })
                )
              : []
          )
        : []),
    ]),
    []
  )

  const entities = loadingEntities.loading
    ? []
    : // Only show entities that are on the current chain or are DAOs with
      // accounts (polytone probably) on the current chain.
      loadingEntities.data
        .filter(
          (entity) =>
            entity.state === 'hasValue' &&
            (entity.contents.chainId === currentChain.chain_id ||
              (entity.contents.type === EntityType.Dao &&
                getAccountAddress({
                  accounts: entity.contents.daoInfo.accounts,
                  chainId: currentChain.chain_id,
                })))
        )
        .map((entity) => entity.contents as Entity)

  // Use Fuse to search combined profiles and DAOs by name so that is most
  // relevant (as opposed to just sticking DAOs after profiles).
  const fuse = useMemo(
    () => new Fuse(entities, { keys: ['name'] }),
    // Only reinstantiate fuse when entities deeply changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useDeepCompareMemoize([entities])
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
                  (searchProfilesLoadable.state === 'loading' ||
                    (searchProfilesLoadable.state === 'hasValue' &&
                      searchProfilesLoadable.updating))) ||
                (props.type !== 'wallet' &&
                  (searchDaosLoadable.state === 'loading' ||
                    (searchDaosLoadable.state === 'hasValue' &&
                      (searchDaosLoadable.updating ||
                        searchDaosLoadable.contents.some(
                          (loadable) => loadable.state === 'loading'
                        ))))) ||
                loadingEntities.loading ||
                !!loadingEntities.updating ||
                loadingEntities.data.some(
                  (loadable) => loadable.state === 'loading'
                ),
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
