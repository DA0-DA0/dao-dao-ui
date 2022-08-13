import { useTranslation } from 'react-i18next'

import { Logo as DaoDaoLogo } from '@dao-dao/ui'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <a
      className="flex flex-col justify-start items-center my-10"
      href="https://daodao.zone"
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="cursor-pointer">
        <DaoDaoLogo size={32} />
      </div>
      <p className="mt-4 font-studiofeixen">{t('info.poweredByDAODAO')}</p>
    </a>
  )
}
