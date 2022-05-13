import { LibraryIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import { Logo } from '@dao-dao/ui'
import { HEADER_IMAGES_ENABLED } from '@dao-dao/utils'

import { NavListItem } from './NavListItem'
import { pinnedMultisigsAtom } from '@/atoms/pinned'
import { sigSelector } from '@/selectors/multisigs'

export const PinnedMultisigNavList: FC = () => {
  const pinnedSigs = useRecoilValue(pinnedMultisigsAtom)
  const sigs = useRecoilValue(waitForAll(pinnedSigs.map((a) => sigSelector(a))))
  const sigAddresses = sigs.map((s, idx) => ({
    sig: s,
    address: pinnedSigs[idx],
  }))

  return (
    <ul className="ml-2 list-none">
      {sigAddresses &&
        sigAddresses.map(({ sig, address }) => (
          <NavListItem
            key={address}
            href={`/multisig/${address}`}
            icon={LibraryIcon}
            text={sig.config.name}
          />
        ))}
    </ul>
  )
}

export const MobilePinnedMultisigNavList: FC = () => {
  const pinnedSigs = useRecoilValue(pinnedMultisigsAtom)
  const sigs = useRecoilValue(waitForAll(pinnedSigs.map((a) => sigSelector(a))))
  const sigAddresses = sigs.map((s, idx) => ({
    sig: s,
    address: pinnedSigs[idx],
  }))

  return (
    <ul className="flex overflow-auto gap-1 list-none no-scrollbar">
      {sigAddresses.map(({ sig, address }) => (
        <Link key={address} href={`/multisig/${address}`} passHref>
          <a
            className="flex flex-col gap-3 items-center p-5 min-w-[100px] max-w-[100px] bg-tab-hover rounded transition"
            style={{
              backgroundImage:
                'radial-gradient(#FF990033, #FFCC001A, transparent 80%)',
            }}
          >
            {sig.config.image_url && HEADER_IMAGES_ENABLED ? (
              <div
                aria-label="DAO's Custom Logo"
                className="w-[50px] h-[50px] bg-center bg-cover rounded-full"
                role="img"
                style={{
                  backgroundImage: `url(${sig.config.image_url})`,
                }}
              ></div>
            ) : (
              <Logo alt={`${sig.config.name} logo`} height={50} width={50} />
            )}
            <h2 className="text-center text-dark line-clamp-2 button-text break-word">
              {sig.config.name}
            </h2>
          </a>
        </Link>
      ))}
    </ul>
  )
}
