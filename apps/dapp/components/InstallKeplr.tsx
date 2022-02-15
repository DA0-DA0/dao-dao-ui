import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'

import { GradientWrapper } from './GradientWrapper'

export function InstallKeplr({ onClose }: { onClose: () => void }) {
  return (
    <GradientWrapper>
      <div className="modal modal-open">
        <div className="modal-box rounded-md">
          <XIcon className="float-right h-6 cursor-pointer" onClick={onClose} />
          <h1 className="text-2xl font-medium">
            You{"'"}ll need a wallet to continue
          </h1>
          <p className="mt-3">
            Your wallet is your digital identity on the blockchain. Having one
            lets you interact with web3 applications like DAO DAO.
          </p>
          <p className="mt-3">We recommend the Keplr wallet.</p>
          <a
            href="https://www.keplr.app/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-md rounded-md normal-case mt-6"
          >
            Install Keplr <ChevronRightIcon className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </GradientWrapper>
  )
}
