import {
  CreateTokensRequest,
  CreateTokensResponse,
  FetchAuthenticatedResponse,
  FetchProfileResponse,
  FetchProfileUuidOnlyResponse,
  FetchTokensResponse,
  InvalidateTokensRequest,
  NonceResponse,
  RegisterPublicKeysRequest,
  RequestBody,
  ResolveProfileResponse,
  SearchProfilesResponse,
  UnregisterPublicKeysRequest,
  UpdateProfileRequest,
} from '@dao-dao/types/pfpk'

import { PFPK_API_BASE } from '../constants/env'

const url = (
  path: string,
  query?: [string, string][] | Record<string, string>
) =>
  PFPK_API_BASE +
  path +
  (query ? `?${new URLSearchParams(query).toString()}` : '')

export const createTokens = async (
  data: RequestBody<CreateTokensRequest>,
  token?: string
) => {
  const response = await fetch(url('/tokens'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  const body = await response.json().catch(() => ({ error: 'Unknown error' }))
  return {
    response,
    body: body as CreateTokensResponse,
    error: body.error as string | undefined,
  }
}

export const fetchAuthenticated = async (
  token?: string,
  {
    audience,
    role,
    headers,
  }: {
    audience?: string[]
    role?: string[]
    headers?: HeadersInit
  } = {}
) => {
  const response = await fetch(
    url('/auth', [
      ...(audience?.map((audience): [string, string] => [
        'audience',
        audience,
      ]) ?? []),
      ...(role?.map((role): [string, string] => ['role', role]) ?? []),
    ]),
    {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    }
  )
  const body = response.body ? await response.json() : {}
  return {
    response,
    body: body as FetchAuthenticatedResponse,
    error: body?.error as string | undefined,
  }
}

export const fetchMe = async (token: string) => {
  const response = await fetch(url('/me'), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const body = await response.json().catch(() => ({ error: 'Unknown error' }))
  return {
    response,
    body: body as FetchProfileResponse,
    error: body.error as string | undefined,
  }
}

export const fetchNonce = async (type: string, publicKey: string) => {
  const response = await fetch(url(`/nonce/${publicKey}`, { type }), {
    method: 'GET',
  })
  const body = response.body ? await response.json() : {}
  return {
    response,
    body: body as NonceResponse,
    error: body.error as string | undefined,
  }
}

export const fetchProfileViaPublicKey = async (publicKey: string) => {
  const response = await fetch(url(`/${publicKey}`), {
    method: 'GET',
  })
  const body = await response.json().catch(() => ({ error: 'Unknown error' }))
  return {
    response,
    body: body as FetchProfileResponse,
    error: body.error as string | undefined,
  }
}

export const fetchProfileUuidViaPublicKey = async (publicKey: string) => {
  const response = await fetch(url(`/${publicKey}`, { onlyUuid: 'true' }), {
    method: 'GET',
  })
  const body = await response.json().catch(() => ({ error: 'Unknown error' }))
  return {
    response,
    body: body as FetchProfileUuidOnlyResponse,
    error: body.error as string | undefined,
  }
}

export const fetchProfileViaAddress = async (bech32Address: string) => {
  const response = await fetch(url(`/address/${bech32Address}`), {
    method: 'GET',
  })
  const body = await response.json().catch(() => ({ error: 'Unknown error' }))
  return {
    response,
    body: body as FetchProfileResponse,
    error: body.error as string | undefined,
  }
}

export const fetchProfileViaAddressHex = async (addressHex: string) => {
  const response = await fetch(url(`/hex/${addressHex}`), {
    method: 'GET',
  })
  const body = await response.json().catch(() => ({ error: 'Unknown error' }))
  return {
    response,
    body: body as FetchProfileResponse,
    error: body.error as string | undefined,
  }
}

export const fetchProfileViaUuid = async (uuid: string) => {
  const response = await fetch(url(`/uuid/${uuid}`), {
    method: 'GET',
  })
  const body = await response.json().catch(() => ({ error: 'Unknown error' }))
  return {
    response,
    body: body as FetchProfileResponse,
    error: body.error as string | undefined,
  }
}

export const fetchTokens = async (token: string) => {
  const response = await fetch(url('/tokens'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  const body = await response.json().catch(() => ({ error: 'Unknown error' }))
  return {
    response,
    body: body as FetchTokensResponse,
    error: body.error as string | undefined,
  }
}

export const invalidateTokens = async (
  data: RequestBody<InvalidateTokensRequest>,
  token?: string
) => {
  const response = await fetch(url('/tokens'), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  const error =
    response.status !== 204
      ? ((await response.json().catch(() => ({ error: 'Unknown error' })))
          .error as string | undefined)
      : undefined
  return {
    response,
    error,
  }
}

export const registerPublicKeys = async (
  data: RequestBody<RegisterPublicKeysRequest>,
  token?: string
) => {
  const response = await fetch(url('/register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  const error =
    response.status !== 204
      ? ((await response.json().catch(() => ({ error: 'Unknown error' })))
          .error as string | undefined)
      : undefined
  return {
    response,
    error,
  }
}

export const resolveProfile = async (chainId: string, name: string) => {
  const response = await fetch(url(`/resolve/${chainId}/${name}`), {
    method: 'GET',
  })
  const body = await response.json().catch(() => ({ error: 'Unknown error' }))
  return {
    response,
    body: body as ResolveProfileResponse,
    error: body.error as string | undefined,
  }
}

export const searchProfiles = async (chainId: string, namePrefix: string) => {
  const response = await fetch(url(`/search/${chainId}/${namePrefix}`), {
    method: 'GET',
  })
  const body = await response.json().catch(() => ({ error: 'Unknown error' }))
  return {
    response,
    body: body as SearchProfilesResponse,
    error: body.error as string | undefined,
  }
}

export const unregisterPublicKeys = async (
  data: RequestBody<UnregisterPublicKeysRequest>,
  token?: string
) => {
  const response = await fetch(url('/unregister'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  const error =
    response.status !== 204
      ? ((await response.json().catch(() => ({ error: 'Unknown error' })))
          .error as string | undefined)
      : undefined
  return {
    response,
    error,
  }
}

export const updateProfile = async (
  data: RequestBody<UpdateProfileRequest>,
  token?: string
) => {
  const response = await fetch(url('/me'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  const error =
    response.status !== 204
      ? ((await response.json().catch(() => ({ error: 'Unknown error' })))
          .error as string | undefined)
      : undefined
  return {
    response,
    error,
  }
}
