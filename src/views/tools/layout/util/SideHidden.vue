<template>
    <div class="sidebar-hidden" @click="asideIsHidden">

        <template v-if="!isHidden">
            <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="隐藏侧边栏"
                    placement="right"
            >
                <el-icon color="#f9fafc" size="15px" >
                    <ArrowLeftBold />
                </el-icon>
            </el-tooltip>
        </template>

        <template v-if="isHidden">
            <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="打开侧边栏"
                    placement="right"
            >
                <el-icon color="#f9fafc" size="15px" >
                    <ArrowRightBold />
                </el-icon>
            </el-tooltip>
        </template>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import useHiddenStore from "@/store/modules/chatgpt/asideIsHidden.ts";

const isHidden = ref(false);
const hiddenStore = useHiddenStore();

/**
 * 判断不是折叠状态
 */
const asideIsHidden = () => {
    isHidden.value = !isHidden.value;
    hiddenStore.asideIsHidden = isHidden.value;
}
</script>

<style scoped>
.sidebar-hidden {
    width: 10px;
    height: 10px;
    background-color: #636579;
    border-radius: 6px;
    padding: 10px;
    cursor: pointer;
    margin: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
}
.sidebar-hidden:active {
    transform: scale(0.99);
}
.sidebar-hidden:hover {
    background-color: var(--hover-color);
    transition: 0.3s all ease-in-out;
}
</style>