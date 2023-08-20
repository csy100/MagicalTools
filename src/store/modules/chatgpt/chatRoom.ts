import {defineStore} from "pinia";
import {ref, Ref} from "vue";
import {chatDialogue} from "@/store/types.ts";

const useChatStore = defineStore('chat', () => {
    const chatList: Ref<chatDialogue[]> = ref([]);
    const chatStart = ref(false);
    const chatGenerate :Ref<number> = ref(0); // 1: 停止生成 2 : 重新生成 3 : 继续生成

    return {
        chatList,
        chatStart,
        chatGenerate
    }
});

export default useChatStore;