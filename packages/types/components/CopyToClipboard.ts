export interface CopyToClipboardProps {
  value: string
  label?: string
  success?: string
  takeN?: number
  takeStartEnd?: {
    start: number
    end: number
  }
  takeAll?: true
  className?: string
  textClassName?: string
  iconClassName?: string
  iconSize?: 'sm' | 'default'
  onCopy?: () => void
  tooltip?: string
  noCopy?: boolean
}
