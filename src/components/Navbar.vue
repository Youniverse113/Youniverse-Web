<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const path = computed(() => {
    return route.path;
})

const navbar = ref(null);
const isShowNavbar = ref(false);
let breakpoint = null;
let currentScrollY = 0;
onMounted(() => {
    nextTick(() => {
        breakpoint = document.getElementById('breakpoint')
    })
    window.addEventListener('scroll', scrollHandle);
})
onUnmounted(() => {
    window.removeEventListener('scroll', scrollHandle)
})
const scrollHandle = () => {
    if (path.value === '/') {
        if (breakpoint.getBoundingClientRect().top < 0 && window.scrollY < currentScrollY) {
            isShowNavbar.value = true;
        } else {
            isShowNavbar.value = false;
        }
        currentScrollY = window.scrollY;
    } else {
        isShowNavbar.value = true;
    }
}

watch(path, () => {
    if (path.value !== '/') {
        console.log('show');
        isShowNavbar.value = true;
    } else {
        if(!breakpoint) return;
        if (breakpoint.getBoundingClientRect().top < 0 && window.scrollY < currentScrollY) {
            isShowNavbar.value = true;
        } else {
            isShowNavbar.value = false;
        }
    }
}, { immediate: true })

</script>

<template>
    <transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut">
        <div v-show="isShowNavbar" ref="navbar"
            class="fixed top-0 z-50 w-full bg-spline-800/10  backdrop-blur-xl border-b border-spline-700-focus">
            <div class="w-full flex">
                <a @click="router.push('/')" class="grow px-4 p-2">
                    <div class=" bg-[#303337] rounded-full p-1 w-[30px]">
                        <img class="" src="@/assets/logo.png" alt="">
                    </div>
                </a>
                <div class="flex items-center gap-5 mr-5">
                    <a @click="router.push('/')" class=" text-xs font-medium">主頁</a>
                    <a @click="router.push('/exhibition')" class=" text-xs font-medium">展出</a>
                    <a @click="router.push('/')" class=" text-xs font-medium">關於我們</a>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.animate__fadeIn {
    --animate-duration: 0.5s;
}

.animate__fadeOut {
    --animate-duration: 0.5s;
}
</style>