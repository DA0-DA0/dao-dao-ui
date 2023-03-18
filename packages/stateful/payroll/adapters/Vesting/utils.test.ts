import { ValidatorSlash } from '@dao-dao/state/recoil'
import {
  CwVestingSlashRegistration,
  CwVestingStakeEvent,
} from '@dao-dao/state/recoil/selectors/contracts/CwVesting'

import { VestingValidatorSlash } from './types'
import { getSlashedStakedUnstaking, getVestingValidatorSlashes } from './utils'

const UNBONDING_DURATION_SECONDS = 1000
const VALIDATOR1 = 'validator1'
const VALIDATOR2 = 'validator2'

const makeDelegation = ({
  block = 1,
  validator = VALIDATOR1,
  amount = 100,
}: {
  block?: number
  validator?: string
  amount?: number
} = {}): CwVestingStakeEvent => ({
  blockHeight: block.toString(),
  blockTimeUnixMs: block.toString(),
  type: 'delegate',
  validator,
  amount: amount.toString(),
})

const makeUndelegation = ({
  block = 1,
  validator = VALIDATOR1,
  amount = 100,
}: {
  block?: number
  validator?: string
  amount?: number
} = {}): CwVestingStakeEvent => ({
  blockHeight: block.toString(),
  blockTimeUnixMs: block.toString(),
  type: 'undelegate',
  validator,
  amount: amount.toString(),
})

const makeRedelegation = ({
  block = 1,
  fromValidator = VALIDATOR1,
  toValidator = VALIDATOR2,
  amount = 100,
}: {
  block?: number
  fromValidator?: string
  toValidator?: string
  amount?: number
} = {}): CwVestingStakeEvent => ({
  blockHeight: block.toString(),
  blockTimeUnixMs: block.toString(),
  type: 'redelegate',
  fromValidator,
  toValidator,
  amount: amount.toString(),
})

const makeSlashRegistration = ({
  validator = VALIDATOR1,
  timeMs = 1,
  amount = 100,
  duringUnbonding = false,
}: {
  validator?: string
  timeMs?: number
  amount?: number
  duringUnbonding?: boolean
} = {}): CwVestingSlashRegistration => ({
  validator,
  // Milliseconds to nanoseconds.
  time: (timeMs * 1e6).toString(),
  amount: amount.toString(),
  duringUnbonding,
})

const makeSlash = ({
  registeredBlock = 2,
  infractionBlock = 1,
  slashFactor = 0.1,
  amountSlashed = 100,
}: {
  registeredBlock?: number
  infractionBlock?: number
  slashFactor?: number
  amountSlashed?: number
} = {}): ValidatorSlash => ({
  registeredBlockHeight: registeredBlock.toString(),
  registeredBlockTimeUnixMs: registeredBlock.toString(),
  infractionBlockHeight: infractionBlock.toString(),
  slashFactor: slashFactor.toString(),
  amountSlashed: amountSlashed.toString(),
})

const makeVestingValidatorSlash = ({
  timeMs = 2,
  amount = 100,
  unregisteredAmount = 0,
  duringUnbonding = false,
}: Partial<VestingValidatorSlash> = {}): VestingValidatorSlash => ({
  timeMs,
  amount,
  unregisteredAmount,
  duringUnbonding,
})

describe('getSlashedStakedUnstaking', () => {
  it('returns 0 when no events', () => {
    const slash = makeSlash()

    expect(
      getSlashedStakedUnstaking(
        {
          stakeEvents: [],
          slashRegistrations: [],
        },
        UNBONDING_DURATION_SECONDS,
        VALIDATOR1,
        [slash],
        slash
      )
    ).toEqual({
      staked: 0,
      unstaking: 0,
    })
  })
})

describe('getVestingValidatorSlashes', () => {
  // no stake events, no slashes
  it('returns empty array when no events nor slashes', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [],
          slashRegistrations: [],
        },
        UNBONDING_DURATION_SECONDS,
        []
      )
    ).toEqual([])
  })

  // 1 delegation, no slashes
  it('returns empty array when no slashes', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [makeDelegation()],
          slashRegistrations: [],
        },
        UNBONDING_DURATION_SECONDS,
        []
      )
    ).toEqual([])
  })

  // 1. delegate
  // 2. infraction
  // 3. slash infraction at 2
  it('returns an unregistered delegated slash', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [
            makeDelegation({
              block: 1,
              amount: 100,
            }),
          ],
          slashRegistrations: [],
        },
        UNBONDING_DURATION_SECONDS,
        [
          {
            validator: VALIDATOR1,
            slashes: [
              makeSlash({
                registeredBlock: 3,
                infractionBlock: 2,
                slashFactor: 0.1,
              }),
            ],
          },
        ]
      )
    ).toEqual([
      {
        validatorOperatorAddress: VALIDATOR1,
        slashes: [
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 10,
            unregisteredAmount: 10,
            duringUnbonding: false,
          }),
        ],
      },
    ])
  })

  // 1. delegate
  // 2. infraction
  // 3. undelegate
  // 4. slash infraction at 2
  it('returns an unregistered undelegating slash', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [
            makeDelegation({
              block: 1,
              amount: 100,
            }),
            makeUndelegation({
              block: 3,
              amount: 100,
            }),
          ],
          slashRegistrations: [],
        },
        UNBONDING_DURATION_SECONDS,
        [
          {
            validator: VALIDATOR1,
            slashes: [
              makeSlash({
                registeredBlock: 3,
                infractionBlock: 2,
                slashFactor: 0.1,
              }),
            ],
          },
        ]
      )
    ).toEqual([
      {
        validatorOperatorAddress: VALIDATOR1,
        slashes: [
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 10,
            unregisteredAmount: 10,
            duringUnbonding: true,
          }),
        ],
      },
    ])
  })

  // 1. delegate
  // 2. infraction
  // 3. redelegate
  // 4. slash infraction at 2
  it('returns an unregistered undelegating slash from a redelegation', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [
            makeDelegation({
              block: 1,
              amount: 100,
            }),
            makeRedelegation({
              block: 3,
              amount: 100,
            }),
          ],
          slashRegistrations: [],
        },
        UNBONDING_DURATION_SECONDS,
        [
          {
            validator: VALIDATOR1,
            slashes: [
              makeSlash({
                registeredBlock: 3,
                infractionBlock: 2,
                slashFactor: 0.1,
              }),
            ],
          },
        ]
      )
    ).toEqual([
      {
        validatorOperatorAddress: VALIDATOR1,
        slashes: [
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 10,
            unregisteredAmount: 10,
            duringUnbonding: true,
          }),
        ],
      },
    ])
  })

  // 1. delegate
  // 2. infraction
  // 3. undelegate some
  // 4. slash infraction at 2
  it('returns unregistered delegated and undelegating slashes', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [
            makeDelegation({
              block: 1,
              amount: 100,
            }),
            makeUndelegation({
              block: 3,
              amount: 20,
            }),
          ],
          slashRegistrations: [],
        },
        UNBONDING_DURATION_SECONDS,
        [
          {
            validator: VALIDATOR1,
            slashes: [
              makeSlash({
                registeredBlock: 3,
                infractionBlock: 2,
                slashFactor: 0.1,
              }),
            ],
          },
        ]
      )
    ).toEqual([
      {
        validatorOperatorAddress: VALIDATOR1,
        slashes: [
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 8,
            unregisteredAmount: 8,
            duringUnbonding: false,
          }),
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 2,
            unregisteredAmount: 2,
            duringUnbonding: true,
          }),
        ],
      },
    ])
  })

  // 1. delegate
  // 2. infraction
  // 3. redelegate some
  // 4. slash infraction at 2
  it('returns unregistered delegated and undelegating slashes from redelegation', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [
            makeDelegation({
              block: 1,
              amount: 100,
            }),
            makeRedelegation({
              block: 3,
              amount: 20,
            }),
          ],
          slashRegistrations: [],
        },
        UNBONDING_DURATION_SECONDS,
        [
          {
            validator: VALIDATOR1,
            slashes: [
              makeSlash({
                registeredBlock: 3,
                infractionBlock: 2,
                slashFactor: 0.1,
              }),
            ],
          },
        ]
      )
    ).toEqual([
      {
        validatorOperatorAddress: VALIDATOR1,
        slashes: [
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 8,
            unregisteredAmount: 8,
            duringUnbonding: false,
          }),
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 2,
            unregisteredAmount: 2,
            duringUnbonding: true,
          }),
        ],
      },
    ])
  })

  // 1. delegate
  // 2. infraction
  // 3. slash infraction at 2
  // 4. register slash
  it('returns a registered delegated slash', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [
            makeDelegation({
              block: 1,
              amount: 100,
            }),
          ],
          slashRegistrations: [
            makeSlashRegistration({
              timeMs: 3,
              amount: 10,
              duringUnbonding: false,
            }),
          ],
        },
        UNBONDING_DURATION_SECONDS,
        [
          {
            validator: VALIDATOR1,
            slashes: [
              makeSlash({
                registeredBlock: 3,
                infractionBlock: 2,
                slashFactor: 0.1,
              }),
            ],
          },
        ]
      )
    ).toEqual([
      {
        validatorOperatorAddress: VALIDATOR1,
        slashes: [
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 10,
            unregisteredAmount: 0,
            duringUnbonding: false,
          }),
        ],
      },
    ])
  })

  // 1. delegate
  // 2. infraction
  // 3. undelegate
  // 4. slash infraction at 2
  // 5. register slash
  it('returns a registered undelegating slash', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [
            makeDelegation({
              block: 1,
              amount: 100,
            }),
            makeUndelegation({
              block: 3,
              amount: 100,
            }),
          ],
          slashRegistrations: [
            makeSlashRegistration({
              timeMs: 3,
              amount: 10,
              duringUnbonding: true,
            }),
          ],
        },
        UNBONDING_DURATION_SECONDS,
        [
          {
            validator: VALIDATOR1,
            slashes: [
              makeSlash({
                registeredBlock: 3,
                infractionBlock: 2,
                slashFactor: 0.1,
              }),
            ],
          },
        ]
      )
    ).toEqual([
      {
        validatorOperatorAddress: VALIDATOR1,
        slashes: [
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 10,
            unregisteredAmount: 0,
            duringUnbonding: true,
          }),
        ],
      },
    ])
  })

  // 1. delegate
  // 2. infraction
  // 3. undelegate some
  // 4. slash infraction at 2
  // 5. register slash
  it('returns registered delegated and undelegating slashes', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [
            makeDelegation({
              block: 1,
              amount: 100,
            }),
            makeUndelegation({
              block: 3,
              amount: 20,
            }),
          ],
          slashRegistrations: [
            makeSlashRegistration({
              timeMs: 3,
              amount: 8,
              duringUnbonding: false,
            }),
            makeSlashRegistration({
              timeMs: 3,
              amount: 2,
              duringUnbonding: true,
            }),
          ],
        },
        UNBONDING_DURATION_SECONDS,
        [
          {
            validator: VALIDATOR1,
            slashes: [
              makeSlash({
                registeredBlock: 3,
                infractionBlock: 2,
                slashFactor: 0.1,
              }),
            ],
          },
        ]
      )
    ).toEqual([
      {
        validatorOperatorAddress: VALIDATOR1,
        slashes: [
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 8,
            unregisteredAmount: 0,
            duringUnbonding: false,
          }),
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 2,
            unregisteredAmount: 0,
            duringUnbonding: true,
          }),
        ],
      },
    ])
  })

  // 1. delegate
  // 2. infraction
  // 3. redelegate
  // 4. slash infraction at 2
  // 5. register slash
  it('returns a registered undelegating slash from a redelegation', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [
            makeDelegation({
              block: 1,
              amount: 100,
            }),
            makeRedelegation({
              block: 3,
              amount: 100,
            }),
          ],
          slashRegistrations: [
            makeSlashRegistration({
              timeMs: 3,
              amount: 10,
              duringUnbonding: true,
            }),
          ],
        },
        UNBONDING_DURATION_SECONDS,
        [
          {
            validator: VALIDATOR1,
            slashes: [
              makeSlash({
                registeredBlock: 3,
                infractionBlock: 2,
                slashFactor: 0.1,
              }),
            ],
          },
        ]
      )
    ).toEqual([
      {
        validatorOperatorAddress: VALIDATOR1,
        slashes: [
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 10,
            unregisteredAmount: 0,
            duringUnbonding: true,
          }),
        ],
      },
    ])
  })

  // 1. delegate
  // 2. infraction
  // 3. undelegate some
  // 4. slash infraction at 2
  // 5. register slash
  it('returns registered delegated and undelegating slashes from a redelegation', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [
            makeDelegation({
              block: 1,
              amount: 100,
            }),
            makeRedelegation({
              block: 3,
              amount: 20,
            }),
          ],
          slashRegistrations: [
            makeSlashRegistration({
              timeMs: 3,
              amount: 8,
              duringUnbonding: false,
            }),
            makeSlashRegistration({
              timeMs: 3,
              amount: 2,
              duringUnbonding: true,
            }),
          ],
        },
        UNBONDING_DURATION_SECONDS,
        [
          {
            validator: VALIDATOR1,
            slashes: [
              makeSlash({
                registeredBlock: 3,
                infractionBlock: 2,
                slashFactor: 0.1,
              }),
            ],
          },
        ]
      )
    ).toEqual([
      {
        validatorOperatorAddress: VALIDATOR1,
        slashes: [
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 8,
            unregisteredAmount: 0,
            duringUnbonding: false,
          }),
          makeVestingValidatorSlash({
            timeMs: 3,
            amount: 2,
            unregisteredAmount: 0,
            duringUnbonding: true,
          }),
        ],
      },
    ])
  })

  // 1. delegate
  // 2. undelegate some
  // 3. redelegate the rest
  // 4. infraction
  // 5. slash infraction at 4
  it('returns no slash if undelegate and redelegate before slash', () => {
    expect(
      getVestingValidatorSlashes(
        {
          stakeEvents: [
            makeDelegation({
              block: 1,
              amount: 100,
            }),
            makeUndelegation({
              block: 2,
              amount: 40,
            }),
            makeRedelegation({
              block: 3,
              amount: 60,
            }),
          ],
          slashRegistrations: [],
        },
        UNBONDING_DURATION_SECONDS,
        [
          {
            validator: VALIDATOR1,
            slashes: [
              makeSlash({
                registeredBlock: 5,
                infractionBlock: 4,
                slashFactor: 0.1,
              }),
            ],
          },
        ]
      )
    ).toEqual([
      {
        validatorOperatorAddress: VALIDATOR1,
        slashes: [],
      },
    ])
  })
})
