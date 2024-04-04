<script setup>
    import { ref, onMounted, nextTick, computed, watch } from 'vue';
</script>
<template>
    <div class="w-full flex flex-col gap-3 py-2">
        <div class="w-full h-[27px] bg-spline-button-3 rounded-xl skeleton"></div>
        <div class="w-full h-[200px] bg-spline-button-3 rounded-xl skeleton"></div>
    </div>
</template>
<style scoped>
    .skeleton {
        animation: skeleton .7s infinite alternate;
    }
    @keyframes skeleton {
        0% {
            @apply bg-spline-button-3;
        }
        100% {
            @apply bg-[#343434];
        }
    }
</style>