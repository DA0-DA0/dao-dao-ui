/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next'

import { CopyToClipboard } from '@dao-dao/stateless'
import { DaoCreationGovernanceConfigReviewProps } from '@dao-dao/types'

import { CreatorData, GovernanceTokenType, NftVotingModuleType } from './types'

export const GovernanceConfigurationReview = ({
  data,
}: DaoCreationGovernanceConfigReviewProps<CreatorData>) => {
  const { t } = useTranslation()

  const isNewRolesCollection =
    data.votingModuleType === NftVotingModuleType.Roles &&
    data.tokenType === GovernanceTokenType.New

  return (
    <div className="rounded-lg bg-background-tertiary">
      <div className="flex h-14 flex-row border-b border-border-base p-4">
        <p className="primary-text text-text-body">
          {isNewRolesCollection
            ? // eslint-disable-next-line i18next/no-literal-string
              'Role NFT collection'
            : t('title.nftCollection')}
        </p>
      </div>

      <div className="space-y-4 p-4">
        {isNewRolesCollection ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="caption-text text-text-tertiary">
                  {t('form.name')}
                </p>
                <p className="primary-text text-text-body">
                  {data.newInfo.name}
                </p>
              </div>

              <div>
                <p className="caption-text text-text-tertiary">
                  {t('form.symbol')}
                </p>
                <p className="primary-text text-text-body">
                  ${data.newInfo.symbol}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="caption-text text-text-tertiary">
                {/* eslint-disable-next-line i18next/no-literal-string */}
                Voting module: dao-voting-cw721-roles
              </p>
              <p className="primary-text text-text-body">
                {/* eslint-disable-next-line i18next/no-literal-string */}
                Initial role NFTs ({data.initialNfts.length})
              </p>

              <div className="space-y-2">
                {data.initialNfts.map(
                  ({ owner, tokenId, role, weight }, index) => (
                    <div
                      key={index}
                      className="rounded-md border border-border-secondary p-3"
                    >
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div>
                          <p className="caption-text text-text-tertiary">
                            {/* eslint-disable-next-line i18next/no-literal-string */}
                            Owner
                          </p>
                          <CopyToClipboard takeAll value={owner} />
                        </div>

                        <div>
                          <p className="caption-text text-text-tertiary">
                            {/* eslint-disable-next-line i18next/no-literal-string */}
                            Token ID
                          </p>
                          <p className="primary-text text-text-body">
                            {tokenId}
                          </p>
                        </div>

                        <div>
                          <p className="caption-text text-text-tertiary">
                            {/* eslint-disable-next-line i18next/no-literal-string */}
                            Role
                          </p>
                          <p className="primary-text text-text-body">
                            {role || '—'}
                          </p>
                        </div>

                        <div>
                          <p className="caption-text text-text-tertiary">
                            {/* eslint-disable-next-line i18next/no-literal-string */}
                            Weight
                          </p>
                          <p className="primary-text text-text-body">
                            {weight}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <CopyToClipboard
              takeAll
              value={data.existingGovernanceNftCollectionAddress}
            />

            {data.existingCollectionInfo && (
              <p className="primary-text text-text-interactive-valid">
                ${data.existingCollectionInfo.symbol}
              </p>
            )}

            {data.votingModuleType === NftVotingModuleType.Roles && (
              <p className="caption-text text-text-tertiary">
                {/* eslint-disable-next-line i18next/no-literal-string */}
                Voting module: dao-voting-cw721-roles
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
