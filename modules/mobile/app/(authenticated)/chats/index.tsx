import { ChatCard } from "@/components/screens/chats/ChatCard"
import { ThemedActivityIndicator } from "@/components/ui/ThemedActivityIndicator"
import { ThemedView } from "@/components/ui/ThemedView"
import { backend } from "@/lib/services/backend"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, StyleSheet } from "react-native"

const PAGE_SIZE = 10

export default function ChatsPage() {
  const router = useRouter()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  async function fetchChats(newPage: number) {
    if (loading) return

    setLoading(true)
    try {
      const response = await backend.chats.get({
        query: { page: newPage, pageSize: PAGE_SIZE }
      })

      // @ts-ignore
      setUsers((prev) => [...prev, ...response.data])
      setHasMore(response.data.length === PAGE_SIZE)
    } catch (error) {
      console.error("Error fetching chats:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchChats(page)
  }, [])

  async function loadMore() {
    if (!hasMore) return

    const nextPage = page + 1
    setPage(nextPage)
    return fetchChats(nextPage)
  }

  function openChat(chatId: string) {
    // @ts-ignore
    router.push(`/chats/${chatId}`)
  }

  return (
    <ThemedView style={styles.container}>
      {loading ? (
        <ThemedActivityIndicator size="small" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(user: any) => user.id}
          renderItem={({ item }) => (
            <ChatCard
              avatar={item.image}
              username={item.name}
              lastMessage={item.lastMessage}
              onPress={() => openChat(item.id)}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchBarContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10
  }
})
