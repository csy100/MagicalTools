import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {session} from "@/store/types.ts";

const useSessionStore = defineStore('session', () => {

    const sessionList: Ref<session[]> = ref([]);
    const sessionAdd = ref(false);
    const sessionId = ref('');


    return {
        sessionList,
        sessionAdd,
        sessionId,
    };

}, {
    // 持久化数据
    persist: {
        key: 'sessionKey',
        storage: window.sessionStorage,
        paths: ['sessionId']
    }
});

export default useSessionStore;
