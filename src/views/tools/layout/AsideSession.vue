<template>
    <div class="aside-container">
        <div class="header-content">
            <aside-header/>
        </div>

        <div class="scrollable-section">
            <aside-main/>
        </div>

        <div class="footer-content">
            <aside-footer/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import AsideHeader from "@/views/tools/layout/asideView/AsideHeader.vue";
import AsideMain from "@/views/tools/layout/asideView/AsideMain.vue";
import AsideFooter from "@/views/tools/layout/asideView/AsideFooter.vue";
</script>

<style scoped>
.aside-container {
    height: var(--calc-height);
    background-color: var(--aside-theme);

    display: flex;
    flex-direction: column;
}
.header-content {
    height: 65px;
}
.scrollable-section {
    overflow-y: auto;
    overflow-x: hidden;
}
.footer-content {
    height: 70px;
}
</style>