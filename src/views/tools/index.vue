<template>
    <div class="tools-container">
        <el-container>
            <el-aside style="z-index: 100" :width="hiddenStore.asideIsHidden ? '0' : '260px'">
                <aside-session/>
            </el-aside>
            <el-container>
                <chat-main style="z-index: 10"/>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import useHiddenStore from "@/store/modules/chatgpt/asideIsHidden.ts";
import AsideSession from "@/views/tools/layout/AsideSession.vue";
import ChatMain from "@/views/tools/layout/ChatMain.vue";

const hiddenStore = useHiddenStore();
</script>

<style scoped>
.tools-container {
    height: var(--calc-height);
    overflow: hidden;
}
</style>