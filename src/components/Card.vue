<script setup>
import { ref, onMounted, computed, watch } from 'vue';


const props = defineProps({
    user: Object,
    index: Number,
    activeIndex: Number,
    isScrollRevealOnCard: Boolean
})
const activeIndex = computed(() => {
    return props.activeIndex
})
const emit = defineEmits(['slideChange'])

const progress_0 = ref(null);
const progress_1 = ref(null);
const progress_2 = ref(null);
const progress_3 = ref(null);
const progress_4 = ref(null);
const progress_state = ref(0);

let progress = []
let width = 0;
let interval = null;
onMounted(() => {
    progress = [progress_0.value, progress_1.value, progress_2.value, progress_3.value, progress_4.value]
    progressBarAnimation()
})
function progressBarAnimation() {
    interval = setInterval(frame, 1);
    function frame() {
        if (props.index === props.activeIndex && props.isScrollRevealOnCard) {
            if (width >= 100) {
                if (progress_state.value == 4) {
                    emit('slideChange', 1);
                } else {
                    progress_state.value++;
                    width = 0;
                }
            } else {
                width += 0.15;
                progress[progress_state.value].style.width = width + '%';
            }
        }
    }
}
const nextIndex = (n) => {
    //跳上一Card
    if (progress_state.value + n < 0) {
        return emit('slideChange', -1);
    } else if (progress_state.value + n > props.user.source.length - 1) {
        return emit('slideChange', 1);
    }
    if (n > 0) {
        progress[progress_state.value].style.width = '100%';
        width = 0;
        progress_state.value++;
    } else {
        progress[progress_state.value].style.width = '0%';
        width = 0;
        progress_state.value--;
    }
}

watch(activeIndex, (newVal, oldVal) => {
    if(newVal <= oldVal) {
        if (newVal === props.index && width >= 100) {
            width = 0;
        }
    }
})


</script>

<template>
    <div class="relative w-full h-full bg-spline-700-focus">
        <div class="relative z-20 w-full h-full flex flex-col">
            <div class="w-full flex items-center p-2 px-4">
                <span class=" text-sm font-bold">@{{ props.user.username }}</span>
            </div>
            <div class="w-full px-2 flex justify-around gap-1">
                <div class="progress">
                    <div ref="progress_0" class="progress-bar"></div>
                </div>
                <div class="progress">
                    <div ref="progress_1" class="progress-bar"></div>
                </div>
                <div class="progress">
                    <div ref="progress_2" class="progress-bar"></div>
                </div>
                <div class="progress">
                    <div ref="progress_3" class="progress-bar"></div>
                </div>
                <div class="progress">
                    <div ref="progress_4" class="progress-bar"></div>
                </div>
            </div>
            <div class="grow shrink w-full h-full flex">
                <div @click="nextIndex(-1)" class="w-1/2 h-full"></div>
                <div @click="nextIndex(1)" class="w-1/2 h-full"></div>
            </div>
        </div>
        <div class="absolute z-0 top-0 w-full h-full">
            <div v-show="progress_state == 0" class="absolute w-full h-full flex items-center">
                <img :src="props.user.source[0]" alt="" class="w-full z-[1]">
                <img :src="props.user.source[0]" alt=""
                    class=" absolute z-0 w-full h-full object-cover opacity-20"><!-- <img :src="props.user.source[0]" alt="" class=" absolute z-0 w-full h-full object-cover opacity-30"> -->
            </div>
            <div class="w-full h-full" v-show="progress_state == 1">
                <img :src="props.user.source[1]" alt="" class="w-full h-full object-cover">
            </div>
            <div class="w-full h-full" v-show="progress_state == 2">
                <img :src="props.user.source[2]" alt="" class="w-full h-full object-cover">
            </div>
            <div v-show="progress_state == 3" class="w-full h-full flex items-center">
                <img :src="props.user.source[3]" alt="" class="w-full z-[1]">
                <img :src="props.user.source[3]" alt=""
                    class=" absolute z-0 w-full h-full object-cover opacity-20">
            </div>
            <div v-show="progress_state == 4" class="w-full h-full flex items-center">
                <img :src="props.user.source[4]" alt="" class="w-full z-[1]">
                <img :src="props.user.source[4]" alt=""
                    class=" absolute z-0 w-full h-full object-cover opacity-20">
            </div>
        </div>

    </div>
</template>

<style scoped>
span {
    @apply text-[#ffffffcc]
}

.progress {
    @apply grow h-[2px] bg-white/20
}

.progress-bar {
    @apply w-0 h-[2px] bg-white
}
</style>