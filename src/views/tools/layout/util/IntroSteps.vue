<template>
    <div class="step-container">
        <div style="margin-top: 20px; margin-bottom: 20px; width: 55vw;">
            <el-alert
                    title="欢迎使用MagicalTools"
                    type="success"
                    description="本系统是一个基于GPT API的网页应用，你可以自由地和它聊天、问问题、做翻译、学语言等等，在这里你可以体验到GPT模型的强大能力。"
                    show-icon
            />
        </div>
        <div style="margin-top: 20px; margin-bottom: 20px; width: 10vw;">
            <el-alert title="使用方法如下" type="warning" effect="dark" show-icon />
        </div>
        <div>
            <el-steps :active="active" finish-status="success" style="width: 60vw" direction="horizontal">
                <el-step
                        v-for="(item, index) in stepData"
                        :key="index"
                        :title="item.title"
                        :description="item.description"

                />
            </el-steps>
        </div>
        <div style="display: flex; justify-content: center">
            <el-button style="margin-top: 20px; display: flex; align-items: center; background-color: #4f46e5; color: #ffffff" @click="next">已了解，下一步</el-button>
        </div>


    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const active = ref(0)
const next = () => {
    if (active.value++ > 2) active.value = 0
}

const stepData = ref([
    {
        index: 1,
        title: '步骤1',
        description: '请先点击左侧聊天列表上方的”新增对话”按钮，创建一个新的对话，或选择已有对话;'
    },
    {
        index: 2,
        title: '步骤2',
        description: '在对话列表中，点击你刚刚创建的对话进入对话页面;'
    },
    {
        index: 3,
        title: '步骤3',
        description: '在聊天页面中，在下方的输入框中输入你想要和ChatGPT聊天的内容，然后点击”发送”按钮，即可和ChatGPT聊天.'
    },

])
</script>

<style scoped>
.step-container {
    margin: 100px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    font-size: 16px;
}
</style>