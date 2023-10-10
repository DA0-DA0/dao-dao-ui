import {
  Add,
  ArrowBackIosRounded,
  DeleteRounded,
  EditRounded,
} from '@mui/icons-material'
import { ComponentType, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Tooltip,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ButtonLinkProps,
  IconButtonLinkProps,
  LoadingData,
} from '@dao-dao/types'

import { WrapprMarkdown } from '../components/WrapprMarkdown'
import { WRAPPR_WIDGET_ID } from '../constants'
import { Wrappr } from '../types'
import { WrapprList } from './WrapprList'

export interface RendererProps {
  wrapprsLoading: LoadingData<Wrappr[]>
  isMember: boolean
  createWrapprHref: string | undefined
  // Template containing IDTOUPDATE for the wrappr ID to update.
  updateWrapprHref: string | undefined
  // Template containing IDTODELETE for the wrappr ID to update.
  deleteWrapprHref: string | undefined
  ButtonLink: ComponentType<ButtonLinkProps>
  IconButtonLink: ComponentType<IconButtonLinkProps>
}

export const Renderer = ({
  wrapprsLoading,
  isMember,
  createWrapprHref,
  updateWrapprHref,
  deleteWrapprHref,
  ButtonLink,
  IconButtonLink,
}: RendererProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()
  const { daoSubpathComponents, goToDao } = useDaoNavHelpers()

  const openWrapprId =
    daoSubpathComponents[0] === WRAPPR_WIDGET_ID
      ? daoSubpathComponents[1]
      : undefined
  const setOpenWrapprId = useCallback(
    (wrapprId?: string) =>
      goToDao(
        coreAddress,
        WRAPPR_WIDGET_ID + (wrapprId ? `/${wrapprId}` : ''),
        undefined,
        {
          shallow: true,
        }
      ),
    [coreAddress, goToDao]
  )

  const openWrappr =
    wrapprsLoading.loading || !openWrapprId
      ? undefined
      : wrapprsLoading.data.find(
          (wrappr) =>
            // Select wrappr if it's the one we're looking for or if it's a newer
            // version of the selected ID (this ensures that old links stay
            // valid when wrapprs are updated).
            wrappr.id === openWrapprId ||
            wrappr.pastVersions.some(
              (version) => 'id' in version && version.id === openWrapprId
            )
        )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between gap-8">
        {openWrappr ? (
          <Button onClick={() => setOpenWrapprId(undefined)} variant="ghost">
            <ArrowBackIosRounded className="!h-5 !w-5" />
            <p className="title-text text-text-body">{t('title.wrapprs')}</p>
          </Button>
        ) : (
          <p className="title-text text-text-body">{t('title.wrapprs')}</p>
          
        )}

        {createWrapprHref && !openWrappr && (
          <Tooltip
            title={!isMember ? t('error.mustBeMemberToCreateWrappr') : undefined}
          >
        
          </Tooltip>
        )}

        {openWrappr && isMember && updateWrapprHref && deleteWrapprHref && (
          <div className="flex flex-row items-stretch justify-end gap-2">
            <Tooltip title={t('info.proposeUpdateTooltip')}>
              <IconButtonLink
                Icon={EditRounded}
                href={updateWrapprHref.replace('IDTOUPDATE', openWrappr.id)}
                variant="secondary"
              />
            </Tooltip>

            <Tooltip title={t('info.proposeDeleteTooltip')}>
              <IconButtonLink
                Icon={DeleteRounded}
                href={deleteWrapprHref.replace('IDTODELETE', openWrappr.id)}
                variant="secondary"
              />
            </Tooltip>
          </div>
        )}
      </div>

      <div className="mb-9">
        {openWrappr ? (
          <WrapprMarkdown addAnchors wrappr={openWrappr} />
        ) : (
          <WrapprList
            createWrapprHref={createWrapprHref}
            onClick={setOpenWrapprId}
            wrapprsLoading={wrapprsLoading}
          />
        )}
      </div>
    </div>
  )
}
