<script setup>
import { useLoadingStore } from '@/stores/loading';
import { storeToRefs } from 'pinia'
const store = useLoadingStore();
const { isSplineLoading } = storeToRefs(store)


import Loading from '../src/components/Loading.vue';
import Navbar from '../src/components/Navbar.vue';

</script>

<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content ? `${content}` : `Youniverse` }}</template>
    </metainfo>
    <Navbar></Navbar>
    <router-view v-show="!isSplineLoading"></router-view>
    <Loading v-show="isSplineLoading"></Loading>
</template>

<style scoped></style>
