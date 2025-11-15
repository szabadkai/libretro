import type { Room } from 'trystero'
import { joinRoom as joinTorrentRoom, selfId as torrentSelfId } from 'trystero/torrent'
import { joinRoom as joinMqttRoom, selfId as mqttSelfId } from 'trystero/mqtt'
import { joinRoom as joinIpfsRoom, selfId as ipfsSelfId } from 'trystero/ipfs'
import { joinRoom as joinSupabaseRoom, selfId as supabaseSelfId } from 'trystero/supabase'

type ProviderName = 'torrent' | 'mqtt' | 'ipfs' | 'supabase'

const PROVIDERS: Record<ProviderName, { joinRoom: typeof joinTorrentRoom | typeof joinSupabaseRoom; selfId: string }> = {
  torrent: { joinRoom: joinTorrentRoom, selfId: torrentSelfId },
  mqtt: { joinRoom: joinMqttRoom, selfId: mqttSelfId },
  ipfs: { joinRoom: joinIpfsRoom, selfId: ipfsSelfId },
  supabase: { joinRoom: joinSupabaseRoom, selfId: supabaseSelfId },
}

export const providerKey =
  (import.meta.env.VITE_TRYSTERO_PROVIDER as ProviderName) || 'supabase'
const provider = PROVIDERS[providerKey] ?? PROVIDERS.supabase

export const joinRoom: (
  config: Record<string, unknown>,
  roomId: string
) => Room = provider.joinRoom as any
export const selfId = provider.selfId
