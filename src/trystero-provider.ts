import type { Room } from 'trystero'
import { joinRoom as joinTorrentRoom, selfId as torrentSelfId } from 'trystero/torrent'
import { joinRoom as joinMqttRoom, selfId as mqttSelfId } from 'trystero/mqtt'

type ProviderName = 'torrent' | 'mqtt'

const PROVIDERS: Record<
  ProviderName,
  { joinRoom: typeof joinTorrentRoom; selfId: string }
> = {
  torrent: { joinRoom: joinTorrentRoom, selfId: torrentSelfId },
  mqtt: { joinRoom: joinMqttRoom, selfId: mqttSelfId },
}

const providerKey = (import.meta.env.VITE_TRYSTERO_PROVIDER as ProviderName) || 'torrent'
const provider = PROVIDERS[providerKey] ?? PROVIDERS.torrent

export const joinRoom: (
  config: Parameters<typeof joinTorrentRoom>[0],
  roomId: string
) => Room = provider.joinRoom
export const selfId = provider.selfId
