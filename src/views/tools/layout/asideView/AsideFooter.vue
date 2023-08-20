<template>
    <div class="footer-container">
        <div class="footer-line"/>

        <div class="setting-container" @click="drawer = true">
            <div class="setting-content">
                <div class="setting-left">
                    <span class="setting-icon">
                      <el-icon><Tools/></el-icon>
                    </span>
                    <span>更多设置</span>
                </div>

                <span>
                  <el-icon color="#fff" size="18px"><More/></el-icon>
              </span>
            </div>
        </div>

        <div class="drawer-container">
            <el-drawer v-model="drawer"
                       :with-header="false"
                       direction="ltr"
                       size="35%"
                       style="background-color: #343442"
            >
                <chat-setting/>
            </el-drawer>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import ChatSetting from "@/views/tools/layout/settingView/chatSetting.vue";

const drawer = ref(false);
</script>

<style scoped>

.footer-line {
    width: 90%;
    border-top: 1px solid #4d4d4f;
    margin-top: 5px;
    margin-left: 4%;
}

.setting-container {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.setting-content {
    width: 91%;
    height: 40px;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    color: #d9d9e3;
    margin: 6px 10px 0 6px;
    background-color: #353542;
}

.setting-content:hover {
    color: #000000;
    background-color: #717388;
    transition: all 0.3s ease-in-out;
}

.setting-content:active {
    transform: scale(0.95);
}

.setting-left {
    display: flex;
    align-items: center;
    justify-content: center;
}

.setting-icon {
    display: flex;
    align-items: center;
    margin-right: 8px;
}
</style>