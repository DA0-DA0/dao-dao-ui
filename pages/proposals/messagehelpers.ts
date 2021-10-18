const DAO_ADDRESS = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS || '';
const DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || '';

export function makeSpender(to_address: string) {
  const spendBase = {
    // '@type': '/cosmos.bank.v1beta1.MsgSend',
    bank: 'send',
    from_address: DAO_ADDRESS,
    to_address
  };
  const amountBase = {
    denom: DENOM,
  };
  return (amount: string) => {
    return {
      ...spendBase,
      amount: [
        {
          ...amountBase,
          amount,
        },
      ],
    };
  };
}

export function buildOutgoingMessage(msg: any) {
  return {
    body: {
      messages: [msg],
      memo: '',
      timeout_height: '0',
      extension_options: [],
      non_critical_extension_options: [],
    },
    auth_info: {
      signer_infos: [],
      fee: { amount: [], gas_limit: '200000', payer: '', granter: '' },
    },
    signatures: [],
  };
}
