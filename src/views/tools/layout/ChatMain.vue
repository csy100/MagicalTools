<template>
  <div class="main-container">
      <div class="chat-container">
          <div v-if="chatStore.chatList.length">
              <chat-content/>
          </div>
          <div v-else>
              <intro-steps/>
          </div>
      </div>

      <div class="input-container">
          <chat-input/>
      </div>
  </div>
</template>

<script lang="ts" setup>
import ChatContent from "@/views/tools/layout/mainView/ChatContent.vue";
import ChatInput from "@/views/tools/layout/mainView/ChatInput.vue";
import IntroSteps from "@/views/tools/layout/util/IntroSteps.vue";
import useChatStore from "@/store/modules/chatgpt/chatRoom.ts";

const chatStore = useChatStore();
</script>

<style scoped>
.main-container {
    width: 100%;
    height: var(--calc-height);
    background-color: var(--main-theme);
    position: relative;
}

.chat-container {
    height: var(--chat-main-height);
    overflow-y: auto;
}
</style>