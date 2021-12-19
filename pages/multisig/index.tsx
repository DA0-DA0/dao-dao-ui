import type { NextPage } from 'next'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import Link from 'next/link'
import LinkCard from 'components/LinkCard'

const MultisigHome: NextPage = () => {
  return (
    <WalletLoader>
      <h1 className="text-6xl font-bold">Multisigs</h1>

      <LinkCard href="/multisig/create">
        <h3 className="text-2xl font-bold">
          Create A Multisig{' '}
          <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
        </h3>
        <p className="mt-4 text-xl">Make your own multisig.</p>
      </LinkCard>

      <LinkCard href="/multisig/list">
        <h3 className="text-2xl font-bold">
          Find A Multisig{' '}
          <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
        </h3>
        <p className="mt-4 text-xl">See a list of Multisigs.</p>
      </LinkCard>
    </WalletLoader>
  )
}

export default MultisigHome
