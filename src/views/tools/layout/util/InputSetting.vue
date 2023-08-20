<template>
    <div class="input-content" style="display: flex;align-items: center;margin-top: 20px">
        <span class="input-icon" @click="openInput">
            <el-tooltip
                    effect="dark"
                    content="问题框"
                    placement="top"
            >
                <el-icon color="#fff" size="20px">
                    <Search/>
                </el-icon>
            </el-tooltip>
        </span>

        <div class="stop-content same-icon" @click="stopGenerate">
            <span class="stop-icon icon-decoration">
                <el-icon color="#fff" size="18px"><CircleClose /></el-icon>
            </span>
            <span>停止生成</span>
        </div>

        <div class="regenerate-content same-icon" @click="regenerate">
          <span class="regenerate-icon icon-decoration">
              <el-icon color="#fff" size="18px"><Refresh /></el-icon>
          </span>
            <span>重新生成</span>
        </div>

        <div class="continue-content same-icon" @click="continueGenerate">
          <span class="regenerate-icon icon-decoration">
              <el-icon color="#fff" size="18px"><DArrowRight /></el-icon>
          </span>
            <span>继续生成</span>
        </div>
    </div>
</template>

<script lang="ts" setup>

import useChatStore from "@/store/modules/chatgpt/chatRoom.ts";

const chatStore = useChatStore();
/**
 * 打开搜索框
 */
const openInput = () => {
    chatStore.chatStart = false;
}

/**
 * 停止生成
 */
const stopGenerate = () => {

}

/**
 * 重新生成
 */
const regenerate = () => {

}

/**
 * 继续生成
 */
const continueGenerate = () => {

}

</script>

<style scoped>
.same-icon,
.input-icon {
    cursor: pointer;
}
.input-icon {
    width: 20px;
    height: 20px;
    background-color: #5a5f8a;
    border-radius: 15%;
    padding: 7px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
}
.input-icon:active {
    transform: scale(0.96);
}

.same-icon {
    width: 150px;
    height: 40px;
    border: 1px solid #565869;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #d9d9e3;
    margin: 5px 10px;
    user-select: none;
    span {
        display: flex;
        align-items: center;
        margin: 5px;
        font-size: 16px;
    }
}
.icon-decoration {
    display: flex;
    align-items: center;
    margin-right: 5px;
}

.stop-content:hover,
.continue-content:hover,
.regenerate-content:hover {
    background-color: #3f404e;
    transition: background-color 0.3s ease-in-out;
}
.stop-content:active,
.continue-content:active,
.regenerate-content:active {
    transform: scale(0.98);
}

@media (max-width: 760px) {
    .same-icon {
        width: 100px;
    }
}
</style>