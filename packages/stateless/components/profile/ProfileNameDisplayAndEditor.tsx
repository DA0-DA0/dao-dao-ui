import { Check, Close, Edit } from '@mui/icons-material'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { WalletProfileData } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import { Button } from '../buttons'
import { IconButton } from '../icon_buttons'
import { TextInput } from '../inputs'
import { Loader } from '../logo'

export type ProfileNameDisplayAndEditorProps = {
  walletProfileData: WalletProfileData
  compact?: boolean
  updateProfileName: (name: string | null) => Promise<void>
  className?: string
  nameClassName?: string
  editingContainerClassName?: string
}

export const ProfileNameDisplayAndEditor = ({
  compact,
  walletProfileData,
  updateProfileName,
  className,
  nameClassName = '!title-text',
  editingContainerClassName,
}: ProfileNameDisplayAndEditorProps) => {
  const { t } = useTranslation()

  const canEdit = walletProfileData.profile.nonce >= 0

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

  const noNameSet =
    !walletProfileData.loading && walletProfileData.profile.name === null

  return (
    <div className={className}>
      {canEdit && editingName !== undefined ? (
        <div
          className={clsx(
            'relative mb-2',
            compact ? '' : 'mx-16 flex flex-col items-center',
            editingContainerClassName
          )}
        >
          <TextInput
            // Auto focus does not work on mobile Safari by design
            // (https://bugs.webkit.org/show_bug.cgi?id=195884#c4).
            autoFocus
            className={clsx(
              'border-b border-border-primary pb-1',
              !compact && 'text-center',
              nameClassName
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
            !walletProfileData.loading &&
            setEditingName(walletProfileData.profile.name ?? '')
          }
          variant="none"
        >
          <p
            className={clsx(
              walletProfileData.loading && 'animate-pulse',
              noNameSet
                ? 'font-normal italic text-text-secondary'
                : 'text-text-body',
              nameClassName
            )}
          >
            {walletProfileData.loading
              ? '...'
              : noNameSet
              ? canEdit
                ? t('button.setDisplayName')
                : t('info.noDisplayName')
              : walletProfileData.profile.name}
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
