import { OfflineAminoSigner } from '@cosmjs/amino'

import { secretDaoDaoCoreQueries } from '@dao-dao/state/query'
import { DaoInfo, PermitForPermitData } from '@dao-dao/types'
import {
  createSecretNetworkPermit,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { SecretSingleChoiceProposalModule } from '../proposal-module/SecretSingleChoiceProposalModule'
import { CwDao } from './CwDao'

// TODO(dao-client): move this somewhere better?
const getProposalModuleBases = () => [SecretSingleChoiceProposalModule]

export class SecretCwDao extends CwDao {
  /**
   * Function to retrieve the offline amino signer from the current wallet. Must
   * be set before `getPermit` and `getVotingPower` can be used.
   */
  private getOfflineSignerAmino?: () => OfflineAminoSigner

  protected setInfo(info: DaoInfo | undefined) {
    this._info = info

    if (info) {
      const proposalModuleBases = getProposalModuleBases()
      this._proposalModules = info.proposalModules.flatMap((proposalModule) => {
        const ProposalModule = proposalModuleBases.find((Base) =>
          Base.contractNames.includes(proposalModule.contractName)
        )

        if (!ProposalModule) {
          return []
        }

        return new ProposalModule(this.queryClient, this, proposalModule)
      })
    }
  }

  private getPermitLocalStorageKey(address: string) {
    return [
      'secretNetworkPermit',
      this.options.chainId,
      this.options.coreAddress,
      address,
    ].join(':')
  }

  /**
   * Register a function to retrieve the offline amino signer from the current
   * wallet. Must be set before `getPermit` and `getVotingPower` can be used.
   */
  registerOfflineSignerAminoGetter(
    getOfflineSignerAmino: () => OfflineAminoSigner
  ) {
    this.getOfflineSignerAmino = getOfflineSignerAmino
  }

  /**
   * Retrieve a permit from local storage if it exists. Returns undefined if
   * it doesn't exist.
   */
  getExistingPermit(address: string): PermitForPermitData | undefined {
    // Attempt to load from local storage.
    try {
      const saved = JSON.parse(
        localStorage.getItem(this.getPermitLocalStorageKey(address)) || 'null'
      )
      // Basic validation.
      if (
        objectMatchesStructure(saved, {
          params: {},
          signature: {},
        })
      ) {
        return saved
      }
    } catch (err) {
      console.error('getExistingPermit failed', this.options, address, err)
    }
  }

  async getPermit(address: string): Promise<PermitForPermitData> {
    const existing = this.getExistingPermit(address)
    if (existing) {
      return existing
    }

    if (!this.getOfflineSignerAmino) {
      throw new Error(
        'Offline amino signer getter not registered. Call registerOfflineSignerAminoGetter first.'
      )
    }

    // Create a new permit.
    const permit = await createSecretNetworkPermit({
      chainId: this.options.chainId,
      address,
      key: this.options.coreAddress,
      offlineSignerAmino: this.getOfflineSignerAmino(),
    })

    // Save to local storage.
    localStorage.setItem(
      this.getPermitLocalStorageKey(address),
      JSON.stringify(permit)
    )

    // Notify window of new permit.
    window.dispatchEvent(new Event('secretPermitUpdate'))

    return permit
  }

  async getVotingPower(
    address: string,
    height?: number,
    /**
     * Whether or not to prompt the wallet for a permit. If true,
     * `registerOfflineSignerAminoGetter` must be called first.
     *
     * Defaults to false.
     */
    prompt = false
  ): Promise<string> {
    const permit = prompt
      ? await this.getPermit(address)
      : this.getExistingPermit(address)

    if (!permit) {
      throw new Error('No permit found')
    }

    return (
      await this.queryClient.fetchQuery(
        secretDaoDaoCoreQueries.votingPowerAtHeight({
          chainId: this.options.chainId,
          contractAddress: this.options.coreAddress,
          args: {
            auth: {
              permit,
            },
            height,
          },
        })
      )
    ).power
  }

  async getTotalVotingPower(height?: number): Promise<string> {
    return (
      await this.queryClient.fetchQuery(
        secretDaoDaoCoreQueries.totalPowerAtHeight({
          chainId: this.options.chainId,
          contractAddress: this.options.coreAddress,
          args: {
            height,
          },
        })
      )
    ).power
  }
}
