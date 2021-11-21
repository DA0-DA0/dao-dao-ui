import type { NextPage } from 'next'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <WalletLoader>
      <h1 className="text-6xl font-bold">Multisigs</h1>

      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 max-w-full sm:w-full">
        <Link href="/multisig/create" passHref>
          <a className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">
              Create A Multisig{' '}
              <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
            </h3>
            <p className="mt-4 text-xl">Make your own multisig.</p>
          </a>
        </Link>
      </div>
    </WalletLoader>
  )
}

export default Home
