<template>
    <div class="scroll-section"
         v-loading="loading"
         element-loading-text="加载中..."
         element-loading-background="#343541"
    >
        <div class="other-components" style="z-index: 5">
            <side-hidden/>
            <span @click="scrollToTop">
                <page-top/>
            </span>
            <span @click="scrollToBottom">
                <page-down/>
            </span>
        </div>

        <div class="chat-container"
             v-for="(item,index) in chatStore.chatList"
             :key="index"
        >
            <div class="ask-container chat-content" v-if="item.chatType === 0">
                <img src="@/assets/avatar-logo.png" alt="#" :title="item.createTime">

                <span class="ask-content">
                    <MdPreview editorId="preview-only"
                               :modelValue="item.chatContent"
                               codeTheme="github"
                               previewTheme="github"
                               theme="dark"
                               style="background-color: #343541;"
                    />
                </span>

                <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="复制"
                        placement="right"
                >
                    <div class="copy-icon" @click="contentCopy(item.chatContent)">
                        <el-icon size="18px">
                            <CopyDocument/>
                        </el-icon>
                    </div>
                </el-tooltip>
            </div>

            <div class="answer-container chat-content" v-if="item.chatType === 1" style="margin-bottom: 15px">
                <img src="@/assets/chat-logo.png" alt="#" :title="item.createTime">

                <span class="answer-content">
                    <MdPreview editorId="preview-only"
                               :modelValue="item.chatContent"
                               codeTheme="github"
                               previewTheme="github"
                               theme="dark"
                               style="background-color: #444654"
                    />

                </span>

                <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="复制"
                        placement="right"
                >
                    <div class="copy-icon" @click="contentCopy(item.chatContent)">
                        <el-icon size="18px">
                            <CopyDocument/>
                        </el-icon>
                    </div>
                </el-tooltip>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
// @ts-nocheck
import useChatStore from "@/store/modules/chatgpt/chatRoom.ts";
import {ElNotification} from "element-plus";
import 'md-editor-v3/lib/preview.css';
import {MdPreview} from 'md-editor-v3';
import {onMounted, onUpdated, Ref, ref} from "vue";
import SideHidden from "@/views/tools/layout/util/SideHidden.vue";
import PageDown from "@/views/tools/layout/util/PageDown.vue";
import PageTop from "@/views/tools/layout/util/PageTop.vue";
import {chatDialogue} from "@/store/types.ts";

const chatStore = useChatStore();
let chatData: Ref<chatDialogue[]> = ref([]);
const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        // 将数据存储到 chatData.value 中
        chatData = chatStore.chatList;
        // 数据获取完成后
        loading.value = false; // 将 loading 设置为 false
    }, 2500); // 假设数据获取需要2.5秒
})

onUpdated(() => {
    scrollToBottom();
})
const scrollToBottom = () => {
    const chatContainer = document.querySelector('.scroll-section');
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight + 20,
        behavior: 'smooth'
    });
}
const scrollToTop = () => {
    const chatContainer = document.querySelector('.scroll-section');
    chatContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
const contentCopy = (content) => {
    const textarea = document.createElement('textarea');
    textarea.value = content;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    ElNotification({
        message: '复制成功，请合理使用AI生成内容',
        type: 'success',
        duration: 1500,
        position: "top-right"
    });
}
</script>

<style scoped lang="scss">
.scroll-section {
  height: var(--chat-main-height);
  overflow-y: auto;
}

.chat-container {
  color: white;

  .chat-content {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 30px 0 15px 0;
  }

  .chat-content:hover {
    .copy-icon {
      opacity: 1;
      transition: opacity 0.4s ease-in-out;
    }
  }

  img {
    width: 35px;
    height: 35px;
    border-radius: 4px;
    cursor: pointer;
  }

  span {
    width: 48%;
    transform: translateY(-8px);
  }

  .copy-icon {
    width: 15px;
    height: 15px;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0;
  }
}

.answer-container {
  background-color: #444654;
}

.copy-icon:active {
  transform: scale(0.90);
}

@media (max-width: 760px) {
  .chat-content {
    span {
      margin: 20px 2px;
      width: 75%;
    }
  }
}

/*=================================================*/
/*滚动条样式修改*/
.scroll-section::-webkit-scrollbar {
  width: 8px; /* 调整滚动条宽度 */
}
.scroll-section::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color); /* 调整滚动条拖动条颜色 */
  border-radius: 8px; /* 轮子圆角度 */
}
.scroll-section::-webkit-scrollbar-track {
  border-radius: 8px; /* 轮子圆角度 */
}
/*=================================================*/

.other-components {
  position: fixed;
}
</style>