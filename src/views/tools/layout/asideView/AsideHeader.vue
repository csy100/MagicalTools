<template>
    <div class="header-container">
        <div class="add-conversation" @click="addSession()">
            <span class="add-icon">+</span>
            <span>新增对话</span>
        </div>

        <el-tooltip
                class="box-item"
                effect="dark"
                content="删除所有会话"
                placement="right"
        >
            <div class="remove-sessions" @click="removeAllSession">
                <span class="remove-icon">
                    <el-icon><Delete/></el-icon>
                </span>
            </div>
        </el-tooltip>
    </div>
</template>

<script lang="ts" setup>
import useSessionStore from "@/store/modules/chatgpt/session.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import request from "@/utils/request.ts";
import useChatStore from "@/store/modules/chatgpt/chatRoom.ts";

const sessionStore = useSessionStore();
const chatStore = useChatStore();
/**
 * 添加会话
 */
const addSession = () => {
    ElMessageBox.prompt('请输入会话标题', '添加会话', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]{1,50}$/, // 输入的内容必须是1到50个字符
        inputErrorMessage: '会话标题需为1到50个字符', // 校验失败时的提示信息
    })
        .then(({value}: { value: string }) => {
            try {
                request.post('/session/add', {
                    sessionTitle: value
                }).then(({data}) => {
                    sessionStore.sessionList.unshift(data);
                    ElMessage({
                        type: 'success',
                        message: '添加成功',
                    })

                    sessionStore.sessionAdd = true;
                })
            } catch (error) {
                console.log(error)
                ElMessage({
                    type: 'error',
                    message: '网络错误',
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消添加',
            })
        })
}

/**
 * 删除所有会话信息
 */
const removeAllSession = () => {
    ElMessageBox.confirm(
        '所有会话将被永久删除，不可找回，请确定？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            request.delete('/session/deleteAllSession').then(({data}) => {
                ElMessage({
                    type: 'success',
                    message: data
                })

                //  将sessionList和chatList里面清空所有元素
                sessionStore.sessionList = [];
                chatStore.chatList = [];
            }).catch((error) => {
                console.log(error);
            });
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
.header-container {
  margin: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #dce1f6;
  user-select: none;
}

.remove-sessions,
.add-conversation {
  height: 100%;
  border: 2px solid #494a4c;
  border-radius: 6px;
  padding: 10px;
  font-size: 16px;
  color: #f9fafc;
  cursor: pointer;

  .add-icon {
    margin-left: 10px;
    margin-right: 20px;
  }
}

.add-conversation {
  width: 230px;
}

.remove-sessions {
  width: 20px;
  margin-left: 10px;
}

.remove-sessions:active,
.add-conversation:active {
  transform: scale(0.99);
}

.remove-sessions:hover,
.add-conversation:hover {
  background-color: var(--hover-color);
  transition: 0.3s all ease-in-out;
}

</style>