import { InformationCircleIcon } from '@heroicons/react/outline'

export default function HelpTooltip({ text }: { text: string }) {
  return (
    <div className="tooltip h-4 w-4 ml-1 align-text-top" data-tip={text}>
      <InformationCircleIcon />
    </div>
  )
}
