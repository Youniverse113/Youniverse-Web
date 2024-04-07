<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const container = ref(null);
const scrollPercentage = ref(0);
const olderImage = ref(null);
const opacityClass = computed(() => `opacity-${Math.min(Math.max(Math.floor(scrollPercentage.value), 0), 100)}`);
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
})
const handleScroll = () => {
    if (container.value.getBoundingClientRect().top > 0) return scrollPercentage.value = 0;
    else if (Math.abs(container.value.getBoundingClientRect().top) > container.value.getBoundingClientRect().height) return scrollPercentage.value = 1;
    else scrollPercentage.value = Math.abs(container.value.getBoundingClientRect().top) / (container.value.getBoundingClientRect().height - 500);
    olderImage.value.style.opacity = scrollPercentage.value;
};
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
})



</script>

<template>
    <div ref="container" class="h-[2000px] bg-[#0f1013]">
        <div
            class="sticky top-0 w-[85%] lg:w-[60%] m-auto py-[12vh] h-screen flex flex-col items-center gap-4 md:flex-wrap md:flex-row">
            <div class="md:w-[40%] flex flex-col justify-center">
                <div class=" flex items-center gap-4">
                    <h1 class=" text-center font-lao font-normal">III.</h1>
                    <strong class="block leading-8">
                        青春猶如昨日<br>
                        皺紋譜寫故事
                    </strong>
                </div>
                <p class="py-6">
                    人生是篇不完美的詩章，時光的流淌任歲月寫滿了臉龐，
                    是緬懷童年的純真，抑或是好奇落幕前鞠躬盡瘁的模樣，一切都能在此得到解答。
                </p>
            </div>
            <div class="flex relative justify-center w-[80%] pb-[80%] min-[380px]:w-full h-0 min-[380px]:pb-[100%] md:w-1/2 md:pb-[50%] md:m-auto">
                <img class=" absolute h-full object-cover rounded-lg" src="@/assets/age-0.png" alt="">
                <img ref="olderImage" class=" absolute h-full  object-cover rounded-lg" :class="opacityClass"
                    src="@/assets/age-80.png" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped>
.font-lao {
    font-family: "Noto Sans Lao Looped", sans-serif;
}
</style>