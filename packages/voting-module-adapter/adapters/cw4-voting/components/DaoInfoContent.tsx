import { useTranslation } from 'react-i18next'

import { CopyToClipboard } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const DaoInfoContent = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()

  return (
    <div>
      <h2 className="mb-4 md:mb-6 primary-text">{t('title.addresses')}</h2>
      <div className="grid grid-cols-[auto_auto] gap-x-6 gap-y-2 justify-start items-center mt-3 md:ml-2 caption-text">
        <p>{t('title.treasury')}</p>
        <CopyToClipboard value={coreAddress} />
      </div>
    </div>
  )
}
