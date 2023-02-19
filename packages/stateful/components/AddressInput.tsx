import { useEffect } from 'react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import {
  constSelector,
  useRecoilValueLoadable,
  useSetRecoilState,
  waitForAll,
} from 'recoil'

import {
  searchProfilesByNamePrefixSelector,
  walletHexPublicKeyOverridesAtom,
} from '@dao-dao/state/recoil'
import {
  AddressInput as StatelessAddressInput,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import { CHAIN_BECH32_PREFIX, isValidAddress } from '@dao-dao/utils'

import { pfpkProfileSelector } from '../recoil/selectors/profile'
import { EntityDisplay } from './EntityDisplay'

export const AddressInput = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>(
  props: AddressInputProps<FV, FieldName>
) => {
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
    hasFormValue
      ? searchProfilesByNamePrefixSelector({
          namePrefix: formValue,
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
      autofillProfiles={
        hasFormValue
          ? {
              hits:
                searchProfilesLoadable.state === 'hasValue'
                  ? searchProfilesLoadable.contents
                  : [],
              loading:
                searchProfilesLoadable.state === 'loading' ||
                (searchProfilesLoadable.state === 'hasValue' &&
                  searchProfilesLoadable.updating),
            }
          : undefined
      }
    />
  )
}
