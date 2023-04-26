import { AccountBalanceOutlined, Link } from '@mui/icons-material'
import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { daoTvlSelector } from '@dao-dao/state'
import {
  Button,
  CopyToClipboardUnderline,
  DaoInfoBarLoader,
  Modal,
  DaoInfoBar as StatelessDaoInfoBar,
  TokenAmountDisplay,
  useCachedLoading,
  useChain,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { getDisplayNameForChainId, getImageUrlForChainId } from '@dao-dao/utils'

import {
  useCw20CommonGovernanceTokenInfoIfExists,
  useVotingModuleAdapter,
} from '../../voting-module-adapter'
import { SuspenseLoader } from '../SuspenseLoader'

export const DaoInfoBar = () => (
  <SuspenseLoader fallback={<DaoInfoBarLoader />}>
    <InnerDaoInfoBar />
  </SuspenseLoader>
)

const InnerDaoInfoBar = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const {
    hooks: { useDaoInfoBarItems },
  } = useVotingModuleAdapter()
  const votingModuleItems = useDaoInfoBarItems()
  const { coreAddress, polytoneProxies } = useDaoInfoContext()

  const { denomOrAddress: cw20GovernanceTokenAddress } =
    useCw20CommonGovernanceTokenInfoIfExists() ?? {}

  const treasuryUsdcValueLoading = useCachedLoading(
    daoTvlSelector({
      coreAddress,
      chainId,
      cw20GovernanceTokenAddress,
    }),
    {
      amount: -1,
      timestamp: new Date(),
    }
  )

  const [addressesVisible, setAddressesVisible] = useState(false)
  const addresses = [
    // Current chain
    {
      chainId,
      address: coreAddress,
    },
    // Other chains
    ...Object.entries(polytoneProxies).map(([chainId, address]) => ({
      chainId,
      address,
    })),
  ]

  return (
    <>
      <StatelessDaoInfoBar
        items={[
          // Common items.
          {
            Icon: Link,
            label: t('title.daosAddresses'),
            value: (
              <Button
                onClick={() => setAddressesVisible(true)}
                variant="underline"
              >
                {t('button.clickToView')}
              </Button>
            ),
          },
          {
            Icon: AccountBalanceOutlined,
            label: t('title.daoTreasury'),
            tooltip: t('info.estimatedTreasuryUsdValueTooltip'),
            value: (
              <TokenAmountDisplay
                amount={
                  treasuryUsdcValueLoading.loading
                    ? { loading: true }
                    : {
                        loading: false,
                        data: treasuryUsdcValueLoading.data.amount,
                      }
                }
                dateFetched={
                  treasuryUsdcValueLoading.loading
                    ? undefined
                    : treasuryUsdcValueLoading.data.timestamp
                }
                estimatedUsdValue
                hideApprox
              />
            ),
          },
          // Voting module-specific items.
          ...votingModuleItems,
        ]}
      />

      <Modal
        header={{
          title: t('title.daosAddresses'),
        }}
        onClose={() => setAddressesVisible(false)}
        visible={addressesVisible}
      >
        <div className="grid grid-cols-[auto_1fr] items-center gap-8">
          {addresses.map(({ chainId, address }) => {
            const imageUrl = getImageUrlForChainId(chainId)
            const name = getDisplayNameForChainId(chainId)

            return (
              <Fragment key={address}>
                <div className="flex flex-row items-center gap-2">
                  {imageUrl && (
                    <div
                      className="h-6 w-6 bg-contain bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                      }}
                    ></div>
                  )}

                  <p className="primary-text shrink-0">{name}</p>
                </div>

                <CopyToClipboardUnderline
                  className="min-w-0"
                  takeN={12}
                  tooltip={t('button.clickToCopyAddress')}
                  value={address}
                />
              </Fragment>
            )
          })}
        </div>
      </Modal>
    </>
  )
}
