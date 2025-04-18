import type { MessageResponse } from "@/src/api/messages/messages.api"
import type { ElysiaWS } from "elysia/dist/ws"
import { ExpoPushMessage, type PushMessage } from "@/src/api/users/push-message"

export type ChatSubscriptions = Map<string, Set<ElysiaWS>>

export const chatSubscriptions: ChatSubscriptions = new Map()

export function broadcastMessage(chatId: string, message: MessageResponse) {
  const subscribers = chatSubscriptions.get(chatId)

  if (!subscribers) return

  const payload = JSON.stringify({
    type: "new_message",
    chatId,
    message
  })

  // @ts-ignore
  for (const ws of subscribers) {
    ws.send(payload)
  }
}

export function subscribeUsersToChat(chatId: string, userIds: string[]) {
  if (!chatSubscriptions.has(chatId)) {
    chatSubscriptions.set(chatId, new Set())
  }
  const chatSubscribers = chatSubscriptions.get(chatId)!

  // @ts-ignore
  for (const [_, subscribers] of chatSubscriptions) {
    for (const ws of subscribers) {
      if (userIds.includes(ws.data.query.id)) {
        chatSubscribers.add(ws)
      }
    }
  }
}

export function unsubscribeUserFromChat(chatId: string, userId: string) {
  const subscribers = chatSubscriptions.get(chatId)
  if (!subscribers) return

  // @ts-ignore
  for (const ws of subscribers) {
    if (ws.data.query.id === userId) {
      subscribers.delete(ws)
      break
    }
  }

  if (subscribers.size === 0) {
    chatSubscriptions.delete(chatId)
  }
}

export function unsubscribeAllFromChat(chatId: string) {
  const subscribers = chatSubscriptions.get(chatId)
  if (!subscribers) return

  const payload = JSON.stringify({
    type: "delete_chat",
    chatId
  })

  // @ts-ignore
  for (const ws of subscribers) {
    ws.send(payload)
  }
  chatSubscriptions.delete(chatId)
}
