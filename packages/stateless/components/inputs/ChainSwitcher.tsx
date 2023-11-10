import { Chain } from '@chain-registry/types'
import { ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonPopupProps, ButtonPopupSectionButton } from '@dao-dao/types'
import {
  getChainForChainId,
  getConfiguredChains,
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
  // Configured refers to all configured chains, even those without DAO DAO
  // deployments. This includes all chains that show up in the governance UI.
  type?: 'configured' | 'supported'
  position?: ButtonPopupProps['position']
  loading?: boolean
  excludeChainIds?: string[]

  /**
   * Called when a chain is selected. If the none button is selected, it will be
   * called with undefined.
   */
  onSelect: (chain?: Chain) => void
  /**
   * When defined, this will be the selected chain. When undefined, selects the
   * none button.
   */
  selected: string | undefined

  /**
   * If true, a button will be shown at the top that represents none.
   */
  showNone?: boolean
  /**
   * If defined, this will be the label of the none button.
   */
  noneLabel?: string
  /**
   * If defined, this will be the icon of the none button.
   */
  noneIcon?: ComponentType<{ className?: string }>
}

type ChainSwitcherButton = Omit<ButtonPopupSectionButton, 'onClick'> & {
  chain?: Chain
}

export const ChainSwitcher = ({
  type = 'supported',
  onSelect,
  selected,
  loading,
  wrapperClassName,
  excludeChainIds,
  showNone,
  noneLabel,
  noneIcon,
  ...props
}: ChainSwitcherProps) => {
  const { t } = useTranslation()

  noneLabel ||= t('info.none')
  const chain = selected ? getChainForChainId(selected) : undefined

  const excludeChainIdsRef = useRef(excludeChainIds)
  excludeChainIdsRef.current = excludeChainIds

  const { chainSwitcherTriggerContent, chainSwitcherSections } = useMemo(() => {
    const makeChainIcon = (chainId: string) =>
      function ChainIcon({ className }: { className?: string }) {
        return <ChainLogo chainId={chainId} className={className} />
      }

    const Icon = chain ? makeChainIcon(chain.chain_id) : noneIcon
    const chainSwitcherTriggerContent = (
      <>
        {Icon && <Icon className="!h-6 !w-6" />}

        <p>{chain ? getDisplayNameForChainId(chain.chain_id) : noneLabel}</p>

        <ArrowDropDown className="ml-2 !h-5 !w-5" />
      </>
    )
    const chainSwitcherSections = [
      {
        buttons: [
          ...(showNone
            ? ([
                {
                  label: noneLabel,
                  pressed: !chain,
                  Icon: noneIcon,
                },
              ] as ChainSwitcherButton[])
            : []),
          ...(type === 'supported'
            ? getSupportedChains()
            : getConfiguredChains()
          )
            .filter(
              ({ chain: { chain_id: chainId } }) =>
                !excludeChainIdsRef.current?.includes(chainId)
            )
            .map(
              ({ chain }): ChainSwitcherButton => ({
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
        ],
      },
    ]

    return {
      ChainIcon: Icon,
      chainSwitcherTriggerContent,
      chainSwitcherSections,
    }
  }, [chain, noneIcon, noneLabel, selected, showNone, type])

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
