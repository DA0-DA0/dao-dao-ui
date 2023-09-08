import { Chain } from '@chain-registry/types'
import { ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { useMemo, useRef } from 'react'

import { ButtonPopupProps, ButtonPopupSectionButton } from '@dao-dao/types'
import {
  getChainForChainId,
  getDisplayNameForChainId,
  getSupportedChains,
} from '@dao-dao/utils'

import { ButtonLink } from '../buttons'
import { ChainLogo } from '../ChainLogo'
import { ButtonPopup } from '../popup'

export type ChainSwitcherProps = Omit<
  ButtonPopupProps,
  'ButtonLink' | 'position' | 'sections' | 'trigger'
> & {
  position?: ButtonPopupProps['position']
  loading?: boolean
  excludeChainIds?: string[]

  onSelect: (chain: Chain) => void
  selected: string
}

export const ChainSwitcher = ({
  onSelect,
  selected,
  loading,
  wrapperClassName,
  excludeChainIds,
  ...props
}: ChainSwitcherProps) => {
  const chain = getChainForChainId(selected)

  const excludeChainIdsRef = useRef(excludeChainIds)
  excludeChainIdsRef.current = excludeChainIds

  const { chainSwitcherTriggerContent, chainSwitcherSections } = useMemo(() => {
    const makeChainIcon = (chainId: string) =>
      function ChainIcon({ className }: { className?: string }) {
        return <ChainLogo chainId={chainId} className={className} />
      }

    const ChainIcon = makeChainIcon(chain.chain_id)
    const chainSwitcherTriggerContent = (
      <>
        <ChainIcon className="!h-6 !w-6" />
        <p>{getDisplayNameForChainId(chain.chain_id)}</p>
        <ArrowDropDown className="ml-2 !h-5 !w-5" />
      </>
    )
    const chainSwitcherSections = [
      {
        buttons: getSupportedChains()
          .filter(
            ({ chain: { chain_id: chainId } }) =>
              !excludeChainIdsRef.current?.includes(chainId)
          )
          .map(
            ({
              chain,
            }): Omit<ButtonPopupSectionButton, 'onClick'> & {
              chain: Chain
            } => ({
              chain,
              label: getDisplayNameForChainId(chain.chain_id),
              pressed: selected === chain.chain_id,
              Icon: makeChainIcon(chain.chain_id),
            })
          )
          .sort((a, b) => {
            // Sort selected to the top.
            if (a.pressed && !b.pressed) {
              return -1
            } else if (!a.pressed && b.pressed) {
              return 1
            }

            // Sort alphabetically by label.
            return a.label.localeCompare(b.label)
          }),
      },
    ]

    return {
      ChainIcon,
      chainSwitcherTriggerContent,
      chainSwitcherSections,
    }
  }, [chain.chain_id, selected])

  return (
    <ButtonPopup
      ButtonLink={ButtonLink}
      position="full"
      sections={chainSwitcherSections.map((section) => ({
        ...section,
        buttons: section.buttons.map(({ chain, ...button }) => ({
          ...button,
          onClick: () => onSelect(chain),
        })),
      }))}
      trigger={{
        type: 'button',
        props: {
          children: chainSwitcherTriggerContent,
          loading,
          variant: 'secondary',
          contentContainerClassName: '!gap-3',
        },
      }}
      wrapperClassName={clsx(wrapperClassName, 'min-w-[8rem]')}
      {...props}
    />
  )
}
