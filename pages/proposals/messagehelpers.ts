const DAO_ADDRESS = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS || '';
const DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || '';

export function makeSpender(to_address: string) {
  return (amount: string) => {
    return [
      {
        bank: {
          send: {
            '@type': '/cosmos.bank.v1beta1.MsgSend',
            from_address: DAO_ADDRESS,
            to_address,
            amount: [
              {
                amount,
                denom: DENOM,
              },
            ],
          },
        },
      },
    ];
  };
}
