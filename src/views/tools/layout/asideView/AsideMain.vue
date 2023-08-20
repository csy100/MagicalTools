<template>
    <div class="scroll-container">
        <div class="scroll-container">
            <div v-for="(item, index) in sessionStore.sessionList"
                 :key="index"
            >
                <div class="session-container"
                     :class="{ 'session-active': isActive(item) }"
                     @click="toggleActive(item)"

                >
                    <div class="session-left">
                    <span style="display: flex;align-items: center;margin-right: 10px">
                        <el-icon size="20px"><ChatDotRound/></el-icon>
                    </span>
                    </div>

                    <div class="session-content">
                    <span>
                        {{ item.sessionTitle }}
                    </span>
                    </div>

                    <div class="session-right"
                         :class="{ 'active-right' : isActive(item) }"
                    >
                    <span @click="sessionEdit(item)">
                        <el-icon class="edit-icon" size="20px"><EditPen/></el-icon>
                    </span>
                        <span @click="sessionDelete(item)">
                        <el-icon class="delete-icon" size="20px"><Delete/></el-icon>
                    </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import {computed, onMounted, onUpdated, ref, unref, watchEffect} from 'vue';
import useSessionStore from "@/store/modules/chatgpt/session.ts";
import request from "@/utils/request.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import useChatStore from "@/store/modules/chatgpt/chatRoom.ts";

const chatStore = useChatStore();
const sessionStore = useSessionStore();
const activeItem = ref(null);

onMounted(() => {
    sessionInit();
    // 监测刷新操作之后再次发送请求
    if (sessionStore.sessionId) {
        loadSession(sessionStore.sessionId);
    }
});

onUpdated(() => {
    // 监测刷新操作之后session元素
    sessionStore.sessionList.find((item) => {
        if (item.sessionId === sessionStore.sessionId) {
            activeItem.value = item;
            return;
        }
    });
})

watchEffect(() => {
    // 监测新增session元素
    if (sessionStore.sessionAdd) {
        activeItem.value = sessionStore.sessionList[0];
        sessionStore.sessionId = unref(sessionStore.sessionList)[0].sessionId;
        sessionStore.sessionAdd = false;
        // 加载新会话信息
        chatStore.chatList = [];
    }
});

/**
 * 初始化session数据
 */
const sessionInit = () => {
    request.get('/session/init').then(({data}) => {
        if (sessionStore.sessionList.length !== 0) {
            sessionStore.sessionList = [];
        }
        sessionStore.sessionList = data;
    }).catch((error) => {
        console.log(error);
    });
}

/**
 * 将activeItem变量赋值给item元素
 * @param item
 */
const isActive = computed(() => {
    return item => item === activeItem.value;
});

/**
 * 发送会话信息
 * @param item
 */
const toggleActive = (item) => {
    if (item === activeItem.value) {
        return;
    }
    activeItem.value = item;

    // 锁定该会话id标识
    sessionStore.sessionId = item.sessionId;
    loadSession(sessionStore.sessionId);
};

const loadSession = (sessionId) => {
    // 加载该会话信息
    request.get(`/chat/init/${sessionId}`).then(({data}) => {
        chatStore.chatList = data;
    }).catch((error) => {
        console.log(error);
    })
}

/**
 * 编辑会话信息
 * @param item
 */
const sessionEdit = (item) => {
    ElMessageBox.prompt('请输入新会话标题', '编辑会话', {
        inputValue: item.sessionTitle,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]{1,50}$/, // 输入的内容必须是1到50个字符
        inputErrorMessage: '会话标题需为1到50个字符', // 校验失败时的提示信息
    })
        .then(({value}) => {
            item.sessionTitle = value;

            try {
                request.post('/session/updateSession', {
                    sessionId: item.sessionId,
                    sessionTitle: item.sessionTitle
                }).then(({data}) => {
                    ElMessage({
                        type: 'success',
                        message: data
                    })
                })
            } catch (error) {
                console.log(error)
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消编辑',
            })
        })
}

/**
 * 删除会话信息
 * @param item
 */
const sessionDelete = (item) => {
    ElMessageBox.confirm(
        '该会话将被永久删除，不可找回，请确定？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            request.delete(`/session/deleteSession/${item.sessionId}`).then(({data}) => {
                ElMessage({
                    type: 'success',
                    message: data
                })
                //  将sessionStore.sessionList里面删除这个item元素
                sessionStore.sessionList = sessionStore.sessionList
                    .filter(session =>
                        session.sessionId !== item.sessionId
                    );
                chatStore.chatList = [];
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

</script>

<style scoped lang="scss">
.scroll-container {
  height: calc(var(--calc-height) - 135px);
  overflow-y: auto;
}

.scroll-container {
  margin-left: 5px;
}

.session-container {
  display: flex;
  align-items: center;
  padding: 13px 10px;
  width: 220px;
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
}

.session-active {
  background-color: #353542;
  border-radius: 6px;
  animation: flashing 1.5s ease-in;
  transition: background-color 0.3s ease-in-out;
}

@keyframes flashing {
  0% {
    background-position: 0;
    background-color: #696a6d;
  }
  100% {
    background-position: 0 50%;
  }
}

.session-content {
  width: 65%;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1rem;
}

.session-right {
  display: flex;
  align-items: center;
  margin-left: auto;
  opacity: 0;

  span {
    display: flex;
    align-items: center;
    margin-right: 4px;
  }
}

.active-right {
  opacity: 1;
  transition: opacity 0.3s;
}

/*===============================================================*/
.scroll-container {
  /* 默认情况下隐藏滚动条 */
  overflow: hidden;
}
.scroll-container:hover {
  /* 鼠标进入时显示滚动条 */
  overflow: auto;
}
.scroll-container::-webkit-scrollbar {
  width: 6px; /* 调整滚动条宽度 */
}
.scroll-container::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color); /* 调整滚动条拖动条颜色 */
  border-radius: 8px; /* 轮子圆角度 */
}
.scroll-container::-webkit-scrollbar-track {
  border-radius: 8px; /* 轮子圆角度 */
}
/*===============================================================*/
</style>