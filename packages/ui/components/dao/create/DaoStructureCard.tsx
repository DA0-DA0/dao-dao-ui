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
        'relative rounded-lg border-2 transition cursor-pointer',
        selected
          ? 'bg-background-interactive-hover border-border-interactive-focus'
          : 'bg-background-secondary border-[transparent]'
      )}
      onClick={onSelect}
    >
      <div
        className={clsx(
          'absolute top-5 left-5 w-5 h-5 rounded-full border border-border-primary transition',
          selected
            ? 'flex justify-center items-center bg-component-pill'
            : 'bg-background-primary'
        )}
      >
        <Check
          className={clsx(
            '!w-4 !h-4 text-icon-primary transition',
            selected ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>

      <div className="flex justify-center items-center h-40 text-8xl">
        <Icon />
      </div>

      <div className="flex flex-row justify-between items-center py-4 px-6 border-y border-border-secondary">
        <div className="space-y-1">
          <p className="secondary-text">{t('title.supplies')}</p>
          <p className="font-mono text-text-body legend-text">{supplies}</p>
        </div>

        <div className="w-[1px] h-6 bg-border-secondary"></div>

        <div className="space-y-1 text-right">
          <p className="secondary-text">{t('title.membership')}</p>
          <p className="font-mono text-text-body legend-text">{membership}</p>
        </div>
      </div>

      <div className="p-6 pt-4 space-y-2">
        <p className="text-text-body primary-text">{name}</p>
        <p className="body-text">{description}</p>
      </div>
    </div>
  )
}
