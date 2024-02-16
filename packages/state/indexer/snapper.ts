import { SNAPPER_API_BASE } from '@dao-dao/utils'

export type QuerySnapperOptions = {
  query: string
  args?: Record<string, any>
}

export const querySnapper = async <T = any>({
  query,
  args,
}: QuerySnapperOptions): Promise<T | undefined> => {
  // Filter out undefined args.
  if (args) {
    args = Object.entries(args).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, any>)
  }

  const params = new URLSearchParams(args)

  const url = `${SNAPPER_API_BASE}/q/${query}?${params.toString()}`
  const response = await fetch(url)

  if (response.status >= 300) {
    throw new Error(
      `Error querying snapper for ${query} with params ${params.toString()}: ${
        response.status
      } ${await response.text().catch(() => '')}`.trim()
    )
  }

  return await response.json()
}
