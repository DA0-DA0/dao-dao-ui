import 'jest'

import {
  makeBankMessage,
  makeWasmMessage,
  TYPE_KEY,
  BANK_SEND_TYPE,
} from './messagehelpers'

describe('messagehelpers', () => {
  it('should make a spend message', () => {
    const expectedBankMessage = {
      send: {
        [TYPE_KEY]: BANK_SEND_TYPE,
        from_address: 'dao_address',
        to_address: 'send_address',
        amount: [{ amount: '9', denom: 'test_denom' }],
      },
    }
    const bankMessage = makeBankMessage(
      '9',
      'send_address',
      'dao_address',
      'test_denom'
    ) as any
    // Throw in a test that the helper is making bank messages correctly:
    expect(bankMessage).toEqual(expectedBankMessage)
  })

  it('should make a custom wasm messages', () => {
    // Should work with execute messages
    const expectedWasmExecuteMessage = {
      wasm: {
        execute: {
          contract_addr: 'wasm1yyca08xqdgvjz0psg56z67ejh9xms6l49ntww0',
          msg: 'eyJtaW50Ijp7InJlY2lwaWVudCI6Indhc20xbmM1dGF0YWZ2NmV5cTdsbGtyMmd2NTBmZjllMjJtbmZoYXA0dnoiLCJhbW91bnQiOiIxMDAwMDAwMDAifX0=',
          funds: [],
        },
      },
    }
    const wasmExecuteMsg = makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: 'wasm1yyca08xqdgvjz0psg56z67ejh9xms6l49ntww0',
          msg: {
            mint: {
              recipient: 'wasm1nc5tatafv6eyq7llkr2gv50ff9e22mnfhap4vz',
              amount: '100000000',
            },
          },
          funds: [],
        },
      },
    })
    expect(wasmExecuteMsg).toEqual(expectedWasmExecuteMessage)

    // Should work with instantiate messages
    const expectedWasmInstantiateMessage = {
      wasm: {
        instantiate: {
          code_id: 0,
          msg: 'eyJzdXBwbHkiOiIxMDAwMDAwMDAwIiwiYWRtaW4iOmZhbHNlfQ==',
          funds: [],
          label: 'test',
        },
      },
    }
    const wasmInstantiateMsg = makeWasmMessage({
      wasm: {
        instantiate: {
          code_id: 0,
          msg: {
            supply: '1000000000',
            admin: false,
          },
          funds: [],
          label: 'test',
        },
      },
    })
    expect(wasmInstantiateMsg).toEqual(expectedWasmInstantiateMessage)
  })
})
