<template>
  <header id="chat-header">
    <q-btn style="margin-left:auto; aspect-ratio: 1/1">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-ellipsis">
        <circle cx="12" cy="12" r="1"/>
        <circle cx="19" cy="12" r="1"/>
        <circle cx="5" cy="12" r="1"/>
      </svg>

      <q-menu
        v-model="menu"
        anchor="bottom left"
        self="top left"
        class="full-width-mobile"
        max-width="20rem"
        style="background-color: transparent;"
      >
        <div id="chat-header-modal" class="row no-wrap q-pa-md">
          <div class="column full-width" style="gap: 0.5rem">
            <h3 class="text-h6">
              Chat "{{ chat.channelName }}" settings
            </h3>

            <q-btn @click="leaveChat()">
              Leave Chat
            </q-btn>

            <q-btn v-if="isAdmin" @click="destroyChat()">
              Destroy Chat
            </q-btn>

            <q-separator dark/>

            <h4>Chat Members</h4>
            <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; width: 100%;">
              <chat-member v-for="user in users" :key="user.id" :user="user"/>
            </div>
          </div>
        </div>
      </q-menu>
    </q-btn>
  </header>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch } from "vue"
import ChatMember from "src/app/components/chat-member.vue"
import { useAuth } from "src/lib/composables/useAuth"
import { api } from "boot/axios"
import { updateChatMine } from "src/app/components/chat-list.store"

const { chat } = defineProps<{
  chat;
}>()


const auth = useAuth()


const menu = ref(false)
const mobileData = ref(false)
const bluetooth = ref(false)
const users = ref([] as any[])


const isAdmin = computed(() => auth.user.value.id === chat.userOwnerId)
const isMobile = computed(() => {
  return window.innerWidth < 600
})


const logout = () => {
  menu.value = false
  window.alert('Logged out successfully')
}

const leaveChat = async () => {
  try {
    await api.post(`/chat/leave/${chat.id}`)
    updateChatMine()
    window.location.href = "/"
  } catch (error) {
    console.error("Error leaving chat:", error)
  }
}

const destroyChat = async () => {
  try {
    await api.delete(`/chat/destroy/${chat.id}`)
    updateChatMine()
    window.location.href = "/"
  } catch (error) {
    console.error("Error destroying chat:", error)
  }
}

const fetchUsers = async () => {
  try {
    const response = await api.get(`/user/byChat/${chat.id}`)
    users.value = response.data
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}


watch(
  () => chat.id,
  async () => {
    await fetchUsers()
  },
  { immediate: true }
)


onMounted(fetchUsers)
</script>
<style>
#chat-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: auto;
}

#chat-header h1 {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5rem;
  text-overflow: ellipsis;
  text-wrap: nowrap;
}

#chat-header-modal {
  background-color: var(--color-10);
  border-radius: 10px;
}

.full-width-mobile {
  width: 100%;
  margin: 0 1rem;
}
</style>
