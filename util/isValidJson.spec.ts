import 'jest'
import isValidJson from './isValidJson'

const goodInputs = [
  [
    {
      bank: {
        send: {
          '@type': '/cosmos.bank.v1beta1.MsgSend',
          from_address: 'wasm1nc5tatafv6eyq7llkr2gv50ff9e22mnfhap4vz',
          to_address: 'wasm19mfj3r5g5yqsjcxk5ey76mfm9ed6x8a333lxzr',
          amount: [{ amount: '666', denom: 'ustake' }],
        },
      },
    },
  ],
  [{ bank: { send: { '@type': '/cosmos.bank.v1beta1.MsgSend' } } }],
]
const badInputs = [
  1, // numbers?
  'hi', // strings?
  isValidJson, // methods?
  ['naughty'],
  [{ bank: { send: {} } }],
  { body: { messages: [{ '@type': '/cosmos.bank.v1beta1.MsgSend' }] } },
  // good but a string?
  '[{"bank":{"send":{"@type":"/cosmos.bank.v1beta1.MsgSend","from_address":"wasm1nc5tatafv6eyq7llkr2gv50ff9e22mnfhap4vz","to_address":"wasm19mfj3r5g5yqsjcxk5ey76mfm9ed6x8a333lxzr","amount":[{"amount":"666","denom":"ustake"}]}}}],',
  // @type is not a string
  [{ bank: { send: { '@type': 5 } } }],
  // @type is a list!
  [{ bank: { send: { '@type': [1, 2] } } }],
  // @type is an empty string!
  [{ bank: { send: { '@type': '' } } }],
]

describe('isValidJson', () => {
  it('should accept good json', () => {
    goodInputs.forEach((input) => expect(isValidJson(input)).toBe(true))
  })
  it('should reject bad json', () => {
    badInputs.forEach((input) => expect(isValidJson(input)).toBe(false))
  })
})
