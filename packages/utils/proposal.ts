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
        vetoer: veto.address,
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
  veto: VetoConfig | null | undefined
): ProposalVetoConfig =>
  veto
    ? {
        enabled: true,
        address: veto.vetoer,
        timelockDuration: convertDurationToDurationWithUnits(
          veto.timelock_duration
        ),
        earlyExecute: veto.early_execute,
        vetoBeforePassed: veto.veto_before_passed,
      }
    : {
        enabled: false,
        address: '',
        timelockDuration: {
          value: 1,
          units: DurationUnits.Weeks,
        },
        earlyExecute: true,
        vetoBeforePassed: false,
      }
