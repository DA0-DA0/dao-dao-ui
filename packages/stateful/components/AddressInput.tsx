import { useEffect } from 'react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValueLoadable,
  useSetRecoilState,
  waitForAll,
} from 'recoil'

import {
  searchDaosSelector,
  searchProfilesByNamePrefixSelector,
  walletHexPublicKeyOverridesAtom,
} from '@dao-dao/state/recoil'
import {
  AddressInput as StatelessAddressInput,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { AddressInputProps, EntityType } from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  getFallbackImage,
  isValidAddress,
} from '@dao-dao/utils'

import { pfpkProfileSelector } from '../recoil/selectors/profile'
import { EntityDisplay } from './EntityDisplay'

export const AddressInput = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>(
  props: AddressInputProps<FV, FieldName>
) => {
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

  // Cache searched profiles public keys in background so they're ready if
  // selected. We cannot retrieve the public key for an address without the
  // account existing on chain. If we're on a chain the user hasn't used before,
  // their profile won't actually load in the `EntityDisplay` component.
  // Profile search uses names and public keys, but `EntityDisplay` needs to
  // extract the public key from the address. Thus, we can precache the searched
  // profiles even if they don't exist on the current chain.
  const setWalletHexPublicKeyOverrides = useSetRecoilState(
    walletHexPublicKeyOverridesAtom
  )
  useEffect(() => {
    if (
      searchProfilesLoadable.state === 'hasValue' &&
      searchProfilesLoadable.contents.length > 0
    ) {
      setWalletHexPublicKeyOverrides((prev) =>
        searchProfilesLoadable.contents.reduce(
          (acc, { publicKey, address }) => ({
            ...acc,
            [address]: publicKey,
          }),
          prev
        )
      )
    }
  }, [searchProfilesLoadable, setWalletHexPublicKeyOverrides])

  useRecoilValueLoadable(
    searchProfilesLoadable.state === 'hasValue' &&
      searchProfilesLoadable.contents.length > 0
      ? waitForAll(
          searchProfilesLoadable.contents.map(({ publicKey }) =>
            pfpkProfileSelector(publicKey)
          )
        )
      : constSelector(undefined)
  )

  return (
    <StatelessAddressInput<FV, FieldName>
      {...props}
      EntityDisplay={props.EntityDisplay || EntityDisplay}
      autoComplete="off"
      autofillEntities={
        hasFormValue
          ? {
              hits:
                searchProfilesLoadable.state === 'hasValue' ||
                searchDaosLoadable.state === 'hasValue'
                  ? [
                      ...(searchProfilesLoadable.state === 'hasValue'
                        ? searchProfilesLoadable.contents.map(
                            ({ publicKey, address, profile }) => ({
                              type: EntityType.Wallet,
                              address,
                              name: profile.name,
                              imageUrl:
                                profile.nft?.imageUrl ||
                                getFallbackImage(publicKey),
                            })
                          )
                        : []),
                      ...(searchDaosLoadable.state === 'hasValue'
                        ? searchDaosLoadable.contents
                            .filter(
                              ({ value }) =>
                                value?.config && value.proposalCount
                            )
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
                                imageUrl:
                                  image_url ||
                                  getFallbackImage(contractAddress),
                              })
                            )
                        : []),
                    ]
                  : [],
              loading:
                searchProfilesLoadable.state === 'loading' ||
                (searchProfilesLoadable.state === 'hasValue' &&
                  searchProfilesLoadable.updating) ||
                searchDaosLoadable.state === 'loading' ||
                (searchDaosLoadable.state === 'hasValue' &&
                  searchDaosLoadable.updating),
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
