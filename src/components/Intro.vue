<script setup>
// import 'https://unpkg.com/@splinetool/viewer@1.0.54/build/spline-viewer.js';
import '@splinetool/viewer';
import { ref, onMounted } from 'vue';
// import { Application } from '@splinetool/runtime';

import { useLoadingStore } from '@/stores/loading';
const store = useLoadingStore();
const { LoadingStart, LoadingEnd } = store;


const splineViewer = ref(null);
const spline_url = ref('https://prod.spline.design/jmI0zER81VII4e4M/scene.splinecode');
const isShowScrollHint = ref(true);

onMounted(() => {
    // start the application and load the scene
    // const spline = new Application();
    window.addEventListener('scroll', () => {
        // console.log(window.scrollY);
        if (window.scrollY > 300) {
            isShowScrollHint.value = false;
        } else {
            isShowScrollHint.value = true;
        }
    })
    splineViewer.value.addEventListener(('load-start'), () => {
        console.log('start');
        LoadingStart();
    })
    splineViewer.value.addEventListener(('load-complete'), () => {
        console.log('loaded');
        splineViewer.value.shadowRoot.querySelector('#logo').style.display = 'none';
        LoadingEnd();
    })
})
function onLoad() {
    console.log('loaded');

}

</script>

<template>
    <div id="intro" class=" relative h-[2000px]">
        <div class="w-full h-screen sticky top-0">
            <spline-viewer :onLoad="onLoad" ref="splineViewer" :url="spline_url"></spline-viewer>
            <!-- <canvas ref="spline3D"></canvas> -->
            <transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut">
                <div v-show="isShowScrollHint" class="flex justify-center items-center relative bottom-[20vh]">
                    <div class="w-[23px] h-[40px] border rounded-2xl border-neutral-500">
                        <span class="scroll-hint block w-[1px] h-[7px] my-[6px] mx-auto bg-neutral-200"></span>
                    </div>
                </div>
            </transition>
        </div>
        <div id="breakpoint" class=" absolute bottom-[65vh]"></div>
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
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        -webkit-transform: translateY(12px);
        -ms-transform: translateY(12px);
        transform: translateY(12px);
    }
}
</style>