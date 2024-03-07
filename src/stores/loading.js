import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', ()=>{
    const isLoading = ref(false);

    function LoadingStart(){
        document.body.style.overflow = 'hidden';
        console.log(document.body.style.overflow);
        isLoading.value = true;
    }
    function LoadingEnd(){
        document.body.style.overflow = '';
        isLoading.value = false;
    }

    return {
        isLoading,
        LoadingStart,
        LoadingEnd
    }
})