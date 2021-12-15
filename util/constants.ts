export const DAO_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_DAO_CONTRACT_CODE_ID as string,
  10
)

export const CW20_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_DAO_TOKEN_CODE_ID as string,
  10
)

export const MULTISIG_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_MULTISIG_CODE_ID as string,
  10
)

export const C4_GROUP_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_C4_GROUP_CODE_ID as string,
  10
)

export const STATUS_COLORS: { [key: string]: string } = {
  open: '#00BAFF',
  executed: '#53D0C9',
  passed: '#6A78FF',
  rejected: '#ED5276',
}
