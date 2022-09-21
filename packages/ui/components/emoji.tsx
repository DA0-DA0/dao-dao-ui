import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

export const SpendEmoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.money')} symbol="💵" />
}

export const StakeEmoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.box')} symbol="📥" />
}

export const AddCw20Emoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.token')} symbol="🔘" />
}

export const AddCw721Emoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.image')} symbol="🖼" />
}

export const CustomEmoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.robot')} symbol="🤖" />
}

export const ExecuteEmoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.swords')} symbol="⚔️" />
}

export const InstantiateEmoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.baby')} symbol="👶" />
}

export const MigrateContractEmoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.whale')} symbol="🐋" />
}

export const RemoveCw20Emoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.x')} symbol="❌" />
}

export const RemoveCw721Emoji = RemoveCw20Emoji

export const UpdateAdminEmoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.mushroom')} symbol="🍄" />
}

export const UpdateInfoEmoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.info')} symbol="ℹ️" />
}

export const ManageSubDaosEmoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.family')} symbol="👨‍👦" />
}
