import { ReactNode } from 'react'

import { Theme, useThemeContext } from '@dao-dao/ui'
import clsx from 'clsx'

export interface ExcerptProps {
  children: ReactNode
}

export const Excerpt = ({ children }: ExcerptProps) => {
  const { theme } = useThemeContext()

  return (
    <article
      className={clsx('p-8 max-w-none bg-disabled rounded-lg prose prose-sm', {
        'prose-invert': theme === Theme.Dark,
      })}
    >
      {children}
    </article>
  )
}

const ExcerptPlaceholder = () => (
  <>
    <h2>Raw DAO&apos;s mission statement</h2>
    <h3>A Vision of Coordination</h3>
    <p>
      The Coordination Game is a game-theory optimised Keeper protocol that
      provides a solution to the MEV incentive structure problem on Ethereum. By
      aligning Keeper&apos;s incentives with those of the other network
      participants, it gives them a new game to play, in which they can fully
      fulfill their potential as beneficial actors inside the Ethereum
      ecosystem.
    </p>
    <p>
      And for them to fulfill their roles more effectively - without the
      aforementioned negative externalities - there needs to be a transparent,
      efficient and decentralised market for their services. That doesn&apos;t
      exist right now. It&apos;s not clear how many Keepers there are, how much
      liquidity they command, how protocols should optimally price risk, or how
      users and protocols should bid for Keeper attention when they require
      services.
    </p>
  </>
)

Excerpt.Placeholder = ExcerptPlaceholder
