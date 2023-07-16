import { InfoOutlined } from '@mui/icons-material'
import clsx from 'clsx'

export type InfoCardProps = {
  content: string
  className?: string
  textClassName?: string
}

export const InfoCard = ({
  content,
  className,
  textClassName,
}: InfoCardProps) => (
  <div
    className={clsx(
      'flex flex-row items-center gap-3 rounded-md bg-background-tertiary p-4',
      className
    )}
  >
    <InfoOutlined className="!h-6 !w-6 text-icon-secondary" />

    <p className={clsx('secondary-text', textClassName)}>{content}</p>
  </div>
)
