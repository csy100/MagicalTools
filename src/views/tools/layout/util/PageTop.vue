<template>
    <div class="scroll-container">
        <div class="scroll-icon">
            <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="顶部"
                    placement="right"
            >
                <el-icon size="18px" color="white"><Top /></el-icon>
            </el-tooltip>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.scroll-container {
    padding-left: 8px;
    cursor: pointer;
    margin-top: 1px;
}

.scroll-icon {
    width: 20px;
    height: 20px;
    background-color: #3c3e52;
    border-radius: 50%;
    padding: 7px;
    cursor: pointer;
    margin: 5px 0 8px 9px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.scroll-icon:active {
    transform: scale(0.99);
}
.scroll-icon:hover {
    background-color: var(--hover-color);
    transition: 0.3s all ease-in-out;
}
</style>