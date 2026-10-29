import { queryOptions } from '@tanstack/react-query'

import { fetchPublicJson } from '../providers/http'
import {
  isAllowedMarket,
  parseCoinbaseQuote,
  parseKrakenQuote,
} from '../providers/prices'

export const priceQueries = {
  market: ({
    provider,
    market,
  }: {
    provider: 'coinbase' | 'kraken'
    market: string
  }) =>
    queryOptions({
      queryKey: ['prices', provider, market],
      staleTime: 60_000,
      retry: false,
      queryFn: async () => {
        if (!isAllowedMarket(provider, market)) return null
        try {
          const data = await fetchPublicJson(
            provider,
            provider === 'coinbase'
              ? `https://api.exchange.coinbase.com/products/${market}/ticker`
              : `https://api.kraken.com/0/public/Trades?pair=${market}&count=1`
          )
          return provider === 'coinbase'
            ? parseCoinbaseQuote(data, market)
            : parseKrakenQuote(data, market)
        } catch {
          return null
        }
      },
    }),
}
