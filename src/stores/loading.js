import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';



export const useLoadingStore = defineStore('loading', () => {
    const route = useRoute();
    const path = computed(()=>{
        return route.path;
    })
    const isSplineLoading = computed(() => {
        if(path.value !== '/') return false;
        return isLoadingSplineViewer.value[0] || isLoadingSplineViewer.value[1] || isLoadingSplineViewer.value[2];
    })
    
    const isLoadingSplineViewer = ref([true, true, true]);

    function LoadingStart(index) {
        console.log('LoadingStart');
        document.body.style.overflow = 'hidden';
        isLoadingSplineViewer.value[index] = true;
    }
    function LoadingEnd(index) {
        isLoadingSplineViewer.value[index] = false;
        if(!isLoadingSplineViewer.value[0] && !isLoadingSplineViewer.value[1] && !isLoadingSplineViewer.value[2]){
            document.body.style.overflow = '';
        }
    }

    return {
        isSplineLoading,
        LoadingStart,
        LoadingEnd
    }
})