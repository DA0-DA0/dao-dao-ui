import { useTranslation } from '@dao-dao/i18n'

import { DAODAOLogo } from '@/components'

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
        <DAODAOLogo height={32} width={32} />
      </div>
      <p className="mt-4 font-studiofeixen">{t('info.poweredByDAODAO')}</p>
    </a>
  )
}
