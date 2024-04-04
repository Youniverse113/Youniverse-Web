import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';



export const useLoadingStore = defineStore('loading', () => {
    const route = useRoute();
    const path = computed(() => {
        return route.path;
    })

    const isLoading = ref(false);
    function LoadingStart() {
        isLoading.value = true;
        document.body.style.overflow = 'hidden';
    }
    function LoadingEnd() {
        isLoading.value = false;
        document.body.style.overflow = '';
    }

    return {
        LoadingStart,
        LoadingEnd,
        isLoading
    }
})