import { PlusIcon } from '@heroicons/react/outline'

import SvgEdamameCrown from '@dao-dao/icons/dist/EdamameCrown'

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
    <div className="flex flex-row justify-between p-5 border-b border-inactive">
      <div className="relative">
        <div className="flex flex-row gap-4">
          <div
            className="w-10 h-10 bg-center rounded-full bg-fill"
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
            className="absolute -top-4 -left-[24px] stroke-current"
            height="32px"
            width="32px"
          />
        )}{' '}
      </div>
      {/* TODO: Create IconButton component. Figma:
          https://www.figma.com/file/XNQp9ODFr22gkxg1HR92wS/%E2%99%A3%EF%B8%8E--Components?node-id=962%3A6004
        */}
      <Tooltip label={onAddToken && 'Add token to wallet'}>
        <button
          className="p-2 -mt-1 -mr-1 h-min hover:text-dark hover:bg-btn-secondary-pressed rounded-full transition"
          onClick={onAddToken}
        >
          <PlusIcon className="w-4 h-4 text-secondary" />
        </button>
      </Tooltip>
    </div>
    <div className="flex justify-between py-4 px-5">
      <p className="secondary-text">DAO Holding</p>
      <p className="font-mono text-black caption-text">
        {tokenBalance} ${tokenSymbol}
      </p>
    </div>
  </div>
)
