import Fuse from 'fuse.js'
import { useMemo } from 'react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable, waitForAll } from 'recoil'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import {
  searchDaosSelector,
  searchProfilesByNamePrefixSelector,
} from '@dao-dao/state/recoil'
import {
  AddressInput as StatelessAddressInput,
  useCachedLoadable,
  useChain,
} from '@dao-dao/stateless'
import { AddressInputProps, Entity, EntityType } from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  getFallbackImage,
  isValidAddress,
  toBech32Hash,
} from '@dao-dao/utils'

import { walletProfileDataSelector } from '../recoil/selectors/profile'
import { EntityDisplay } from './EntityDisplay'

export const AddressInput = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>(
  props: AddressInputProps<FV, FieldName>
) => {
  const { chain_id: chainId } = useChain()
  const { t } = useTranslation()

  // Null if not within a FormProvider.
  const formContext = useFormContext<FV>()
  const watch = props.watch || formContext?.watch
  const formValue = watch?.(props.fieldName) as string | undefined

  const hasFormValue =
    formValue &&
    formValue.length >= 3 &&
    // Don't search name if it's an address.
    !isValidAddress(formValue, CHAIN_BECH32_PREFIX)

  const searchProfilesLoadable = useCachedLoadable(
    hasFormValue && props.type !== 'contract'
      ? searchProfilesByNamePrefixSelector({
          chainId,
          namePrefix: formValue,
        })
      : undefined
  )
  const searchDaosLoadable = useCachedLoadable(
    hasFormValue && props.type !== 'wallet'
      ? searchDaosSelector({
          query: formValue,
          limit: 5,
        })
      : undefined
  )

  // Get wallet profiles for the search results so we can use the correct images
  // for consistency (the wallet profile selector handles fallback images).
  const searchedProfilesLoadable = useRecoilValueLoadable(
    searchProfilesLoadable.state === 'hasValue'
      ? waitForAll(
          searchProfilesLoadable.contents.map(({ address }) =>
            walletProfileDataSelector({
              chainId,
              address,
            })
          )
        )
      : constSelector(undefined)
  )

  // Combine profiles and DAOs into a single array of entities.
  const entities: Entity[] =
    searchProfilesLoadable.state === 'hasValue' ||
    searchDaosLoadable.state === 'hasValue'
      ? [
          ...(searchProfilesLoadable.state === 'hasValue'
            ? searchProfilesLoadable.contents.map(
                ({ address, profile: { name, nft } }, index) => ({
                  type: EntityType.Wallet,
                  address,
                  name,
                  imageUrl:
                    // Use loaded profile image if available, and fallback to
                    // image from search, and fallback image otherwise.
                    (searchedProfilesLoadable.state === 'hasValue' &&
                      searchedProfilesLoadable.contents?.[index]?.profile
                        .imageUrl) ||
                    nft?.imageUrl ||
                    getFallbackImage(toBech32Hash(address)),
                })
              )
            : []),
          ...(searchDaosLoadable.state === 'hasValue'
            ? searchDaosLoadable.contents
                .filter(({ value }) => value?.config)
                .map(
                  ({
                    contractAddress,
                    value: {
                      config: { name, image_url },
                    },
                  }) => ({
                    type: EntityType.Dao,
                    address: contractAddress,
                    name,
                    imageUrl: image_url || getFallbackImage(contractAddress),
                  })
                )
            : []),
        ]
      : []

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
                      searchDaosLoadable.updating))),
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
