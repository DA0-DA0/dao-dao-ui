// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export const getStaticPaths = () => ({
  paths: [{ params: { id: 'known' } }],
  fallback: true,
})

export const getStaticProps = ({ params }) => {
  const stateDir = process.env.ISR_FIXTURE_STATE_DIR
  if (!stateDir) {
    throw new Error('ISR_FIXTURE_STATE_DIR is required')
  }
  if (existsSync(join(stateDir, 'fail'))) {
    throw new Error('simulated network failure')
  }

  return {
    props: {
      id: params.id,
      value: readFileSync(join(stateDir, 'value'), 'utf8'),
    },
    revalidate: 1,
  }
}

export default function Page({ id, value }) {
  return (
    <main>
      {id}:{value}
    </main>
  )
}
