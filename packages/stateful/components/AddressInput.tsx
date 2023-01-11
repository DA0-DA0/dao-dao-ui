import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable, waitForAll } from 'recoil'

import {
  pfpkProfileSelector,
  searchProfilesByNamePrefixSelector,
  walletHexPublicKeySelector,
} from '@dao-dao/state/recoil'
import {
  AddressInput as StatelessAddressInput,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'

import { ProfileDisplay } from './ProfileDisplay'

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

  const hasFormValue = formValue && formValue.length >= 3
  const searchProfilesLoadable = useCachedLoadable(
    hasFormValue
      ? searchProfilesByNamePrefixSelector({
          namePrefix: formValue,
        })
      : undefined
  )

  // Load individual profiles in background so they're cached/ready if selected.
  const publicKeysLoadable = useRecoilValueLoadable(
    searchProfilesLoadable.state === 'hasValue' &&
      searchProfilesLoadable.contents.length > 0
      ? waitForAll(
          searchProfilesLoadable.contents.map((hit) =>
            walletHexPublicKeySelector({
              walletAddress: hit.address,
            })
          )
        )
      : constSelector([])
  )
  useRecoilValueLoadable(
    publicKeysLoadable.state === 'hasValue' &&
      publicKeysLoadable.contents.length > 0
      ? waitForAll(
          publicKeysLoadable.contents
            .filter((publicKey): publicKey is string => !!publicKey)
            .map((publicKey) => pfpkProfileSelector(publicKey))
        )
      : constSelector(undefined)
  )

  return (
    <StatelessAddressInput<FV, FieldName>
      {...props}
      ProfileDisplay={props.ProfileDisplay || ProfileDisplay}
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
