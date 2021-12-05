import Link from 'next/link'
import Status from './Status'

interface ProposalCardProps {
  title: string
  id: string
  contractAddress: string
  status: string
  expires_at: number
}

const icons = {
  bell: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="flex-shrink-0 w-6 h-6 ml-2 inline"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      ></path>
    </svg>
  ),
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-6 h-6 ml-2 stroke-current inline"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  ),
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-6 h-6 ml-2 stroke-current inline"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      ></path>
    </svg>
  ),
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-6 h-6 ml-2 stroke-current inline"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      ></path>
    </svg>
  ),
  success: (
    <input
      type="checkbox"
      checked={true}
      readOnly={true}
      className="checkbox checkbox-accent"
    />
  ),
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
              {/* {status === 'passed' && (
                <div className="text-2xl text-warning">
                  {icons.warning} {status}
                </div>
              )}
              {status === 'rejected' && (
                <div className="text-2xl text-error">
                  {icons.error} {status}
                </div>
              )}
              {status === 'executed' && (
                <div className="text-2xl text-success">&#x2713; {status}</div>
              )}
              {status === 'open' && (
                <div className="text-2xl text-info">
                  {icons.bell} {status}
                </div>
              )} */}
              <Status status={status} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
