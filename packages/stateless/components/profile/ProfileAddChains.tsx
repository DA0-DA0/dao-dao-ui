import { Add, Check, Close, InfoOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ProfileAddChainsForm, ProfileAddChainsProps } from '@dao-dao/types'

import { Button } from '../buttons'
import { ChainLabel } from '../chain'
import { IconButton } from '../icon_buttons'
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
  textPrompt = false,
  className,
}: ProfileAddChainsProps) => {
  const { t } = useTranslation()

  const { control, watch, handleSubmit } =
    useFormContext<ProfileAddChainsForm>()
  const chainsBeingAdded = watch('chains')
  const { append: appendChain, remove: removeChain } = useFieldArray({
    control,
    name: 'chains',
  })

  const formActive = chainsBeingAdded.length > 0

  return (
    <form
      className={clsx(
        'flex flex-col transition-all bg-transparent rounded-none',
        {
          'gap-4': size === 'sm',
          'gap-6': size === 'default',
        },
        formActive && [
          '!bg-background-tertiary !rounded-md w-full max-w-[14rem]',
          {
            'p-4': size === 'sm',
            'p-6': size === 'default',
          },
        ],
        className
      )}
      onSubmit={onAddChains && handleSubmit(onAddChains)}
    >
      {formActive && (
        <div
          className={clsx('animate-fade-in', {
            'space-y-3': size === 'sm',
            'space-y-4': size === 'default',
          })}
        >
          {chainsBeingAdded.map(({ chainId, status }, index) => (
            <div
              key={chainId}
              className={clsx('flex flex-row items-center justify-between', {
                'gap-2': size === 'sm',
                'gap-3': size === 'default',
              })}
            >
              <ChainLabel chainId={chainId} />

              {status === 'idle' ? (
                <IconButton
                  Icon={Close}
                  onClick={() => removeChain(index)}
                  size="xs"
                  variant="ghost"
                />
              ) : status === 'loading' ? (
                <div className="p-0.5">
                  <Loader fill={false} size={16} />
                </div>
              ) : status === 'done' ? (
                <Check
                  className={clsx('!text-icon-brand', {
                    '!h-4 !w-4': size === 'sm',
                    '!h-5 !w-5': size === 'default',
                  })}
                />
              ) : null}
            </div>
          ))}
        </div>
      )}

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
            status: 'idle',
          })

          if (onAddChains && autoAdd) {
            handleSubmit(onAddChains)()
          }
        }}
        trigger={
          chainsBeingAdded.length === 0
            ? {
                type: 'button',
                tooltip: promptTooltip,
                props: {
                  className: 'self-end',
                  contentContainerClassName: clsx(
                    textPrompt && '!secondary-text',
                    promptClassName
                  ),
                  children: (
                    <>
                      {!!promptTooltip && (
                        // Show info icon to indicate tooltip is available.
                        <InfoOutlined
                          className={clsx(
                            '!h-4 !w-4',
                            textPrompt && '!text-icon-secondary'
                          )}
                        />
                      )}

                      {prompt}
                    </>
                  ),
                  variant: textPrompt ? 'none' : 'brand',
                  size: 'lg',
                  disabled,
                },
              }
            : {
                type: 'icon_button',
                props: {
                  // Round to match checkbox.
                  className: clsx('self-end !rounded', {
                    '-mt-1': size === 'sm',
                    '-mt-3': size === 'default',
                  }),
                  Icon: Add,
                  variant: 'primary',
                  size: 'xs',
                  disabled: status !== 'idle',
                },
              }
        }
      />

      {formActive && (
        <Button
          center
          className="animate-fade-in"
          disabled={status === 'chains' || !onAddChains}
          loading={status === 'registering'}
          type="submit"
          variant="brand"
        >
          {t('button.addChains')}
        </Button>
      )}
    </form>
  )
}
