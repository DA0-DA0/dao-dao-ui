import { Check } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

export interface DaoStructureCardProps {
  Icon: ComponentType
  name: string
  description: string
  supplies: string
  membership: string
  selected: boolean
  onSelect: () => void
}

export const DaoStructureCard = ({
  Icon,
  name,
  description,
  supplies,
  membership,
  selected,
  onSelect,
}: DaoStructureCardProps) => {
  const { t } = useTranslation()

  return (
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

      <div className="flex h-40 items-center justify-center text-8xl">
        <Icon />
      </div>

      <div className="flex flex-row items-center justify-between border-y border-border-secondary py-4 px-6">
        <div className="space-y-1">
          <p className="secondary-text">{t('title.supplies')}</p>
          <p className="legend-text font-mono text-text-body">{supplies}</p>
        </div>

        <div className="h-6 w-[1px] bg-border-secondary"></div>

        <div className="space-y-1 text-right">
          <p className="secondary-text">{t('title.membership')}</p>
          <p className="legend-text font-mono text-text-body">{membership}</p>
        </div>
      </div>

      <div className="space-y-2 p-6 pt-4">
        <p className="primary-text text-text-body">{name}</p>
        <p className="body-text">{description}</p>
      </div>
    </div>
  )
}
