import { authClient } from "@/lib/auth"
import { useState } from "react"
import { Button, TextInput, View } from "react-native"

export default function App() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const res = await authClient.signUp.email({
      email,
      password,
      name
    })
    console.log(res)
  }

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}
