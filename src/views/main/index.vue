<template>
    <div>
        <el-container>
            <el-header>
                <CommonNavHeader/>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import CommonNavHeader from "@/components/CommonNavHeader.vue";

</script>

<style scoped>
.el-header {
    padding: 0;
}
.el-main {
    padding: 0;
}

</style>