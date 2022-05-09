import { DAODAOLogo } from '@/components'

export const Footer = () => (
  <a
    className="flex flex-col justify-start items-center my-10"
    href="https://daodao.zone"
    rel="noopener noreferrer"
    target="_blank"
  >
    <div className="cursor-pointer">
      <DAODAOLogo height={32} width={32} />
    </div>
    <p className="mt-4 font-studiofeixen">Powered by DAO DAO</p>
  </a>
)
