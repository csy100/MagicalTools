<template>
    <div class="inform-container">
        <div class="inform-content">
            <div class="daily-content">
                <p style="font-size: 1.5rem">内测阶段，欢迎使用</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.inform-container {
  height: var(--calc-height);
  background-color: var(--main-theme);
  color: white;
  overflow-y: auto;
}

.inform-content {
  display: flex;
  justify-content: center;
}

.daily-content {
    width: 60%;
    border: 2px solid #00C6C1;
    border-radius: 10px;
    padding: 10px 10px 15px 50px;
    margin: 15px;
}
/*===========================================================*/
.inform-container::-webkit-scrollbar {
    width: 10px; /* 调整滚动条宽度 */
}

.inform-container::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-color); /* 调整滚动条拖动条颜色 */
    border-radius: 8px; /* 轮子圆角度 */
}

.inform-container::-webkit-scrollbar-track {
    border-radius: 8px; /* 轮子圆角度 */
}

/*===========================================================*/
</style>