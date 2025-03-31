import { useSignInStyles } from "@/app/sign-in"
import { LanguageModalSwitcher } from "@/app/sign-in/language-switcher-modal"
import { ThemeModalSwitcher } from "@/app/sign-in/theme-switcher-modal"
import { ThemedButton } from "@/components/ui/ThemedButton"
import { ThemedInput } from "@/components/ui/ThemedInput"
import { ThemedText } from "@/components/ui/ThemedText"
import { ThemedView } from "@/components/ui/ThemedView"
import { authClient } from "@/lib/auth"
import { useI18nT } from "@/lib/i18n/Context"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import { ImageBackground, View } from "react-native"

export default function SignUpScreen() {
  const t = useI18nT("screens.signUp")
  const signInStyles = useSignInStyles()

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignUp = async () => {
    setLoading(true)

    const res = await authClient.signUp.email({
      email,
      password,
      name
    })

    if (res.error) setError(JSON.stringify(res.error))
    else router.replace("/sign-up/additional-info")

    setLoading(false)
  }

  return (
    <ThemedView style={signInStyles.container}>
      <View style={signInStyles.content}>
        <ThemedText type="title" style={signInStyles.title}>
          {t("title")}
        </ThemedText>

        <ThemedInput
          placeholder={t("name")}
          textContentType="emailAddress"
          value={name}
          onChangeText={setName}
        />

        <ThemedInput
          placeholder={t("email")}
          value={email}
          onChangeText={setEmail}
        />

        <ThemedInput
          placeholder={t("password")}
          textContentType="password"
          value={password}
          onChangeText={setPassword}
        />

        <ThemedButton
          title={t("submit")}
          style={{ width: "100%" }}
          onPress={handleSignUp}
        />

        {error && (
          <ThemedText>
            {t("error")}
            {/*{": "}*/}
            {/*{error}*/}
          </ThemedText>
        )}
      </View>

      <ThemedText style={signInStyles.anotherOption}>
        {t("haveAccount")} {/*@ts-ignore*/}
        <ThemedText type="link" onPress={() => router.replace("/sign-in")}>
          {t("signIn")}
        </ThemedText>
      </ThemedText>

      <View style={signInStyles.settings}>
        <LanguageModalSwitcher />
        <ThemeModalSwitcher />
      </View>

      <ImageBackground
        source={require("@/assets/images/bg-entry.webp")}
        style={signInStyles.backgroundGradient}
      />
      <ImageBackground
        source={require("@/assets/images/stars.svg")}
        style={signInStyles.backgroundStars}
      />
    </ThemedView>
  )
}
