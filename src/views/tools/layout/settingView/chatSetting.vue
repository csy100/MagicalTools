<template>
    <div class="chat-setting-container">
        <div style="margin-top: 8vh"/>

        <!--标题功能设置-->
        <!--        <div class="title-setting" style="margin-left: 7px">-->
        <!--            <el-button link type="warning" style=" font-size: 1.3rem;">对话设置</el-button>-->
        <!--        </div>-->

        <!--        <div style="margin-top: 8vh"/>-->

        <!--对话设置-->
        <div class="dialogue-content">
            <div class="chat-model"
                 style="margin: 0 10px 30px 12px;display: flex;align-items: center;justify-content: space-between">
                <span style="font-size: 1.3rem;margin-right: 60px">AI模型: </span>
                <el-select v-model="aiModel" placeholder="Select">
                    <el-option
                            v-for="item in models"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    />
                </el-select>
            </div>
            <div v-for="item in setting"
                 :key="item.name"
                 style="margin: 15px 10px;"
            >
                <span>{{ item.name }}</span>
                <el-slider v-model="item.value"
                           :step="item.step"
                           :max="item.max"
                           :min="item.min"
                           show-input
                />
            </div>

            <div style="display: flex;justify-content: flex-end;margin-top: 60px">
                <el-button color="#7888F3" @click="saveChange">确定</el-button>
                <el-button color="#2F8C89" @click="resetToDefault">重置</el-button>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import {onMounted, Ref, ref} from "vue";
import {ChatSetting} from "@/utils/type.ts";
import {ElNotification} from "element-plus";

const ChatSetting: Ref<ChatSetting> = ref({
    model: '',
    n: 0,
    frequencyPenalty: 0,
    presencePenalty: 0,
    maxTokens: 1024,
    temperature: 1,
    rolePlay: ''
});
const aiModel = ref('gpt-3.5-turbo');
const models = ref([
    {
        value: 'gpt-3.5-turbo',
        label: 'gpt-3.5-turbo',
    },
    {
        value: 'gpt-3.5-turbo-0613',
        label: 'gpt-3.5-turbo-0613',
    },
    {
        value: 'gpt-4',
        label: 'gpt-4',
    },

])
const defaultSetting = [
    {
        name: '上下文长度（0-10）',
        value: 0,
        step: 1,
        max: 10,
        min: 0
    },
    {
        name: '单词重复度[-2, 2]',
        value: 0,
        step: 0.1,
        max: 2,
        min: -2,
    },
    {
        name: '话题重复度[-2, 2]',
        value: 0,
        step: 0.1,
        max: 2,
        min: -2,
    },
    {
        name: '最大单词数',
        value: 1024,
        step: 5,
        max: 2048,
        min: 0,
    },
    {
        name: '随机度（0-2）',
        value: 1,
        step: 0.1,
        max: 2,
        min: 0,
    }
];
const setting = ref([...defaultSetting]);

onMounted(() => {
    const savedSetting = localStorage.getItem('setting');
    const chatSavedSetting = localStorage.getItem('chatSetting');
    if (savedSetting) {
        setting.value = JSON.parse(savedSetting);
    }
    if (chatSavedSetting) {
        aiModel.value = JSON.parse(chatSavedSetting).model;
    }
});
/**
 * 将chatSetting和setting设置保存到本地
 */
const saveChange = () => {
    ChatSetting.value.model = aiModel.value;
    ChatSetting.value.n = setting.value[0].value;
    ChatSetting.value.frequencyPenalty = setting.value[1].value;
    ChatSetting.value.presencePenalty = setting.value[2].value;
    ChatSetting.value.maxTokens = setting.value[3].value;
    ChatSetting.value.temperature = setting.value[4].value;
    localStorage.setItem('chatSetting', JSON.stringify(ChatSetting.value));
    localStorage.setItem('setting', JSON.stringify(setting.value));

    ElNotification({
        message: '设置成功',
        type: 'success',
        duration: 3000,
        position: 'top-left'
    });
}

/**
 * 重置为默认值
 */
const resetToDefault = () => {
    const savedSetting = localStorage.getItem('setting');
    if (savedSetting) {
        setting.value = JSON.parse(savedSetting);
    }
    aiModel.value = 'gpt-3.5-turbo';
    setting.value.forEach((item, index) => {
        item.value = defaultSetting[index].value;
    })

    ElNotification({
        message: '重置成功',
        type: 'success',
        duration: 3000,
        position: 'top-left'
    });
};
</script>

<style scoped lang="scss">
.chat-setting-container {
  color: white;
  overflow: auto;
  height: 100%;
  width: 100%;
}

.chat-setting-container::-webkit-scrollbar {
  width: 0; /* 不显示滚动条 */
}

</style>