export type DiscordNotifierRegistration = {
  id: string
  guild: {
    id: string
    name: string
    iconHash: string
  }
  channel: {
    id: string
    name: string
  }
}
