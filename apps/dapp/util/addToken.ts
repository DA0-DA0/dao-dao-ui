import { getKeplrFromWindow } from '@keplr-wallet/stores'

import i18n from '@dao-dao/i18n'
import { CHAIN_ID } from '@dao-dao/utils'

import { errorNotify, successNotify } from './toast'

export const addToken = async (address: string) => {
  if (typeof window === 'undefined') return

  try {
    const keplr = await getKeplrFromWindow()

    if (keplr) {
      await keplr.suggestToken(CHAIN_ID, address)
      successNotify(i18n.t('success.addedToken'))
    }
  } catch (err) {
    console.error(err)
    errorNotify(err instanceof Error ? err.message : `${err}`)
  }
}
