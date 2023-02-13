import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

export interface EmojiWrapperProps {
  labelI18nKey: string
  emoji: string
}

export const EmojiWrapper = ({ labelI18nKey, emoji }: EmojiWrapperProps) => {
  const { t } = useTranslation()
  return <Emoji label={t(labelI18nKey)} symbol={emoji} />
}

export const KeyEmoji = () => (
  <EmojiWrapper emoji="🔑" labelI18nKey="emoji.key" />
)

export const LockWithKeyEmoji = () => (
  <EmojiWrapper emoji="🔐" labelI18nKey="emoji.closedLockWithKey" />
)

export const PickEmoji = () => (
  <EmojiWrapper emoji="⛏" labelI18nKey="emoji.pick" />
)

export const PencilEmoji = () => (
  <EmojiWrapper emoji="✏" labelI18nKey="emoji.pencil" />
)

export const UnlockEmoji = () => (
  <EmojiWrapper emoji="🔓" labelI18nKey="emoji.unlock" />
)

export const CameraWithFlashEmoji = () => (
  <EmojiWrapper emoji="📸" labelI18nKey="emoji.cameraWithFlash" />
)

export const BoxEmoji = () => (
  <EmojiWrapper emoji="📦" labelI18nKey="emoji.box" />
)

export const MoneyEmoji = () => (
  <EmojiWrapper emoji="💵" labelI18nKey="emoji.money" />
)

export const MoneyBagEmoji = () => (
  <EmojiWrapper emoji="💰" labelI18nKey="emoji.moneyBag" />
)

export const MoneyWingsEmoji = () => (
  <EmojiWrapper emoji="💸" labelI18nKey="emoji.moneyWings" />
)

export const DepositEmoji = () => (
  <EmojiWrapper emoji="📥" labelI18nKey="emoji.deposit" />
)

export const TokenEmoji = () => (
  <EmojiWrapper emoji="🔘" labelI18nKey="emoji.token" />
)

export const ImageEmoji = () => (
  <EmojiWrapper emoji="🖼" labelI18nKey="emoji.image" />
)

export const RobotEmoji = () => (
  <EmojiWrapper emoji="🤖" labelI18nKey="emoji.robot" />
)

export const SwordsEmoji = () => (
  <EmojiWrapper emoji="⚔️" labelI18nKey="emoji.swords" />
)

export const BabyEmoji = () => (
  <EmojiWrapper emoji="👶" labelI18nKey="emoji.baby" />
)

export const WhaleEmoji = () => (
  <EmojiWrapper emoji="🐋" labelI18nKey="emoji.whale" />
)

export const XEmoji = () => <EmojiWrapper emoji="❌" labelI18nKey="emoji.x" />

export const MushroomEmoji = () => (
  <EmojiWrapper emoji="🍄" labelI18nKey="emoji.mushroom" />
)

export const InfoEmoji = () => (
  <EmojiWrapper emoji="ℹ️" labelI18nKey="emoji.info" />
)

export const FamilyEmoji = () => (
  <EmojiWrapper emoji="👨‍👦" labelI18nKey="emoji.family" />
)

export const GearEmoji = () => (
  <EmojiWrapper emoji="⚙️" labelI18nKey="emoji.gear" />
)

export const ChartEmoji = () => (
  <EmojiWrapper emoji="📊" labelI18nKey="emoji.chart" />
)

export const PeopleEmoji = () => (
  <EmojiWrapper emoji="👥" labelI18nKey="emoji.people" />
)

export const ClockEmoji = () => (
  <EmojiWrapper emoji="⏰" labelI18nKey="emoji.clock" />
)

export const RecycleEmoji = () => (
  <EmojiWrapper emoji="♻️" labelI18nKey="emoji.recycle" />
)

export const MegaphoneEmoji = () => (
  <EmojiWrapper emoji="📣" labelI18nKey="emoji.megaphone" />
)

export const BallotDepositEmoji = () => (
  <EmojiWrapper emoji="🗳️" labelI18nKey="emoji.ballotBox" />
)

export const HourglassEmoji = () => (
  <EmojiWrapper emoji="⏳" labelI18nKey="emoji.hourglass" />
)

export const HerbEmoji = () => (
  <EmojiWrapper emoji="🌿" labelI18nKey="emoji.herb" />
)

export const DaoEmoji = () => (
  <EmojiWrapper emoji="☯️" labelI18nKey="emoji.yinYang" />
)

export const HandshakeEmoji = () => (
  <EmojiWrapper emoji="🤝" labelI18nKey="emoji.handshake" />
)

export const BrokenHeartEmoji = () => (
  <EmojiWrapper emoji="💔" labelI18nKey="emoji.brokenHeart" />
)

export const WrenchEmoji = () => (
  <EmojiWrapper emoji="🔧" labelI18nKey="emoji.wrench" />
)

export const FireEmoji = () => (
  <EmojiWrapper emoji="🔥" labelI18nKey="emoji.fire" />
)

export const LockWithPenEmoji = () => (
  <EmojiWrapper emoji="🔏" labelI18nKey="emoji.lockWithPen" />
)

export const BeeEmoji = () => (
  <EmojiWrapper emoji="🐝" labelI18nKey="emoji.bee" />
)

export const SuitAndTieEmoji = () => (
  <EmojiWrapper emoji="👔" labelI18nKey="emoji.suitAndTie" />
)
