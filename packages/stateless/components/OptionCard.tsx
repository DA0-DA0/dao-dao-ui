import { Check } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonLink } from './buttons/ButtonLink'
import { MarkdownRenderer } from './MarkdownRenderer'

export interface OptionCardProps {
  Icon: ComponentType
  name: string
  description?: string
  readMoreUrl?: string
  selected?: boolean
  onSelect?: () => void
  // Read only mode removes the selection handling and displays a responsive
  // horizontal card.
  readOnly?: boolean
}

export const OptionCard = ({
  Icon,
  name,
  description,
  readMoreUrl,
  selected,
  onSelect,
  readOnly,
}: OptionCardProps) => {
  const { t } = useTranslation()

  return readOnly ? (
    <div className="flex flex-col items-center gap-x-12 gap-y-4 rounded-lg bg-background-secondary p-6 sm:flex-row sm:justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-6xl">
          <Icon />
        </div>

        <p className="header-text font-normal text-text-body">{name}</p>
      </div>

      {(description || readMoreUrl) && (
        <div className="flex grow flex-col gap-2 self-start sm:self-center">
          {description && (
            <MarkdownRenderer className="text-base" markdown={description} />
          )}

          {readMoreUrl && (
            <ButtonLink href={readMoreUrl} variant="underline">
              {t('button.readMore')}
            </ButtonLink>
          )}
        </div>
      )}
    </div>
  ) : (
    <div
      className={clsx(
        'relative cursor-pointer rounded-lg border-2 transition',
        selected
          ? 'border-border-interactive-focus bg-background-interactive-hover'
          : 'border-[transparent] bg-background-secondary'
      )}
      onClick={onSelect}
    >
      <div
        className={clsx(
          'absolute top-5 left-5 h-5 w-5 rounded-full border border-border-primary transition',
          selected
            ? 'flex items-center justify-center bg-component-pill'
            : 'bg-background-primary'
        )}
      >
        <Check
          className={clsx(
            '!h-4 !w-4 text-icon-primary transition',
            selected ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 p-6 pt-4">
        <div className="text-6xl">
          <Icon />
        </div>

        <p className="primary-text text-text-body">{name}</p>

        {description && (
          <MarkdownRenderer className="self-start" markdown={description} />
        )}

        {readMoreUrl && (
          <ButtonLink
            containerClassName="self-start"
            href={readMoreUrl}
            variant="underline"
          >
            {t('button.readMore')}
          </ButtonLink>
        )}
      </div>
    </div>
  )
}
