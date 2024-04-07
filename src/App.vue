<script setup>
import { useLoadingStore } from '@/stores/loading';
import { storeToRefs } from 'pinia'
const store = useLoadingStore();
const { isLoading } = storeToRefs(store)

import Loading from '../src/components/Loading.vue';
</script>

<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content ? `${content}` : `宇你 Youniverse` }}</template>
    </metainfo>
    <router-view></router-view>
    <Loading v-show="isLoading"></Loading>
</template>

<style scoped></style>
