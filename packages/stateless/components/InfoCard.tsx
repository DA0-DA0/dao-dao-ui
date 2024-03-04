import { Check, InfoOutlined, WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'

import { Loader } from './logo'

export type InfoCardProps = {
  content: string
  style?: 'info' | 'loading' | 'success' | 'warning'
  className?: string
  textClassName?: string
}

export const InfoCard = ({
  content,
  style = 'info',
  className,
  textClassName,
}: InfoCardProps) => (
  <div
    className={clsx(
      'flex flex-row items-center gap-3 rounded-md bg-background-tertiary p-4',
      className
    )}
  >
    {style === 'info' && (
      <InfoOutlined className="!h-6 !w-6 text-icon-secondary" />
    )}
    {style === 'success' && <Check className="!h-6 !w-6 text-icon-secondary" />}
    {style === 'loading' && <Loader fill={false} size={24} />}
    {style === 'warning' && (
      <WarningRounded className="!h-6 !w-6 text-icon-interactive-warning" />
    )}

    <p className={clsx('secondary-text', textClassName)}>{content}</p>
  </div>
)
