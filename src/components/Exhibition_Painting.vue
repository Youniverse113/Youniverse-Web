<script setup>
// import 'https://unpkg.com/@splinetool/viewer@1.0.54/build/spline-viewer.js';
import '@splinetool/viewer';
import { ref, onMounted } from 'vue';
// import { Application } from '@splinetool/runtime';



const splineViewer_MonaLisa = ref(null);
const splineViewer_PearlGirl = ref(null);
const splineViewer_MonaLisa_url = ref('https://prod.spline.design/XQCl103dH0ojxExi/scene.splinecode');
const splineViewer_PearlGirl_url = ref('https://prod.spline.design/fifzXMm1DlNpiviB/scene.splinecode');

onMounted(() => {
    // splineViewer_MonaLisa.value.addEventListener(('load-start'), () => {
    //     LoadingStart(1);
    // })
    splineViewer_MonaLisa.value.addEventListener(('load-complete'), () => {
        splineViewer_MonaLisa.value.shadowRoot.querySelector('#logo').style.display = 'none';
        // LoadingEnd(1);
    })

    //2222
    // splineViewer_PearlGirl.value.addEventListener(('load-start'), () => {
    //     LoadingStart(2);
    // })
    splineViewer_PearlGirl.value.addEventListener(('load-complete'), () => {
        splineViewer_PearlGirl.value.shadowRoot.querySelector('#logo').style.display = 'none';
        // LoadingEnd(2);
    })
})

const currentIndex = ref(0);
const ChageIndex = (index) => {
    currentIndex.value = index;
}


</script>

<template>
    <div class="relative h-[2200px]">
        <div class="w-full h-screen sticky top-0">
            <div class=" absolute top-0 z-[-1] w-full h-screen"
                :class="[currentIndex === 0 ? 'opacity-100 duration-700' : 'opacity-0 duration-700']">
                <spline-viewer loading="eager" ref="splineViewer_MonaLisa" :url="splineViewer_MonaLisa_url"></spline-viewer>
            </div>
            <div class=" absolute top-0 z-[-1] w-full h-screen"
                :class="[currentIndex === 1 ? 'opacity-100 duration-700' : 'opacity-0 duration-700']">
                <spline-viewer loading="eager" ref="splineViewer_PearlGirl" :url="splineViewer_PearlGirl_url"></spline-viewer>
            </div>
            <div class="w-full absolute top-0">
                <div
                    class="w-[85%] lg:w-[60%] m-auto h-screen py-[16vh] flex flex-col justify-between max-[375px]:py-[14vh]">
                    <div class="scroll_reveal_notReset">
                        <h1 class=" text-center mb-2 font-lao font-normal">I.</h1>
                        <strong class="block leading-8 text-center w-full ">
                            情緒不掛臉上，掛哪？<br>
                            我又不是蒙娜麗莎。
                        </strong>
                    </div>
                    <div class="w-full flex justify-center items-center">
                        <div
                            class="w-[100px] h-[46px] px-3 bg-spline-700-focus rounded-3xl flex justify-between items-center">
                            <div @click="ChageIndex(0)" class="w-[32px] h-[32px] overflow-hidden rounded-3xl"
                                :class="[currentIndex === 0 ? 'opacity-100 duration-700' : 'opacity-30 duration-700']">
                                <img class=" w-full h-full object-cover" src="@/assets/MonaLisaWeb-Icon.jpg" alt="">
                            </div>
                            <div @click="ChageIndex(1)" class="w-[32px] h-[32px] overflow-hidden rounded-3xl"
                                :class="[currentIndex === 1 ? 'opacity-100 duration-700' : 'opacity-30 duration-700']">
                                <img class=" w-full h-full object-cover" src="@/assets/PearlGirl-Icon.jpg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.font-lao {
    font-family: "Noto Sans Lao Looped", sans-serif;
}
</style>