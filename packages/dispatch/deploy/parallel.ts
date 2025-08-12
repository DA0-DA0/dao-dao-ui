import { spawn } from 'child_process'
import path from 'path'

import chalk from 'chalk'
import { Command } from 'commander'

const { log } = console

const program = new Command()
program
  .requiredOption(
    '-c, --chains <chain-ids>',
    'comma-separated list of chain IDs to deploy to'
  )
  .requiredOption(
    '-v, --version <version>',
    'contract version to deploy (e.g. 1.0.0)'
  )
  .option(
    '-m, --max-concurrent <number>',
    'maximum number of concurrent deployments',
    '3'
  )

program.parse(process.argv)

const { chains: chainsList, version, maxConcurrent } = program.opts()

const chains = chainsList.split(',').filter(Boolean)
if (chains.length === 0) {
  log(chalk.red('No valid chains specified.'))
  process.exit(1)
}

// Colors for different chains
const chainColors = [
  chalk.cyan,
  chalk.magenta,
  chalk.yellow,
  chalk.blue,
  chalk.green,
  chalk.red,
]

interface DeploymentResult {
  chainId: string
  success: boolean
  config?: any
  error?: string
}

// Queue for managing concurrent deployments
class DeploymentQueue {
  private queue: string[] = []
  /**
   * The longest chain ID in the queue. Used to determine padding for chain IDs
   * when printing so that all chains print at the same width.
   */
  private longestChainId: number
  private running = new Set<string>()
  private maxConcurrent: number
  private scriptPath: string
  private chainColorMap: Map<string, (text: string) => string>
  private results: DeploymentResult[] = []

  constructor(chains: string[], maxConcurrent: number) {
    this.queue = [...chains]
    this.longestChainId = Math.max(...chains.map((c) => c.length))
    this.maxConcurrent = maxConcurrent
    this.scriptPath = path.join(__dirname, 'script.ts')

    // Assign colors to chains
    this.chainColorMap = new Map()
    chains.forEach((chain, index) => {
      this.chainColorMap.set(chain, chainColors[index % chainColors.length])
    })
  }

  async start() {
    while (this.queue.length > 0 || this.running.size > 0) {
      // Start new deployments if possible
      while (this.queue.length > 0 && this.running.size < this.maxConcurrent) {
        const chainId = this.queue.shift()!
        this.startDeployment(chainId)
      }

      // Wait a bit before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    // Return results for summary
    return this.results
  }

  private startDeployment(chainId: string) {
    this.running.add(chainId)
    const chainColor = this.chainColorMap.get(chainId)!

    // Build base command with only necessary arguments
    const baseArgs = [
      'tsx',
      this.scriptPath,
      '-c',
      chainId,
      '-m',
      'dao',
      '-v',
      version,
    ]

    const prefix = `[${chainId}]`.padEnd(this.longestChainId + 4, ' ')

    log(chainColor(prefix + 'Starting deployment...'))

    let configOutput = ''
    let errorOutput = ''

    const process = spawn('npx', baseArgs, {
      stdio: 'pipe',
    })

    // Prefix output with colored chain ID
    process.stdout.on('data', (data) => {
      const lines = data.toString()
      configOutput += lines

      lines
        .split('\n')
        .filter((line: string) => line.trim())
        .forEach((line: string) => {
          log(chainColor(prefix + line))
        })
    })

    process.stderr.on('data', (data) => {
      const lines = data.toString()
      errorOutput += lines

      lines
        .split('\n')
        .filter((line: string) => line.trim())
        .forEach((line: string) => {
          log(chainColor(prefix + line))
        })
    })

    process.on('close', (code) => {
      this.running.delete(chainId)

      // Try to extract config if successful by grabbing the entire object at
      // the end of the output
      let config
      try {
        const configStart = configOutput.indexOf('Config entries:')
        if (configStart !== -1) {
          const jsonStart = configOutput.indexOf('{', configStart)
          const jsonEnd = configOutput.lastIndexOf('}') + 1
          if (jsonStart !== -1 && jsonEnd > jsonStart) {
            const jsonStr = configOutput.slice(jsonStart, jsonEnd)
            config = JSON.parse(jsonStr)
          }
        }
      } catch {
        // Ignore parse errors
      }

      if (code === 0) {
        log(chainColor(prefix + '✓ Deployment completed'))
        this.results.push({
          chainId,
          success: true,
          config,
        })
      } else {
        const error = errorOutput.trim() || 'Unknown error'
        log(
          chalk.red(
            chainColor(prefix + `✗ Deployment failed with exit code ${code}`)
          )
        )
        this.results.push({
          chainId,
          success: false,
          error,
        })
      }
    })
  }
}

const main = async () => {
  log(chalk.underline('Starting parallel deployments...'))
  log(
    `Deploying to chains: ${chains
      .map((c: string, i: number) => chainColors[i % chainColors.length](c))
      .join(', ')}`
  )
  log(`Max concurrent deployments: ${chalk.yellow(maxConcurrent)}`)
  log()

  const queue = new DeploymentQueue(chains, parseInt(maxConcurrent))
  const results = await queue.start()

  // Print deployment summary
  log()
  log(chalk.underline('Deployment Summary:'))
  log()

  const successful = results.filter((r) => r.success)
  const failed = results.filter((r) => !r.success)

  // Print successful deployments
  if (successful.length > 0) {
    log(chalk.green(`✓ Successful deployments (${successful.length}):`))
    for (const result of successful) {
      const color =
        chainColors[chains.indexOf(result.chainId) % chainColors.length]
      log(color(`  ${result.chainId}`))
    }
    log()
  }

  // Print failed deployments
  if (failed.length > 0) {
    log(chalk.red(`✗ Failed deployments (${failed.length}):`))
    for (const result of failed) {
      const color =
        chainColors[chains.indexOf(result.chainId) % chainColors.length]
      log(color(`  ${result.chainId}: ${result.error}`))
    }
    log()
  }

  // Print captured configs
  if (successful.length > 0) {
    log(chalk.underline('Deployment Configurations:'))
    log()
    for (const result of successful) {
      if (result.config) {
        const color =
          chainColors[chains.indexOf(result.chainId) % chainColors.length]
        log(color(`${result.chainId}:`))
        log(JSON.stringify(result.config, null, 2))
        log()
      }
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

process.on('SIGINT', () => {
  log(chalk.yellow('\nGracefully shutting down...'))
  process.exit(0)
})
