import { ArrowForwardIos, Gavel } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { latestProposalSaveAtom } from '@dao-dao/state/recoil'
import {
  ErrorPage,
  Loader,
  Modal,
  Popup,
  Tooltip,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ActionMap,
  ContractVersion,
  GovernanceProposalActionData,
  IDaoBase,
  SingleChoiceNewProposalForm,
} from '@dao-dao/types'

import { useUpdateNavigatingHref } from '../../hooks'
import { ButtonLink } from '../ButtonLink'
import { IconButtonLink } from '../IconButtonLink'

export type ProposalActionShoppingCartProps = {
  /**
   * The mode of the shopping cart. The modal mode will show a modal with the
   * shopping cart. The nav mode will show a button that opens a popup or links
   * directly to the proposal creation page based on whether or not there are
   * pending actions, to be used in the header for navigation.
   */
  mode: 'modal' | 'nav'
  /**
   * The DAO.
   */
  dao: IDaoBase
  /**
   * The action map for the current action context.
   */
  actionMap: ActionMap
  /**
   * Whether or not to show actions loading indicators. If a number, will show
   * that many lines of loading indicators.
   *
   * Defaults to false.
   */
  loading?: boolean | number
  /**
   * An error to show.
   */
  error?: Error
  /**
   * Override the modal subtitle.
   */
  modalSubtitleOverride?: string
  /**
   * The close callback for the modal.
   */
  onClose?: () => void
}

export const ProposalActionShoppingCart = ({
  mode,
  dao,
  actionMap,
  loading = false,
  error,
  modalSubtitleOverride,
  onClose,
}: ProposalActionShoppingCartProps) => {
  const { t } = useTranslation()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const [modalVisible, setModalVisible] = useState(true)

  const { navigatingToHref } = useUpdateNavigatingHref()
  const createProposalHref = getDaoProposalPath(dao.coreAddress, 'create')
  const navigating = navigatingToHref === createProposalHref

  const proposalSave = useRecoilValue<
    SingleChoiceNewProposalForm & GovernanceProposalActionData
  >(latestProposalSaveAtom(dao.proposalSaveLocalStorageKey))
  const actions =
    (dao.coreVersion === ContractVersion.Gov
      ? proposalSave?._actionData
      : proposalSave?.actionData
    )?.flatMap(({ actionKey }) => actionMap[actionKey] || []) || []

  const content = (
    <div className="flex flex-col gap-2 py-3 grow overflow-y-auto">
      {actions.map((action, index) => (
        <div
          key={`${index}-${action.key}`}
          className={clsx(
            'flex flex-row items-center gap-2',
            mode === 'modal' ? 'px-6' : 'px-4'
          )}
        >
          <p className={clsx(mode === 'modal' ? 'text-xl' : 'text-lg')}>
            <action.metadata.Icon />
          </p>

          <p
            className={clsx(
              mode === 'modal' ? 'primary-text' : 'secondary-text'
            )}
          >
            {action.metadata.label}
          </p>
        </div>
      ))}

      {!!loading &&
        [...Array(loading === true ? 1 : loading)].map((_, index) => (
          <div
            key={index}
            className={clsx(
              'flex flex-row items-center gap-2 animate-pulse rounded-md bg-background-primary',
              mode === 'modal' ? 'mx-5' : 'mx-3'
            )}
          >
            <p
              className={clsx(
                'invisible',
                mode === 'modal' ? 'text-xl' : 'text-lg'
              )}
            >
              XX
            </p>
            <p
              className={clsx(
                'invisible',
                mode === 'modal' ? 'primary-text' : 'secondary-text'
              )}
            >
              XXX
            </p>
          </div>
        ))}

      {error && <ErrorPage error={error} />}
    </div>
  )

  return mode === 'nav' ? (
    actions.length > 0 ? (
      <Popup
        popupClassName="min-w-64 max-w-lg max-h-[48rem]"
        position="left"
        trigger={{
          type: 'icon_button',
          tooltip: t('title.pendingProposal'),
          props: {
            Icon: Gavel,
            className: 'flex-row gap-0.5',
            iconClassName: 'text-icon-brand-secondary',
            variant: 'highlight',
            size: 'sm',
            children: (
              <p className="primary-text text-sm text-text-brand-secondary">
                {actions.length}
              </p>
            ),
          },
        }}
      >
        <ButtonLink
          className="!rounded-b-none"
          containerClassName="!shrink-0 border-b border-border-base"
          contentContainerClassName="justify-between"
          disabled={navigating}
          forceNoNavigating
          href={createProposalHref}
          size="lg"
          variant="ghost"
        >
          <p className="primary-text">{t('title.proposal')}</p>

          <div className="flex flex-row justify-center items-center w-5 h-5">
            {navigating ? (
              <Loader size={20} />
            ) : (
              <ArrowForwardIos className="!w-4 !h-4 !text-icon-primary" />
            )}
          </div>
        </ButtonLink>

        {content}
      </Popup>
    ) : (
      <Tooltip title={t('title.createProposal')}>
        <IconButtonLink
          Icon={Gavel}
          href={getDaoProposalPath(dao.coreAddress, 'create')}
          size="sm"
          variant="highlight"
        />
      </Tooltip>
    )
  ) : mode === 'modal' ? (
    <Modal
      contentContainerClassName="!p-0"
      footerContainerClassName="flex flex-row justify-end"
      footerContent={
        <ButtonLink href={createProposalHref} variant="secondary">
          {t('button.open')}
          <ArrowForwardIos className="!w-4 !h-4 !text-icon-primary" />
        </ButtonLink>
      }
      header={{
        title: t('title.pendingProposal'),
        subtitle:
          modalSubtitleOverride ||
          t('info.pendingProposalShoppingCartExplanation'),
      }}
      onClose={() => {
        setModalVisible(false)
        // Give the modal close animation time to complete.
        setTimeout(() => onClose?.(), 200)
      }}
      visible={modalVisible}
    >
      {content}
    </Modal>
  ) : null
}
