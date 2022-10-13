import { useTranslation } from 'react-i18next'

import { Logo as DaoDaoLogo } from '@dao-dao/ui'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <a
      className="my-10 flex flex-col items-center justify-start"
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
