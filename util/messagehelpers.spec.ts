import 'jest'

import { makeBankMessage, TYPE_KEY, BANK_SEND_TYPE } from './messagehelpers'

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
})
