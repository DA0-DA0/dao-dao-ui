import { FC } from 'react'

import { MarkdownPreview } from '@dao-dao/ui'

import { TokenDistributionPie } from './TokenDistributionPie'

export interface DescriptionAndAidropAllocationProps {
  missionMarkdown: string
}

export const DescriptionAndAirdropAllocation: FC<
  DescriptionAndAidropAllocationProps
> = ({ missionMarkdown }) => (
  <div className="flex grid-cols-5 flex-wrap rounded-lg bg-disabled md:grid md:gap-3">
    <MarkdownPreview
      className="body-text prose-h2:header-text prose-h3:title-text col-span-3 max-w-full border-b border-inactive p-10 prose-h2:mb-6 prose-h3:mb-4 md:border-r md:border-b-0"
      markdown={missionMarkdown}
    />

    <div className="col-span-2 p-10">
      <TokenDistributionPie />
    </div>
  </div>
)
