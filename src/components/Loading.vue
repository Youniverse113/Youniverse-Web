<script setup>
import 'animate.css';

</script>

<template>
    <transition name="fade" leave-active-class="animate__animated animate__fadeOut">
        <div class="w-screen h-screen top-0 left-0 z-50 fixed bg-spline-900 flex flex-col items-center justify-center">
            <div class="w-[100px]">
                <img src="@/assets/logo.png" alt="" class="w-full">
            </div>
            <div class="">
                <div class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </transition>

</template>

<style scoped>
.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 65px;
    height: 13px;
}

.lds-ellipsis div {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #f8f8cb;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
    left: 16px;
    animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
    left: 16px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
    left: 48px;
    animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}

@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(16px, 0);
    }
}
</style>