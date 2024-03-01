import { Check, InfoOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ProfileAddChainsForm, ProfileAddChainsProps } from '@dao-dao/types'

import { Button } from '../buttons'
import { ChainLabel } from '../chain'
import { FormCheckbox } from '../inputs'
import { Loader } from '../logo'
import { ChainPickerPopup } from '../popup'

export const ProfileAddChains = ({
  prompt,
  promptTooltip,
  promptClassName,
  disabled,
  chains,
  onAddChains,
  status,
  size = 'default',
  onlySupported = false,
  autoAdd = false,
  className,
}: ProfileAddChainsProps) => {
  const { t } = useTranslation()

  const { control, watch, setValue, handleSubmit } =
    useFormContext<ProfileAddChainsForm>()
  const chainsBeingAdded = watch('chains')
  const { append: appendChain } = useFieldArray({
    control,
    name: 'chains',
  })

  return (
    <form
      className={clsx(
        'flex flex-col',
        {
          'gap-8': size === 'default',
          'gap-4': size === 'sm',
        },
        className
      )}
      onSubmit={onAddChains && handleSubmit(onAddChains)}
    >
      {/* TODO(profile-refactor): suggested chains */}

      <ChainPickerPopup
        chains={{
          type: onlySupported ? 'supported' : 'configured',
          excludeChainIds: [
            ...(chains.loading
              ? []
              : chains.data.map(({ chainId }) => chainId)),
            ...chainsBeingAdded.map(({ chainId }) => chainId),
          ],
        }}
        onSelect={(chainId) => {
          // Type-check. None option is disabled so should not be possible.
          if (!chainId || chainsBeingAdded.some((c) => c.chainId === chainId)) {
            return
          }

          appendChain({
            chainId,
            checked: true,
            status: 'idle',
          })

          if (onAddChains && autoAdd) {
            handleSubmit(onAddChains)()
          }
        }}
        trigger={{
          type: 'button',
          tooltip: promptTooltip,
          props: {
            className: 'self-start',
            contentContainerClassName: clsx('!secondary-text', promptClassName),
            variant: 'underline',
            children: (
              <>
                {!!promptTooltip && (
                  // Show info icon to indicate tooltip is available.
                  <InfoOutlined className="!h-4 !w-4 !text-icon-secondary" />
                )}

                {prompt}
              </>
            ),
            disabled,
          },
        }}
      />

      {chainsBeingAdded.length > 0 && (
        <div
          className={clsx(
            'flex max-w-sm flex-col rounded-md bg-background-tertiary',
            {
              'gap-4 p-4': size === 'sm',
              'gap-6 p-6': size === 'default',
            }
          )}
        >
          <div className="space-y-3">
            {chainsBeingAdded.map(({ chainId, checked, status }, index) => (
              <div
                key={chainId}
                className={clsx('flex cursor-pointer flex-row items-center', {
                  'gap-3': size === 'sm',
                  'gap-4': size === 'default',
                })}
                onClick={() => setValue(`chains.${index}.checked`, !checked)}
              >
                {status === 'idle' ? (
                  <FormCheckbox
                    fieldName={`chains.${index}.checked`}
                    setValue={setValue}
                    size={size}
                    value={checked}
                  />
                ) : status === 'loading' ? (
                  <div className="p-0.5">
                    <Loader fill={false} size={size === 'sm' ? 16 : 20} />
                  </div>
                ) : status === 'done' ? (
                  <Check
                    className={clsx(
                      '!text-icon-brand',
                      size === 'sm' ? '!h-5 !w-5' : '!h-6 !w-6'
                    )}
                  />
                ) : null}

                <ChainLabel chainId={chainId} />
              </div>
            ))}
          </div>

          <Button
            center
            disabled={
              status === 'chains' ||
              !onAddChains ||
              chainsBeingAdded.every((c) => !c.checked)
            }
            loading={status === 'registering'}
            type="submit"
            variant="brand"
          >
            {t('button.addChains')}
          </Button>
        </div>
      )}
    </form>
  )
}
