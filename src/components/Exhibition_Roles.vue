<script setup>
import { ref, onMounted } from 'vue';

import { useLoadingStore } from '@/stores/loading';
const store = useLoadingStore();
const { LoadingStart, LoadingEnd } = store;

onMounted(() => {
})



</script>

<template>
    <div class="py-[16vh] max-[375px]:py-[14vh] bg-[#0f1013]">
        <div class="w-[85%] lg:w-[60%] m-auto mb-6">
            <div class="scroll_reveal_notReset flex items-center gap-4">
                <h1 class=" text-center font-lao font-normal">II.</h1>
                <strong class="block leading-8">
                    平行宇宙<br>
                    我是誰？你是誰？
                </strong>
            </div>
            <p class="py-6 scroll_reveal">
                人生不能重來，但可以保有期待，
                功成名就後的光景、填補缺憾的滿足，
                與他對談，你將知曉做出不同選擇後，
                你得到了什麼？又失去了什麼？
            </p>
        </div>
        <div class="w-ful mx-auto lg:w-[60%]">
            <img class="w-full object-cover" src="@/assets/roles2.jpg" alt="">
        </div>
    </div>
</template>

<style scoped>
.font-lao {
    font-family: "Noto Sans Lao Looped", sans-serif;
}
</style>