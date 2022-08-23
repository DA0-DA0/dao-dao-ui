import { MarkdownPreview } from '@dao-dao/ui'

import { TokenDistributionPie } from './TokenDistributionPie'

export interface DescriptionAndAidropAllocationProps {
  missionMarkdown: string
}

export const DescriptionAndAirdropAllocation = ({
  missionMarkdown,
}: DescriptionAndAidropAllocationProps) => (
  <div className="flex flex-wrap grid-cols-5 bg-disabled rounded-lg md:grid md:gap-3">
    <MarkdownPreview
      className="col-span-3 p-10 prose-h2:mb-6 prose-h3:mb-4 max-w-full border-b border-inactive md:border-r md:border-b-0 body-text prose-h2:header-text prose-h3:title-text"
      markdown={missionMarkdown}
    />

    <div className="col-span-2 p-10">
      <TokenDistributionPie />
    </div>
  </div>
)
