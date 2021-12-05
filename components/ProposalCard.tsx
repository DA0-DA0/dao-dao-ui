import Link from 'next/link'
import ProposalStatus from './ProposalStatus'

interface ProposalCardProps {
  title: string
  id: string
  contractAddress: string
  status: string
  expires_at: number
}

export default function ProposalCard({
  title,
  id,
  contractAddress,
  status,
  expires_at,
}: ProposalCardProps) {
  //// TODO https://github.com/DA0-DA0/cw-dao-dapp/issues/37
  // const expiresAtDateTime = new Date(expires_at / 1000000).toLocaleString()

  return (
    <Link href={`${window.location.pathname}/${id}`}>
      <a>
        <div className={`card shadow-lg mb-4`}>
          <div className="card-body py-4 px-8">
            <div className="card-title flex flex-row justify-between m-0">
              <div>{title}</div>
              <ProposalStatus status={status} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
