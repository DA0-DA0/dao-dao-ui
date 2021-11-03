import type { NextPage } from 'next'
import Link from 'next/link'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'

const Home: NextPage = () => {
  const { walletAddress } = useSigningClient()

  return (
    <WalletLoader>
      <h1 className="text-6xl font-bold">
        Welcome to {process.env.NEXT_PUBLIC_SITE_TITLE} !
      </h1>

      {process.env.NEXT_PUBLIC_SITE_DESCRIPTION && (
        <h3 className="mt-3 text-3xl">
          {process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
        </h3>
      )}

      <div className="mt-3 text-xl">
        Your wallet address is:{' '}
        <pre className="font-mono break-all whitespace-pre-wrap">
          {walletAddress}
        </pre>
      </div>

      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 max-w-full sm:w-full">
        <Link href="/proposals" passHref>
          <a className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">DAO Proposals &rarr;</h3>
            <p className="mt-4 text-xl">
              Create and vote on proposals for the DAO to execute.
            </p>
          </a>
        </Link>
      </div>
    </WalletLoader>
  )
}

export default Home
