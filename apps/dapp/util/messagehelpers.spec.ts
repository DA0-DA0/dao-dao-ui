import 'jest'

import {
  makeBankMessage,
  makeWasmMessage,
  TYPE_KEY,
  BANK_SEND_TYPE,
} from './messagehelpers'

describe('messagehelpers', () => {
  describe('bank', () => {
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
  })

  describe('wasm', () => {
    it('should work with execute messages', () => {
      const expected = {
        wasm: {
          execute: {
            contract_addr: 'wasm1yyca08xqdgvjz0psg56z67ejh9xms6l49ntww0',
            msg: 'eyJtaW50Ijp7InJlY2lwaWVudCI6Indhc20xbmM1dGF0YWZ2NmV5cTdsbGtyMmd2NTBmZjllMjJtbmZoYXA0dnoiLCJhbW91bnQiOiIxMDAwMDAwMDAifX0=',
            funds: [],
          },
        },
      }
      const msg = makeWasmMessage({
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
      expect(msg).toEqual(expected)
    })

    it('should work with instantiate messages', () => {
      const expected = {
        wasm: {
          instantiate: {
            code_id: 0,
            msg: 'eyJzdXBwbHkiOiIxMDAwMDAwMDAwIiwiYWRtaW4iOmZhbHNlfQ==',
            funds: [],
            label: 'test',
          },
        },
      }
      const msg = makeWasmMessage({
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
      expect(msg).toEqual(expected)
    })

    it('should work with migrate messages', () => {
      const expected = {
        wasm: {
          migrate: {
            contract_addr: 'wasm1yyca08xqdgvjz0psg56z67ejh9xms6l49ntww0',
            msg: 'eyJtaW50Ijp7InJlY2lwaWVudCI6Indhc20xbmM1dGF0YWZ2NmV5cTdsbGtyMmd2NTBmZjllMjJtbmZoYXA0dnoiLCJhbW91bnQiOiIxMDAwMDAwMDAifX0=',
            new_code_id: 100,
          },
        },
      }
      const msg = makeWasmMessage({
        wasm: {
          migrate: {
            contract_addr: 'wasm1yyca08xqdgvjz0psg56z67ejh9xms6l49ntww0',
            msg: {
              mint: {
                recipient: 'wasm1nc5tatafv6eyq7llkr2gv50ff9e22mnfhap4vz',
                amount: '100000000',
              },
            },
            new_code_id: 100,
          },
        },
      })
      expect(msg).toEqual(expected)
    })

    it('should pass through an update admin message without modifying', () => {
      const expected = {
        wasm: {
          update_admin: {
            admin:
              'juno1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq68ev2p',
            contract_addr:
              'juno1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq68ev2p',
          },
        },
      }
      const msg = makeWasmMessage(expected)
      expect(msg).toEqual(expected)
    })

    it('should pass through a clear admin message without modifying', () => {
      const expected = {
        wasm: {
          clear_admin: {
            contract_addr:
              'juno1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq68ev2p',
          },
        },
      }
      const msg = makeWasmMessage(expected)
      expect(msg).toEqual(expected)
    })
  })
})
