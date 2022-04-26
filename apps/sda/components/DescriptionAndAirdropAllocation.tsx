import { MarkdownPreview } from '@/../../packages/ui'
import { FC } from 'react'
import { TokenDistributionPie } from './TokenDistributionPie'

export interface DescriptionAndAidropAllocationProps {
  missionMarkdown: string
}

export const DescriptionAndAirdropAllocation: FC<
  DescriptionAndAidropAllocationProps
> = ({ missionMarkdown }) => (
  <div className="bg-disabled rounded-lg md:grid grid-cols-5 md:gap-3 gap-8 flex flex-wrap">
    <MarkdownPreview
      markdown={missionMarkdown}
      className="prose-h2:mb-6 prose-h3:mb-4 max-w-full body-text prose-h2:header-text prose-h3:title-text col-span-3 p-10 border-r  border-inactive"
    />
    <div className="col-span-2 p-10">
      <TokenDistributionPie />
    </div>
  </div>
)
