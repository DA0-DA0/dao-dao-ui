import { Check, Close, Edit } from '@mui/icons-material'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { averageColorSelector } from '@dao-dao/state/recoil'
import { ProfileCardWrapperProps } from '@dao-dao/types/stateless/ProfileCardWrapper'
import { formatDate, processError } from '@dao-dao/utils'

import { useCachedLoadable } from '../../hooks'
import { Button } from '../buttons'
import { CornerGradient } from '../CornerGradient'
import { IconButton } from '../icon_buttons'
import { TextInput } from '../inputs'
import { Loader } from '../logo/Loader'
import { ProfileImage } from './ProfileImage'

export * from '@dao-dao/types/stateless/ProfileCardWrapper'

export const ProfileCardWrapper = ({
  children,
  walletProfile,
  showUpdateProfileNft,
  updateProfileName,
  established,
  compact,
  underHeaderComponent,
  childContainerClassName,
}: ProfileCardWrapperProps) => {
  const { t } = useTranslation()

  // Get average color of image URL if in compact mode.
  const averageImgColorLoadable = useCachedLoadable(
    !compact || walletProfile.loading
      ? undefined
      : averageColorSelector(walletProfile.data.imageUrl)
  )
  const averageImgColor =
    averageImgColorLoadable.state === 'hasValue' &&
    averageImgColorLoadable.contents
      ? // If in #RRGGBB format, add ~20% opacity (0x33 = 51, 51/255 = 0.2).
        averageImgColorLoadable.contents +
        (averageImgColorLoadable.contents.length === 7 ? '33' : '')
      : undefined

  const canEdit = !walletProfile.loading && walletProfile.data.nonce >= 0

  return (
    <div className="relative rounded-lg border border-border-primary">
      {/* Absolutely positioned, against relative outer-most div (without padding). */}
      {compact && !!averageImgColor && (
        <CornerGradient className="h-36 opacity-50" color={averageImgColor} />
      )}

      <div className="p-6">
        {compact ? (
          <div className="flex flex-row items-stretch gap-3">
            <ProfileImage
              imageUrl={
                walletProfile.loading ? undefined : walletProfile.data.imageUrl
              }
              loading={walletProfile.loading}
              onEdit={canEdit ? showUpdateProfileNft : undefined}
              size="sm"
            />

            <div className="flex flex-col gap-1">
              <ProfileNameDisplayAndEditor
                canEdit={canEdit}
                compact={compact}
                updateProfileName={updateProfileName}
                walletProfile={walletProfile}
              />
              {underHeaderComponent}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-4">
            <ProfileImage
              className="mb-6"
              imageUrl={
                walletProfile.loading ? '' : walletProfile.data.imageUrl
              }
              loading={walletProfile.loading}
              onEdit={canEdit ? showUpdateProfileNft : undefined}
              size="lg"
            />
            <ProfileNameDisplayAndEditor
              canEdit={canEdit}
              className="mb-5"
              compact={compact}
              updateProfileName={updateProfileName}
              walletProfile={walletProfile}
            />
            {established && (
              <div className="caption-text -mt-3 mb-5 font-mono">
                {t('info.establishedAbbr')} {formatDate(established)}
              </div>
            )}
            {underHeaderComponent}
          </div>
        )}
      </div>

      <div
        className={clsx(
          'flex flex-col items-stretch border-t border-t-border-primary p-6',
          childContainerClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}

interface ProfileNameDisplayAndEditorProps
  extends Pick<
    ProfileCardWrapperProps,
    'compact' | 'walletProfile' | 'updateProfileName'
  > {
  canEdit: boolean
  className?: string
}

const ProfileNameDisplayAndEditor = ({
  compact,
  walletProfile,
  updateProfileName,
  canEdit,
  className,
}: ProfileNameDisplayAndEditorProps) => {
  const { t } = useTranslation()

  // If set, will show edit input.
  const [editingName, setEditingName] = useState<string | undefined>()
  const [savingName, setSavingName] = useState(false)

  const doUpdateName = useCallback(async () => {
    if (editingName === undefined || !canEdit) {
      return
    }

    setSavingName(true)
    try {
      // Empty names unset.
      await updateProfileName(editingName.trim() || null)
      // Stop editing on success.
      setEditingName(undefined)
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setSavingName(false)
    }
  }, [canEdit, editingName, updateProfileName])

  const noNameSet = !walletProfile.loading && walletProfile.data.name === null

  return (
    <div className={className}>
      {canEdit && editingName !== undefined ? (
        <div
          className={clsx(
            'relative mb-2 h-5',
            compact ? '' : 'mx-16 flex flex-col items-center'
          )}
        >
          <TextInput
            // Auto focus does not work on mobile Safari by design
            // (https://bugs.webkit.org/show_bug.cgi?id=195884#c4).
            autoFocus
            className={clsx(
              '!title-text border-b border-border-primary pb-1',
              !compact && 'text-center'
            )}
            ghost
            onInput={(event) =>
              setEditingName((event.target as HTMLInputElement).value)
            }
            onKeyDown={(event) =>
              event.key === 'Escape'
                ? setEditingName(undefined)
                : event.key === 'Enter'
                ? doUpdateName()
                : undefined
            }
            value={editingName}
          />

          <div className="absolute top-0 -right-12 bottom-0 flex flex-row items-center gap-1">
            {savingName ? (
              <Loader fill={false} size={16} />
            ) : (
              <IconButton
                Icon={Check}
                onClick={doUpdateName}
                size="xs"
                variant="ghost"
              />
            )}

            <IconButton
              Icon={Close}
              onClick={() => setEditingName(undefined)}
              size="xs"
              variant="ghost"
            />
          </div>
        </div>
      ) : (
        <Button
          className="group relative"
          disabled={!canEdit}
          onClick={() =>
            !walletProfile.loading &&
            setEditingName(walletProfile.data.name ?? '')
          }
          variant="none"
        >
          <p
            className={clsx(
              'title-text',
              walletProfile.loading && 'animate-pulse',
              noNameSet
                ? 'font-normal italic text-text-secondary'
                : 'text-text-body'
            )}
          >
            {walletProfile.loading
              ? '...'
              : noNameSet
              ? canEdit
                ? t('button.setDisplayName')
                : t('info.noDisplayName')
              : walletProfile.data.name}
          </p>

          {canEdit && (
            <Edit
              className={clsx(
                'absolute -right-6 !h-4 !w-6 pl-2 text-icon-secondary',
                !noNameSet &&
                  'opacity-0 transition-opacity group-hover:opacity-100'
              )}
            />
          )}
        </Button>
      )}
    </div>
  )
}
