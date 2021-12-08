import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Treasury from 'components/Treasury'

const TreasuryPage: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  return (
    <div className="my-8 w-full">
      <Treasury contractAddress={contractAddress} />
    </div>
  )
}

export default TreasuryPage
