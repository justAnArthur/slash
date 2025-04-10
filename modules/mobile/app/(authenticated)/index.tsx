import { chatsFallbackStyles } from "@/app/(authenticated)/chats"
import { ChatsList } from "@/components/screens/chats/ChatsList"
import { ThemedText } from "@/components/ui/ThemedText"
import { ThemedView } from "@/components/ui/ThemedView"
import { useI18nT } from "@/lib/i18n/Context"

export default function HomeScreen() {
  const t = useI18nT("screens.chats")

  return (
    <ChatsList
      query={{
        pinned: true
      }}
      fallbackChildren={
        <ThemedView style={chatsFallbackStyles.fallbackContainer}>
          <ThemedText style={chatsFallbackStyles.fallbackText}>
            {t("noPinnedChats")}
          </ThemedText>
        </ThemedView>
      }
    />
  )
}
