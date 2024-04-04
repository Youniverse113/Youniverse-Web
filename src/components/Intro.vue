<script setup>
// import 'https://unpkg.com/@splinetool/viewer@1.0.54/build/spline-viewer.js';
import '@splinetool/viewer';
import { ref, onMounted } from 'vue';
// import { Application } from '@splinetool/runtime';

import { useLoadingStore } from '@/stores/loading';
const store = useLoadingStore();
const { LoadingStart, LoadingEnd, isLoading } = store;


const splineViewer = ref(null);
const spline_url = ref('https://prod.spline.design/jmI0zER81VII4e4M/scene.splinecode');
const isShowScrollHint = ref(true);

onMounted(() => {
    // start the application and load the scene
    // const spline = new Application();
    window.addEventListener('scroll', () => {
        if (window.scrollY > 800) {
            isShowScrollHint.value = false;
        } else {
            isShowScrollHint.value = true;
        }
    })
    splineViewer.value.addEventListener(('load-start'), () => {
        console.log('loading start');
        LoadingStart();
    })
    splineViewer.value.addEventListener(('load-complete'), () => {
        splineViewer.value.shadowRoot.querySelector('#logo').style.display = 'none';
        console.log('loading end');
        
        LoadingEnd();
        // setTimeout(() => {
        //     LoadingEnd();
        // }, 3000);
    })
})

</script>

<template>
    <div id="intro" class="relative h-[3000px]">
        <div class="w-full h-screen sticky top-0">
            <spline-viewer loading="eager" ref="splineViewer" :url="spline_url"></spline-viewer>
            <!-- <canvas ref="spline3D"></canvas> -->
            <transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut">
                <div v-show="isShowScrollHint" class="flex justify-center items-center relative bottom-[25vh]">
                    <div class="w-[23px] h-[40px] border rounded-2xl border-neutral-500">
                        <span class="scroll-hint block w-[1px] h-[7px] my-[6px] mx-auto bg-neutral-200"></span>
                    </div>
                </div>
            </transition>
        </div>
        <div id="breakpoint" class=" absolute bottom-[80vh]"></div>
        <div class=" absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-spline-900 "></div>
    </div>
</template>

<style scoped>
.animate__animated.animate__fadeIn.animate__fadeOut {
    --animate-duration: 0.5s;
}

.scroll-hint {
    animation: scroll 1s infinite;
}

@keyframes scroll {
    0% {
        opacity: 1;
        -webkit-transform: translateY(12px);
        -ms-transform: translateY(12px);
        transform: translateY(12px);
    }

    100% {
        opacity: 0;
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
    }
}
</style>