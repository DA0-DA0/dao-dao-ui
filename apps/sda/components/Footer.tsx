import { Theme, useThemeContext } from '@dao-dao/ui'

import { DAODAOLogo } from '@/components'

export const Footer = () => {
  const { theme, updateTheme } = useThemeContext()
  const toggleTheme = () =>
    updateTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark)

  return (
    <div className="flex flex-col justify-start items-center my-10">
      <div className="cursor-pointer" onClick={toggleTheme}>
        <DAODAOLogo height={32} width={32} />
      </div>
      <p className="mt-4 font-studiofeixen">
        Powered by{' '}
        <a href="https://daodao.zone" rel="noopener noreferrer" target="_blank">
          DAO DAO
        </a>
      </p>
    </div>
  )
}
