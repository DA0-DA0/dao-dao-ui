import { Chain } from '@chain-registry/types'
import type { GetStaticProps } from 'next'
import { TFunction } from 'next-i18next'
import removeMarkdown from 'remove-markdown'

import { serverSideTranslationsWithServerT } from '@dao-dao/i18n/serverSideTranslations'
import { cosmos } from '@dao-dao/protobuf'
import {
  ContractVersion,
  GovProposalVersion,
  GovProposalWithDecodedContent,
} from '@dao-dao/types'
import {
  CI,
  DAO_STATIC_PROPS_CACHE_SECONDS,
  MAX_META_CHARS_PROPOSAL_DESCRIPTION,
  SITE_URL,
  cosmosSdkVersionIs47OrHigher,
  decodeGovProposal,
  getGovProposalPath,
  getImageUrlForChainId,
  getRpcForChainId,
  getSupportedChains,
  processError,
} from '@dao-dao/utils'

import { GovPageWrapperProps } from '../components'

interface GetGovStaticPropsMakerProps {
  leadingTitle?: string
  followingTitle?: string
  overrideTitle?: string
  overrideDescription?: string
  additionalProps?: Record<string, any> | null | undefined
  url?: string
}

interface GetGovStaticPropsMakerOptions {
  getProps?: (options: {
    context: Parameters<GetStaticProps>[0]
    t: TFunction
    chainName: string
    chain: Chain
  }) =>
    | GetGovStaticPropsMakerProps
    | undefined
    | null
    | Promise<GetGovStaticPropsMakerProps | undefined | null>
}

type GetGovStaticPropsMaker = (
  options?: GetGovStaticPropsMakerOptions
) => GetStaticProps<GovPageWrapperProps>

export const makeGetGovStaticProps: GetGovStaticPropsMaker =
  ({ getProps } = {}) =>
  async (context) => {
    // Don't query chain if running in CI.
    if (CI) {
      return { notFound: true }
    }

    // Load server translations and get T function for use in getProps.
    const { i18nProps, serverT } = await serverSideTranslationsWithServerT(
      context.locale,
      ['translation']
    )

    const supportedChain = context.params?.chain
      ? getSupportedChains().find(({ name }) => name === context.params?.chain)
      : undefined

    if (!supportedChain) {
      // Excluding `info` will render not found.
      return {
        props: {
          ...i18nProps,
          title: 'Chain not found',
          description: '',
        },
        // Regenerate the page at most once per second. Serves cached copy and
        // refreshes in background.
        revalidate: 1,
      }
    }

    const { chain, accentColor } = supportedChain

    // Must be called after server side translations has been awaited, because
    // props may use the `t` function, and it won't be available until after.
    const {
      leadingTitle,
      followingTitle,
      overrideTitle,
      overrideDescription,
      additionalProps,
      url,
    } =
      (await getProps?.({
        context,
        t: serverT,
        chainName: context.params!.chain as string,
        chain,
      })) ?? {}

    const props: GovPageWrapperProps = {
      ...i18nProps,
      url: url ?? null,
      title:
        overrideTitle ??
        [leadingTitle?.trim(), chain.pretty_name.trim(), followingTitle?.trim()]
          .filter(Boolean)
          .join(' | '),
      description: overrideDescription ?? '',
      accentColor,
      serializedInfo: {
        chainId: chain.chain_id,
        coreAddress: supportedChain.name,
        coreVersion: ContractVersion.Gov,
        votingModuleAddress: '',
        votingModuleContractName: '',
        proposalModules: [],
        name: chain.pretty_name,
        description: '',
        imageUrl: getImageUrlForChainId(chain.chain_id),
        created: null,
        isActive: true,
        activeThreshold: null,
        items: {},
        polytoneProxies: {},
        parentDao: null,
        admin: '',
      },
      ...additionalProps,
    }

    return {
      props,
      // Regenerate the page at most once per `revalidate` seconds. Serves
      // cached copy and refreshes in background.
      revalidate: DAO_STATIC_PROPS_CACHE_SECONDS,
    }
  }

interface GetGovProposalStaticPropsMakerOptions
  extends Omit<GetGovStaticPropsMakerOptions, 'getProps'> {
  proposalIdParamKey?: string
}

export const makeGetGovProposalStaticProps = ({
  proposalIdParamKey = 'proposalId',
  ...options
}: GetGovProposalStaticPropsMakerOptions = {}) =>
  makeGetGovStaticProps({
    ...options,
    getProps: async ({ context: { params = {} }, t, chain }) => {
      const proposalId = params[proposalIdParamKey]

      // If invalid proposal ID, not found.
      if (typeof proposalId !== 'string') {
        return {
          followingTitle: t('title.proposalNotFound'),
          additionalProps: {
            proposalId: null,
          },
        }
      }

      const url =
        SITE_URL + getGovProposalPath(params.chain as string, proposalId)

      let proposal: GovProposalWithDecodedContent | null = null
      try {
        const client = (
          await cosmos.ClientFactory.createRPCQueryClient({
            rpcEndpoint: getRpcForChainId(chain.chain_id),
          })
        ).cosmos
        const cosmosSdkVersion =
          (
            await client.base.tendermint.v1beta1.getNodeInfo()
          ).applicationVersion?.cosmosSdkVersion.slice(1) || '0.0.0'

        if (cosmosSdkVersionIs47OrHigher(cosmosSdkVersion)) {
          try {
            const proposalV1 = (
              await client.gov.v1.proposal({
                proposalId: BigInt(proposalId),
              })
            ).proposal
            if (!proposalV1) {
              throw new Error('NOT_FOUND')
            }

            proposal = decodeGovProposal({
              version: GovProposalVersion.V1,
              id: BigInt(proposalId),
              proposal: proposalV1,
            })
          } catch (err) {
            // Fallback to v1beta1 query if v1 not supported.
            if (
              !(err instanceof Error) ||
              !err.message.includes('unknown query path')
            ) {
              // Rethrow other errors.
              throw err
            }
          }
        }

        if (!proposal) {
          const proposalV1Beta1 = (
            await client.gov.v1beta1.proposal({
              proposalId: BigInt(proposalId),
            })
          ).proposal
          if (!proposalV1Beta1) {
            throw new Error('NOT_FOUND')
          }

          proposal = decodeGovProposal({
            version: GovProposalVersion.V1_BETA_1,
            id: BigInt(proposalId),
            proposal: proposalV1Beta1,
          })
        }
      } catch (error) {
        if (
          error instanceof Error &&
          (error.message.includes("doesn't exist: key not found") ||
            error.message === 'NOT_FOUND')
        ) {
          return {
            url,
            followingTitle: t('title.proposalNotFound'),
            // Excluding `proposalId` indicates not found.
            additionalProps: {
              proposalId: null,
            },
          }
        }

        console.error(error)
        // Report to Sentry.
        processError(error)
        // Throw error to trigger 500.
        throw new Error(t('error.unexpectedError'))
      }

      return {
        url,
        followingTitle: proposal.title,
        overrideDescription: removeMarkdown(proposal.description).slice(
          0,
          MAX_META_CHARS_PROPOSAL_DESCRIPTION
        ),
        additionalProps: {
          proposalId,
        },
      }
    },
  })
