<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
})



</script>

<template>
    <div class="h-[1000px] bg-[#0f1013]">
        <div class="sticky top-0 w-[85%] lg:w-[60%] h-screen m-auto flex items-center">
            <div>
                <div class="flex items-center gap-4">
                    <h1 class=" text-center font-lao font-normal">II.</h1>
                    <strong class=" block leading-8">
                        平行宇宙<br>
                        我是誰？你是誰？
                    </strong>
                </div>
                <p class="py-6">
                    人生不能重來，但可以保有期待，
                    功成名就後的光景、填補缺憾的滿足，
                    與他對談，你將知曉做出不同選擇後，
                    你得到了什麼？又失去了什麼？
                </p>
                <div class="flex justify-center py-4">
                    <div class="flex justify-center overflow-hidden max-w-[800px]">
                        <img class="w-full" src="@/assets/roles2.jpg" alt="">
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