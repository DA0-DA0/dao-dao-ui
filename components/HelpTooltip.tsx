import {
  InformationCircleIcon,
  BanIcon,
} from '@heroicons/react/outline'

export default function HelpTooltip({
  text,
  errorText,
}: {
  text: string
  errorText?: string
}) {
  let icon
  if (errorText) {
    icon = <BanIcon className="text-error" />
  } else {
    icon = <InformationCircleIcon />
  }
  return (
    <div
      className={
        errorText
          ? 'tooltip tooltip-open tooltip-error h-4 w-4 ml-1 align-text-top'
          : 'tooltip h-4 w-4 ml-1 align-text-top'
      }
      data-tip={errorText || text}
    >
      {icon}
    </div>
  )
}
