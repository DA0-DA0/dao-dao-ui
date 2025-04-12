import fs from 'fs'
import path from 'path'

import chalk from 'chalk'
import lockfile from 'proper-lockfile'

import { PolytoneConnection } from '@dao-dao/types'

/**
 * Path to all polytone config.
 */
const polytoneConfigPath = path.join(
  __dirname,
  '../../../utils/constants/polytone.json'
)

type PolytoneConfigData = Record<string, Record<string, PolytoneConnection>>

/**
 * A class that manages the polytone config.
 */
export class PolytoneConfig {
  private _config: PolytoneConfigData = {}

  constructor() {
    if (!fs.existsSync(polytoneConfigPath)) {
      console.log(
        chalk.red(`Polytone config file not found at ${polytoneConfigPath}`)
      )
      process.exit(1)
    }
  }

  get config() {
    return this._config
  }

  private load() {
    this._config = JSON.parse(fs.readFileSync(polytoneConfigPath, 'utf8'))
  }

  private save() {
    fs.writeFileSync(
      polytoneConfigPath,
      JSON.stringify(this._config, null, 2) + '\n'
    )
  }

  /**
   * Set polytone config.
   */
  public async set({
    srcChainId,
    destChainId,
    entry,
  }: {
    /**
     * The source chain ID.
     */
    srcChainId: string
    /**
     * The destination chain ID.
     */
    destChainId: string
    /**
     * The polytone config entry.
     */
    entry: PolytoneConnection
  }) {
    // Establish lock.
    const releaseLock = await lockfile.lock(polytoneConfigPath, {
      retries: {
        forever: true,
        minTimeout: 100,
        factor: 1.1,
        randomize: true,
      },
    })

    try {
      this.load()

      if (!this._config[srcChainId]) {
        this._config[srcChainId] = {}
      }

      this._config[srcChainId][destChainId] = entry

      this.save()
    } finally {
      // Release lock.
      await releaseLock()
    }
  }
}
