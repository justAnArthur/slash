import React, { useState } from "react"
import { StyleSheet } from "react-native"

import { ThemedInput } from "@/components/ui/ThemedInput"
import { ThemedView } from "@/components/ui/ThemedView"

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (text: string) => {
    setSearchQuery(text)
    onSearch(text)
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10
  }
})
