<template>
  <UCard class="chat-card" :ui="{ body: { padding: 'p-0 sm:p-0' } }">
    <template #header>
      <div class="flex items-center justify-between text-primary">
        <div class="flex items-center gap-x-2">
          <UIcon
            name="i-heroicons-chat-bubble-left-right"
            class="w-6 h-6 font-semibold"
          />
          <span class="text-lg font-semibold">Chat</span>
        </div>
        <div
          class="bg-primary px-3 py-1.5 text-white cursor-pointer rounded-md hover:bg-primary-dark transition-colors"
          @click="leaveChat"
        >
          Leave
        </div>
      </div>
    </template>

    <!-- CHAT BLOCK -->
    <ChatCard :chats="textMessages" />

    <template #footer>
      <form @submit.prevent="sendMessage">
        <UInput
          v-model="message"
          placeholder="Enter your message..."
          :ui="{ padding: 'px-4 py-2' }"
        >
          <template #trailing>
            <UButton
              icon="i-heroicons-paper-airplane"
              size="sm"
              color="primary"
              variant="solid"
              :trailing="false"
              label="Send"
              class="my-2"
              type="submit"
            />
          </template>
        </UInput>
      </form>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import ChatCard from "~/components/ChatCard.vue";
import { CHANNEL_NAME } from "~/constant/common.constant";
import type { IMessagePayload } from "~/lib/types/common.types";
import type { Database } from "~/lib/types/database.types";

const client = useSupabaseClient<Database>();

const message = ref("");
const textMessages = ref<IMessagePayload[]>([]);

const leaveChat = async () => {
  const { error } = await client.auth.signOut();

  if (error) {
    console.log("error", error);
    return;
  }

  navigateTo("/");
};

const sendMessage = async () => {
  await client.from("messages").insert({ text: message.value });
  await nextTick(() => (message.value = ""));
};

onMounted(() => {
  client
    .channel(CHANNEL_NAME)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      async (payload) => {
        const { error, data } = await client
          .from("users")
          .select("display_name, profile_url")
          .eq("id", payload.new.user_id)
          .single();

        if (error) {
          console.log(error.message);
          return;
        }

        const messagePayload = {
          ...payload.new,
          user: data,
        } as IMessagePayload;

        textMessages.value.push(messagePayload);
      }
    )
    .subscribe();
});

onBeforeUnmount(() => {
  console.log("disconnecting client..");
  client.channel("you-gamble-chat").unsubscribe();
});
</script>
