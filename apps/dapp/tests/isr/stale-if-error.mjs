// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { mkdtemp, rm, unlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { after, before, test } from 'node:test'

const fixtureDir = join(dirname(fileURLToPath(import.meta.url)), 'fixture')
const nextBin = fileURLToPath(import.meta.resolve('next/dist/bin/next'))
const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds))

let stateDir
let server
let serverOutput = ''
let origin

const runNext = (args, env = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nextBin, ...args], {
      env: {
        ...process.env,
        ...env,
        NEXT_TELEMETRY_DISABLED: '1',
      },
      signal: AbortSignal.timeout(120_000),
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let output = ''
    child.stdout.on('data', (chunk) => {
      output += chunk
    })
    child.stderr.on('data', (chunk) => {
      output += chunk
    })
    child.once('error', reject)
    child.once('exit', (code, signal) => {
      if (code === 0) {
        resolve()
      } else {
        reject(
          new Error(
            `next ${args[0]} failed (${signal ?? `exit ${code}`}):\n${output}`
          )
        )
      }
    })
  })

const getFreePort = () =>
  new Promise((resolve, reject) => {
    const socket = createServer()
    socket.once('error', reject)
    socket.listen(0, '127.0.0.1', () => {
      const address = socket.address()
      if (!address || typeof address === 'string') {
        socket.close(() => reject(new Error('Failed to allocate a port')))
        return
      }
      socket.close(() => resolve(address.port))
    })
  })

const request = (path, options) => fetch(`${origin}${path}`, options)

const waitFor = async (callback, timeout = 15_000) => {
  const deadline = Date.now() + timeout
  let lastError
  while (Date.now() < deadline) {
    try {
      const result = await callback()
      if (result) {
        return result
      }
    } catch (error) {
      lastError = error
    }
    await sleep(100)
  }
  throw lastError ?? new Error('Timed out waiting for condition')
}

const stopServer = async () => {
  if (!server || server.exitCode !== null) {
    return
  }

  server.kill('SIGTERM')
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    sleep(5_000).then(() => {
      if (server.exitCode === null) {
        server.kill('SIGKILL')
      }
    }),
  ])
}

before(async () => {
  stateDir = await mkdtemp(join(tmpdir(), 'dao-dao-isr-'))
  await writeFile(join(stateDir, 'value'), 'v1')
  await rm(join(fixtureDir, '.next'), { force: true, recursive: true })

  const env = { ISR_FIXTURE_STATE_DIR: stateDir }
  await runNext(['build', fixtureDir], env)

  const port = await getFreePort()
  origin = `http://127.0.0.1:${port}`
  server = spawn(
    process.execPath,
    [
      nextBin,
      'start',
      fixtureDir,
      '--hostname',
      '127.0.0.1',
      '--port',
      `${port}`,
    ],
    {
      env: {
        ...process.env,
        ...env,
        NEXT_PRIVATE_DEBUG_CACHE: '1',
        NEXT_TELEMETRY_DISABLED: '1',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  )
  server.stdout.on('data', (chunk) => {
    serverOutput += chunk
  })
  server.stderr.on('data', (chunk) => {
    serverOutput += chunk
  })

  await waitFor(async () => {
    if (server.exitCode !== null) {
      throw new Error(`Next server exited during startup:\n${serverOutput}`)
    }
    return (await request('/known')).ok
  })
})

after(async () => {
  await stopServer()
  await Promise.all([
    rm(join(fixtureDir, '.next'), { force: true, recursive: true }),
    stateDir
      ? rm(stateDir, { force: true, recursive: true })
      : Promise.resolve(),
  ])
})

test('keeps stale content after a failed regeneration and replaces it after recovery', async () => {
  const cached = await waitFor(async () => {
    const response = await request('/known')
    const body = await response.text()
    return response.headers.get('x-nextjs-cache') === 'HIT' &&
      body.includes('v1')
      ? response
      : undefined
  })
  assert.equal(cached.status, 200)

  await sleep(1_100)
  await writeFile(join(stateDir, 'fail'), '')

  const stale = await request('/known')
  assert.equal(stale.status, 200)
  assert.equal(stale.headers.get('x-nextjs-cache'), 'STALE')
  assert.match(await stale.text(), /v1/)

  await waitFor(() => serverOutput.includes('simulated network failure'))
  assert.equal(server.exitCode, null)

  const preserved = await request('/known')
  assert.equal(preserved.status, 200)
  assert.match(await preserved.text(), /v1/)

  await unlink(join(stateDir, 'fail'))
  await writeFile(join(stateDir, 'value'), 'v2')
  await sleep(3_200)

  const recoveredBody = await waitFor(async () => {
    const response = await request('/known')
    const body = await response.text()
    return response.status === 200 && body.includes('v2') ? body : undefined
  })
  assert.match(recoveredBody, /v2/)
})

test('does not cache a failed cold generation and succeeds after recovery', async () => {
  await writeFile(join(stateDir, 'fail'), '')

  const failed = await request('/cold', {
    headers: { 'user-agent': 'Googlebot' },
  })
  assert.equal(failed.status, 500)
  assert.doesNotMatch(await failed.text(), /cold.*v2/)

  await unlink(join(stateDir, 'fail'))
  const recovered = await request('/cold', {
    headers: { 'user-agent': 'Googlebot' },
  })
  assert.equal(recovered.status, 200)
  const body = await recovered.text()
  assert.match(body, /cold/)
  assert.match(body, /v2/)
})
