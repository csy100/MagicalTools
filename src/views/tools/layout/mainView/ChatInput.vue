<template>
    <div class="input-container" v-if="!chatStore.chatStart">
        <div @keydown.enter="sendMessage">
            <div class="text-container">
                <textarea
                        v-model="textarea"
                        placeholder="发送消息"
                        class="custom-textarea"
                        :style="{ height: textareaHeight }"
                />
            </div>
        </div>

        <div class="input-icon">
            <span class="send-message-icon common-decoration"
                  :class="{ hasMessage: textarea }"
                  @click="sendPrompt"
            >
                <el-icon size="25px">
                    <Promotion/>
                </el-icon>
            </span>

            <span class="voice-icon common-decoration"
                  :class="{ active : isClicked }"
                  @click="toggleVoice"
            >
                <el-icon size="25px">
                    <Microphone/>
                </el-icon>
            </span>
        </div>
    </div>

    <div v-else style="height:10vh;display: flex;align-items: center;justify-content: center">
        <input-setting/>
    </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import {ref, watchEffect} from "vue";
import useSessionStore from "@/store/modules/chatgpt/session.ts";
import useChatStore from "@/store/modules/chatgpt/chatRoom.ts";
import {ElNotification} from "element-plus";
import {BASE_URL} from "@/utils/type.ts";
import InputSetting from "@/views/tools/layout/util/InputSetting.vue";

const chatStore = useChatStore();
const sessionStore = useSessionStore();
const isClicked = ref(false);
const textarea = ref('');
const textareaHeight = ref('25px');

watchEffect(() => {
    const textLength = textarea.value.length
    if (textLength <= 75) {
        textareaHeight.value = textarea.value ? '25px' : '25px'
    } else if (textLength <= 200) {
        textareaHeight.value = '100px'
    } else {
        textareaHeight.value = '200px'
    }
})

/**
 * 绑定回车键进行发送消息
 * @param event
 */
const sendMessage = (event) => {
    if (event.keyCode === 13) {
        // 阻止默认的回车键行为
        event.preventDefault();
        // 手动触发发送消息的操作
        sendPrompt();
    }
}

/**
 * 发送提示词
 */
const sendPrompt = async () => {

    // 开始发送会话
    chatStore.chatStart = true;

    if (textarea.value.trim() === '') {
        return ElNotification({
            message: '不能发送空内容，请输入你的问题',
            type: 'info',
            duration: 1500,
            position: "bottom-right"
        });
    }
    if (!sessionStore.sessionList.length) {
        return ElNotification({
            message: '请先建立一个对话来保存您的信息',
            type: 'info',
            duration: 1500,
            position: "bottom-right"
        });
    } else {
        const userChat = {
            chatType: 0,
            chatContent: textarea.value
        };
        chatStore.chatList.push(userChat);

        let prompt = ref('');
        prompt.value = textarea.value;
        textarea.value = '';

        // 发送chat对象
        const chat = {
            sessionId: sessionStore.sessionId,
            chatContent: prompt.value
        }

        try {
            const response = await fetch(BASE_URL + '/chat/prompt', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    chat: chat,
                    setting: JSON.parse(localStorage.getItem('chatSetting'))
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            // 预加载一个数组
            const chatDialogue = {
                chatType: 1,
                chatContent: ''
            }
            chatStore.chatList.push(chatDialogue);
            const lastIndex = chatStore.chatList.length - 1;

            // 处理数据流
            const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
            while (true) {
                var {value, done} = await reader.read();
                if (done) {
                    break;
                }
                value = value?.replace('undefined', '');
                value = value?.replace(/data:/g, '');
                value = value?.replace(/\n\n\n\n/g, '\n\t\n');
                value = value?.replace(/\n\n/g, '');
                chatStore.chatList[lastIndex].chatContent += value;

            }
        } catch (error) {
            // 处理请求错误，例如显示错误消息
            console.error('Error occurred during fetch:', error);
            // 在此处处理错误，例如显示错误消息到用户界面
            ElNotification({
                message: '请求错误，请稍后重试',
                type: 'error',
                duration: 3000,
                position: "top-right"
            });
        }
    }
}

/**
 * 语音输入
 */
const toggleVoice = () => {
    isClicked.value = !isClicked.value;
    ElNotification({
        message: '该功能正在拼命修改中...暂不能使用',
        type: 'error',
        duration: 3000,
        position: "bottom-right"
    });
}

</script>

<style scoped lang="scss">
.input-container {
  max-width: 100%;
  position: absolute;
  bottom: 10px;
  left: 49.5%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
}

.text-container {
  display: flex;
}

.custom-textarea {
  outline: none;
  width: 48vw;
  padding: 20px 20px 20px 15px;
  border-radius: 10px;
  border: none;
  background-color: #40414f;
  resize: none;
  color: white;
  font-size: 1.1rem;
  transition: height 0.3s ease-in-out;
}

.input-icon {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 10px;

  .common-decoration {
    padding: 6px;
    cursor: pointer;
    border-radius: 5px;
    margin: 3px;
    color: #7a7b88;
  }

  .send-message-icon:active,
  .voice-icon:active {
    transform: scale(0.97);
  }
}

.hasMessage {
  background-color: #19c37d;

  .el-icon {
    color: white;
  }
}

.active {
  background-color: red;

  .el-icon {
    color: white;
    animation: bounce 0.6s infinite alternate;
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-4px);
  }
}


@media (max-width: 760px) {
  .custom-textarea {
    width: 70vw;
  }
}

/*=================================================*/
/*滚动条样式修改*/
.custom-textarea:hover {
  /* 鼠标进入时显示滚动条 */
  overflow: auto;
}
.custom-textarea::-webkit-scrollbar {
  width: 8px; /* 调整滚动条宽度 */
}
.custom-textarea::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color); /* 调整滚动条拖动条颜色 */
  border-radius: 8px; /* 轮子圆角度 */
}
.custom-textarea::-webkit-scrollbar-track {
  border-radius: 8px; /* 轮子圆角度 */
}
/*=================================================*/


</style>