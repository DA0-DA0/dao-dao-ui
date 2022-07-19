import { useTranslation } from 'react-i18next'

import { Votes } from '@dao-dao/icons'
import { CopyToClipboardAccent, GovInfoListItem } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { BaseDaoContractInfoContentProps } from '../../../types'

export const DaoContractInfoContent = ({
  threshold,
  quorum,
}: BaseDaoContractInfoContentProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()

  return (
    <>
      <div className="mb-4 md:mb-0">
        <h2 className="mb-4 md:mb-6 primary-text">
          {t('title.votingConfiguration')}
        </h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2">
          <GovInfoListItem
            icon={<Votes fill="currentColor" width="16px" />}
            text={t('title.passingThreshold')}
            value={threshold}
          />
          {quorum && (
            <GovInfoListItem
              icon={<Votes fill="currentColor" width="16px" />}
              text={t('title.quorum')}
              value={quorum}
            />
          )}
        </ul>
      </div>
      <div>
        <h2 className="mb-4 md:mb-6 primary-text">{t('title.addresses')}</h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2 caption-text">
          <li>
            {t('title.treasury')} <CopyToClipboardAccent value={coreAddress} />
          </li>
        </ul>
      </div>
    </>
  )
}
