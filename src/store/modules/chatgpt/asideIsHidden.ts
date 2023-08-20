import { defineStore } from 'pinia';
import {ref} from "vue";

const useHiddenStore = defineStore('hidden', () => {
    const asideIsHidden = ref(false);
    return {
        asideIsHidden
    }
});
export default useHiddenStore;