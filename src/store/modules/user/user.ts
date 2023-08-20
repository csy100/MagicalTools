import {defineStore} from 'pinia';
import {ref} from "vue";

const useUserStore = defineStore('user', () => {
    const token = ref(localStorage.getItem('token'));

    return {
        token
    }
});

export default useUserStore;