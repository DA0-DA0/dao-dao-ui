import { DurationUnits, ProposalVetoConfig } from '@dao-dao/types'
import {
  ProposalStatus,
  ProposalStatusKey,
} from '@dao-dao/types/contracts/common'
import {
  ProposalStatus as PreProposeStatus,
  ProposalStatusKey as PreProposeStatusKey,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import { VetoConfig } from '@dao-dao/types/contracts/DaoProposalSingle.v2'

import {
  convertDurationToDurationWithUnits,
  convertDurationWithUnitsToDuration,
} from './conversion'

// Get the status key from the weirdly-formatted status enum.
export const keyFromPreProposeStatus = (
  status: PreProposeStatus
): PreProposeStatusKey => Object.keys(status)[0] as PreProposeStatusKey

/**
 * Returns the flattened key of the proposal status.
 *
 * @param {ProposalStatus} status - The proposal status.
 * @return {ProposalStatusKey} The flattened key of the proposal status.
 */
export const getProposalStatusKey = (
  status: ProposalStatus
): ProposalStatusKey =>
  typeof status === 'string'
    ? status
    : typeof status === 'object' && status
    ? (Object.keys(status)[0] as any)
    : (() => {
        throw new Error('Invalid proposal status.')
      })()

/**
 * Convert veto config into the veto object expected by proposal modules.
 */
export const convertVetoConfigToCosmos = (
  veto: ProposalVetoConfig
): VetoConfig | null =>
  veto.enabled
    ? {
        vetoer:
          // If more than one address set, there should be a cw1-whitelist
          // contract created. Otherwise, use the first address.
          veto.addresses.length > 1
            ? veto.cw1WhitelistAddress || ''
            : veto.addresses.length === 1
            ? veto.addresses[0].address
            : '',
        timelock_duration: convertDurationWithUnitsToDuration(
          veto.timelockDuration
        ),
        early_execute: veto.earlyExecute,
        veto_before_passed: veto.vetoBeforePassed,
      }
    : null

/**
 * Convert proposal module veto config into custom veto type. If config is
 * empty, returns default.
 */
export const convertCosmosVetoConfigToVeto = (
  veto: VetoConfig | null | undefined,
  // If provided, `veto.vetoer` should be a cw1-whitelist contract address, and
  // this should be its list of admins.
  cw1WhitelistAdmins?: string[]
): ProposalVetoConfig =>
  veto
    ? {
        enabled: true,
        addresses: cw1WhitelistAdmins?.map((address) => ({
          address,
        })) || [
          {
            address: veto.vetoer,
          },
        ],
        cw1WhitelistAddress: cw1WhitelistAdmins ? veto.vetoer : undefined,
        timelockDuration: convertDurationToDurationWithUnits(
          veto.timelock_duration
        ),
        earlyExecute: veto.early_execute,
        vetoBeforePassed: veto.veto_before_passed,
      }
    : {
        enabled: false,
        addresses: [
          {
            address: '',
          },
        ],
        cw1WhitelistAddress: undefined,
        timelockDuration: {
          value: 1,
          units: DurationUnits.Weeks,
        },
        earlyExecute: true,
        vetoBeforePassed: false,
      }
