import { FunctionComponent } from 'react'

import { useRouter } from 'next/router'

export const Header: FunctionComponent = () => {
  const router = useRouter()

  return <header className="p-2 bg-dark">DAO</header>
}
