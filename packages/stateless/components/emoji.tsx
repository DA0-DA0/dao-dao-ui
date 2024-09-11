import Emoji, { EmojiProps as BaseEmojiProps } from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

export type EmojiWrapperProps = Omit<BaseEmojiProps, 'symbol' | 'label'> & {
  labelI18nKey: string
  emoji: string
}

export type EmojiProps = Omit<EmojiWrapperProps, 'labelI18nKey' | 'emoji'>

export const EmojiWrapper = ({
  labelI18nKey,
  emoji,
  ...props
}: EmojiWrapperProps) => {
  const { t } = useTranslation()
  return <Emoji label={t(labelI18nKey)} symbol={emoji} {...props} />
}

export const GasEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⛽" labelI18nKey="emoji.gas" {...props} />
)

export const KeyEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🔑" labelI18nKey="emoji.key" {...props} />
)

export const LockWithKeyEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🔐" labelI18nKey="emoji.closedLockWithKey" {...props} />
)

export const PickEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⛏" labelI18nKey="emoji.pick" {...props} />
)

export const PencilEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="✏" labelI18nKey="emoji.pencil" {...props} />
)

export const UnlockEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🔓" labelI18nKey="emoji.unlock" {...props} />
)

export const CameraWithFlashEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="📸" labelI18nKey="emoji.cameraWithFlash" {...props} />
)

export const BoxEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="📦" labelI18nKey="emoji.box" {...props} />
)

export const MoneyEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="💵" labelI18nKey="emoji.money" {...props} />
)

export const MoneyBagEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="💰" labelI18nKey="emoji.moneyBag" {...props} />
)

export const MoneyWingsEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="💸" labelI18nKey="emoji.moneyWings" {...props} />
)

export const BankEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🏦" labelI18nKey="emoji.bank" {...props} />
)

export const DepositEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="📥" labelI18nKey="emoji.deposit" {...props} />
)

export const TokenEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🔘" labelI18nKey="emoji.token" {...props} />
)

export const ImageEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🖼" labelI18nKey="emoji.image" {...props} />
)

export const CameraEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="📸" labelI18nKey="emoji.camera" {...props} />
)

export const ArtistPaletteEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🎨" labelI18nKey="emoji.artistPalette" {...props} />
)

export const RobotEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🤖" labelI18nKey="emoji.robot" {...props} />
)

export const SwordsEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⚔️" labelI18nKey="emoji.swords" {...props} />
)

export const BabyEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="👶" labelI18nKey="emoji.baby" {...props} />
)

export const BabyAngelEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="👼" labelI18nKey="emoji.babyAngel" {...props} />
)

export const WhaleEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🐋" labelI18nKey="emoji.whale" {...props} />
)

export const XEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="❌" labelI18nKey="emoji.x" {...props} />
)

export const MushroomEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🍄" labelI18nKey="emoji.mushroom" {...props} />
)

export const InfoEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="ℹ️" labelI18nKey="emoji.info" {...props} />
)

export const FamilyEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="👨‍👦" labelI18nKey="emoji.family" {...props} />
)

export const GearEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⚙️" labelI18nKey="emoji.gear" {...props} />
)

export const ChartEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="📊" labelI18nKey="emoji.chart" {...props} />
)

export const PeopleEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="👥" labelI18nKey="emoji.people" {...props} />
)

export const ClockEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⏰" labelI18nKey="emoji.clock" {...props} />
)

export const RecycleEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="♻️" labelI18nKey="emoji.recycle" {...props} />
)

export const MegaphoneEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="📣" labelI18nKey="emoji.megaphone" {...props} />
)

export const BallotDepositEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🗳️" labelI18nKey="emoji.ballotBox" {...props} />
)

export const RaisedHandEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="✋" labelI18nKey="emoji.raisedHand" {...props} />
)

export const HourglassEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⏳" labelI18nKey="emoji.hourglass" {...props} />
)

export const HerbEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🌿" labelI18nKey="emoji.herb" {...props} />
)

export const DaoEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="☯️" labelI18nKey="emoji.yinYang" {...props} />
)

export const HandshakeEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🤝" labelI18nKey="emoji.handshake" {...props} />
)

export const BrokenHeartEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="💔" labelI18nKey="emoji.brokenHeart" {...props} />
)

export const WrenchEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🔧" labelI18nKey="emoji.wrench" {...props} />
)

export const FireEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🔥" labelI18nKey="emoji.fire" {...props} />
)

export const UnicornEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🦄" labelI18nKey="emoji.unicorn" {...props} />
)

export const LockWithPenEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🔏" labelI18nKey="emoji.lockWithPen" {...props} />
)

export const BeeEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🐝" labelI18nKey="emoji.bee" {...props} />
)

export const SuitAndTieEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="👔" labelI18nKey="emoji.suitAndTie" {...props} />
)

export const CycleEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🔄" labelI18nKey="emoji.cycle" {...props} />
)

export const JoystickEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🕹️" labelI18nKey="emoji.joystick" {...props} />
)

export const NumbersEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🔢" labelI18nKey="emoji.numbers" {...props} />
)

export const HammerAndWrenchEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🛠️" labelI18nKey="emoji.hammerAndWrench" {...props} />
)

export const FileFolderEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="📁" labelI18nKey="emoji.fileFolder" {...props} />
)

export const MemoEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="📝" labelI18nKey="emoji.memo" {...props} />
)

export const TrashEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🗑️" labelI18nKey="emoji.trash" {...props} />
)

export const ChainEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⛓️" labelI18nKey="emoji.chains" {...props} />
)

export const DottedLineFaceEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🫥" labelI18nKey="emoji.dottedLineFace" {...props} />
)

export const TelescopeEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🔭" labelI18nKey="emoji.telescope" {...props} />
)

export const CurvedDownArrowEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⤵️" labelI18nKey="emoji.curvedDownArrow" {...props} />
)

export const DownArrowEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⬇️" labelI18nKey="emoji.downArrow" {...props} />
)

export const FilmSlateEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🎬" labelI18nKey="emoji.filmSlate" {...props} />
)

export const PrinterEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🖨️" labelI18nKey="emoji.printer" {...props} />
)

export const BalanceEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⚖️" labelI18nKey="emoji.balance" {...props} />
)

export const RocketShipEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🚀" labelI18nKey="emoji.rocketShip" {...props} />
)

export const AtomEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⚛️" labelI18nKey="emoji.atom" {...props} />
)

export const PersonRaisingHandEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🙋" labelI18nKey="emoji.personRaisingHand" {...props} />
)

export const ControlKnobsEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🎛️" labelI18nKey="emoji.controlKnobs" {...props} />
)

export const ThumbDownEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="👎" labelI18nKey="emoji.thumbDown" {...props} />
)

export const ComputerDiskEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="💽" labelI18nKey="emoji.computerDisk" {...props} />
)

export const PlayPauseEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⏯️" labelI18nKey="emoji.playPause" {...props} />
)

export const PufferfishEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🐡" labelI18nKey="emoji.pufferfish" {...props} />
)

export const CheckEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="✅" labelI18nKey="emoji.check" {...props} />
)

export const BucketEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🪣" labelI18nKey="emoji.bucket" {...props} />
)

export const ConstructionEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🏗️" labelI18nKey="emoji.construction" {...props} />
)

export const LowBatteryEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="🪫" labelI18nKey="emoji.lowBattery" {...props} />
)

export const OpenMailboxEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="📬" labelI18nKey="emoji.openMailbox" {...props} />
)

export const PauseEmoji = (props: EmojiProps) => (
  <EmojiWrapper emoji="⏸︎" labelI18nKey="emoji.pause" {...props} />
)
