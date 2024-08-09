<script setup lang="ts">
import moment from "moment";
import type { IMessagePayload } from "~/lib/types/common.types";

defineProps<{
  chats: IMessagePayload[];
}>();
</script>

<template>
  <div class="h-96 overflow-y-auto px-6 py-8 flex-1">
    <div class="message w-full mb-3 flex" v-for="(chat, i) in chats" :key="i">
      <div
        class="px-4 py-2 rounded-md mb-3"
        :class="{
          'bg-green-300': true,
        }"
      >
        <div class="flex items-center gap-x-3">
          <div class="text-sm font-semibold">
            {{ chat.user.display_name }}
          </div>
        </div>
        <div class="mt-1 text-base">
          {{ chat.text }}
        </div>
        <div class="mt-2 text-xs text-gray-500">
          {{ moment(chat.created_at).format("YYYY-MM-DD hh:mm:ss") }}
        </div>
      </div>
    </div>
  </div>
</template>
