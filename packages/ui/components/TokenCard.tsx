import SvgEdamameCrown from '@dao-dao/icons/dist/EdamameCrown'
import { PlusIcon } from '@heroicons/react/outline'
import { Tooltip } from './Tooltip'

export interface TokenCardProps {
  crown?: boolean
  tokenSymbol: string
  tokenName: string
  tokenImageUrl: string
  tokenBalance: string
  onAddToken?: () => null
}

export const TokenCard = ({
  tokenImageUrl,
  tokenSymbol,
  tokenName,
  tokenBalance,
  onAddToken,
  crown,
}: TokenCardProps) => (
  <div className="rounded-lg border border-default">
    <div className="border-b border-inactive p-5 flex flex-row justify-between">
      <div className="relative">
        <div className="flex flex-row gap-4">
          <div
            className="w-10 h-10 rounded-full bg-center bg-fill"
            style={{
              backgroundImage: `url(${tokenImageUrl})`,
            }}
          ></div>
          <div className="flex flex-col gap-1">
            <p className="title-text">${tokenSymbol}</p>
            <p className="caption-text">{tokenName}</p>
          </div>
        </div>
        {/* TODO: make an icon-secondary color and use it. */}
        {!!crown && (
          <SvgEdamameCrown
            className="stroke-current absolute -top-4 -left-[24px]"
            width="32px"
            height="32px"
          />
        )}{' '}
      </div>
      {/* TODO: Create IconButton component. Figma:
          https://www.figma.com/file/XNQp9ODFr22gkxg1HR92wS/%E2%99%A3%EF%B8%8E--Components?node-id=962%3A6004
        */}
      <Tooltip label={onAddToken && 'Add token to wallet'}>
        <button
          className="rounded-full h-min hover:bg-btn-secondary-pressed -mt-1 -mr-1 p-2 transition"
          onClick={onAddToken}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </Tooltip>
    </div>
    <div className="px-5 py-4 flex justify-between">
      <p className="secondary-text">DAO Holding</p>
      <p className="font-mono caption-text text-black">
        {tokenBalance} ${tokenSymbol}
      </p>
    </div>
  </div>
)
