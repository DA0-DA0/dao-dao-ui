import Link from 'next/link'

import { ArrowNarrowRightIcon } from '@heroicons/react/outline'

import { Button } from '@components/Button'

export function EnterAppButton({ small }: { small?: boolean }) {
  return (
    <Link href="/starred" passHref>
      <Button
        size={small ? 'md' : 'xl'}
        iconAfter={
          <ArrowNarrowRightIcon
            className="inline h-4 w-4"
            style={{ transform: 'rotateY(0deg) rotate(-45deg)' }}
          />
        }
      >
        Enter the app
      </Button>
    </Link>
  )
}
