import { Code, Wallet } from '@mui/icons-material'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { AddressInputProps } from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  getFallbackImage,
  isValidAddress,
} from '@dao-dao/utils'

import { Loader } from '../logo/Loader'
import { ProfileDisplay as StatelessProfileDisplay } from '../profile/ProfileDisplay'

export const AddressInput = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  fieldName,
  register,
  watch: _watch,
  setValue: _setValue,
  error,
  validation,
  onChange,
  disabled,
  required,
  className,
  containerClassName,
  type = 'wallet',
  ProfileDisplay,
  autofillProfiles,
  placeholder,
  ...rest
}: AddressInputProps<FV, FieldName>) => {
  const { t } = useTranslation()
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  const Icon = type === 'wallet' ? Wallet : Code

  // Null if not within a FormProvider.
  const formContext = useFormContext<FV>()
  const watch = _watch || formContext?.watch
  const setValue = _setValue || formContext?.setValue
  const formValue = watch?.(fieldName)

  const showProfile =
    ProfileDisplay &&
    !!formValue &&
    isValidAddress(formValue, CHAIN_BECH32_PREFIX)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref: registerRef, ...inputRegistration } = register(fieldName, {
    required: required && 'Required',
    validate,
    onChange,
  })

  const [inputFocused, setInputFocused] = useState(false)
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0)
  // Ensure selected index stays valid.
  useEffect(() => {
    setSelectedProfileIndex((prev) =>
      Math.min(prev, autofillProfiles?.hits.length ?? 0)
    )
  }, [autofillProfiles])

  // Only show profile auto fill dropdown if there are hits to show.
  const showProfileAutofill =
    inputFocused &&
    type === 'wallet' &&
    autofillProfiles &&
    autofillProfiles.hits.length > 0
  const selectAutofillProfile = useCallback(
    (index?: number) => {
      index ??= selectedProfileIndex

      if (
        !autofillProfiles ||
        index < 0 ||
        index >= autofillProfiles.hits.length
      ) {
        return
      }

      const selectedProfile = autofillProfiles.hits[index]
      setValue?.(fieldName, selectedProfile.address as any, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })

      inputRef.current?.blur()
    },
    [autofillProfiles, fieldName, selectedProfileIndex, setValue]
  )

  // Navigate between selected profiles with arrow keys.
  useEffect(() => {
    // If not showing profile autofill, do not process keypresses.
    if (!showProfileAutofill || !autofillProfiles) {
      return
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault()
          inputRef.current?.blur()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          setSelectedProfileIndex((index) =>
            index - 1 < 0
              ? autofillProfiles.hits.length - 1
              : // Just in case for some reason the index is overflowing.
                Math.min(index - 1, autofillProfiles.hits.length - 1)
          )
          break
        case 'ArrowRight':
        case 'ArrowDown':
        case 'Tab':
          event.preventDefault()
          setSelectedProfileIndex(
            // Just in case for some reason the index is underflowing.
            (index) => Math.max(index + 1, 0) % autofillProfiles.hits.length
          )
          break
        case 'Enter':
          event.preventDefault()
          selectAutofillProfile()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    // Clean up event listener on unmount.
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [autofillProfiles, selectAutofillProfile, showProfileAutofill])

  return (
    <div
      className={clsx(
        'secondary-text group relative flex items-center gap-3 rounded-md bg-transparent py-3 px-4 font-mono text-sm ring-1 transition-all focus-within:ring-2',
        error && !showProfileAutofill
          ? 'ring-border-interactive-error'
          : 'ring-border-primary focus:ring-border-interactive-focus',
        showProfileAutofill && 'rounded-b-none',
        containerClassName
      )}
    >
      {(disabled && showProfile) || (
        <>
          {/* If profiles are loading, display loader. */}
          {autofillProfiles?.loading ? (
            <Loader fill={false} size={20} />
          ) : (
            <Icon className="!h-5 !w-5" />
          )}

          <input
            className={clsx(
              'ring-none body-text w-full border-none bg-transparent outline-none',
              // Change font to mono when address is valid.
              isValidAddress(formValue, CHAIN_BECH32_PREFIX)
                ? 'font-mono'
                : 'font-sans',
              className
            )}
            disabled={disabled}
            placeholder={
              placeholder ||
              // If contract, use chain prefix. Otherwise, for a wallet, suggest
              // typing in a profile name.
              (type === 'contract'
                ? `${CHAIN_BECH32_PREFIX}...`
                : t('form.addressInputPlaceholder'))
            }
            type="text"
            {...rest}
            {...inputRegistration}
            onBlur={
              // Timeout to allow click event to happen on profile autofill row.
              () => setTimeout(() => setInputFocused(false), 100)
            }
            onFocus={() => setInputFocused(true)}
            ref={(ref) => {
              registerRef(ref)
              inputRef.current = ref
            }}
          />
        </>
      )}
      {showProfile && (
        <div className={clsx(disabled || 'pl-4')}>
          <ProfileDisplay address={formValue} />
        </div>
      )}

      {type === 'wallet' && !!autofillProfiles && (
        <div
          className={clsx(
            'absolute top-full -left-[2px] -right-[2px] z-10 mt-[2px] overflow-hidden rounded-b-md border-2 border-t-0 border-border-primary bg-component-dropdown transition-all',
            showProfileAutofill
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          )}
        >
          <div className="no-scrollbar flex h-full max-h-80 flex-col overflow-y-auto">
            {autofillProfiles.hits.map((hit, index) => (
              <div
                key={hit.publicKey}
                className={clsx(
                  'cursor-pointer py-3 pl-4 pr-[6px] transition-all hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
                  selectedProfileIndex === index &&
                    'bg-background-interactive-selected'
                )}
                onClick={() => selectAutofillProfile(index)}
              >
                <StatelessProfileDisplay
                  key={hit.publicKey}
                  address={hit.address}
                  className="!gap-3"
                  copyToClipboardProps={{
                    textClassName: 'no-underline',
                    tooltip: hit.address,
                  }}
                  loadingProfile={{
                    loading: false,
                    data: {
                      address: hit.address,
                      name: hit.profile.name,
                      imageUrl:
                        hit.profile.nft?.imageUrl ||
                        getFallbackImage(hit.publicKey),
                    },
                  }}
                  noCopy
                  noImageTooltip
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
