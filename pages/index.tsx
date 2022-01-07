import type { NextPage } from 'next'
import { ChevronRightIcon } from '@heroicons/react/solid'
import LinkCard from 'components/LinkCard'

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="text-6xl font-bold">InterChain DAO Tooling</h1>

      <div className="mt-3 text-2xl">Choose your adventure...</div>

      <LinkCard href="/multisig">
        <h3 className="text-2xl font-bold">
          Multisigs{' '}
          <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
        </h3>
        <p className="mt-4 text-xl">Shared group accounts.</p>
      </LinkCard>
      <LinkCard href="/dao">
        <h3 className="text-2xl font-bold">
          DAOs{' '}
          <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
        </h3>
        <p className="mt-4 text-xl">Organizations with governance tokens.</p>
      </LinkCard>
    </div>
  )
}

export default Home
