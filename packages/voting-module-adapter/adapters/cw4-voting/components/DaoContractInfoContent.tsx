import { useTranslation } from 'react-i18next'

import { CopyToClipboardAccent } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const DaoContractInfoContent = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()

  return (
    <div>
      <h2 className="mb-4 md:mb-6 primary-text">{t('title.addresses')}</h2>
      <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2 caption-text">
        <li>
          {t('title.treasury')} <CopyToClipboardAccent value={coreAddress} />
        </li>
      </ul>
    </div>
  )
}
