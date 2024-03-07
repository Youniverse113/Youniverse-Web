<script setup>
import { useLoadingStore } from '@/stores/loading';
import { storeToRefs } from 'pinia'
const store = useLoadingStore();
const { isLoading } = storeToRefs(store)


import Loading from '../src/components/Loading.vue';
import Navbar from '../src/components/Navbar.vue';
import Footer from '../src/components/Footer.vue';

</script>

<template>
    <Navbar></Navbar>
    <router-view></router-view>
    <Loading v-show="isLoading"></Loading>
    <Footer></Footer>
</template>

<style scoped></style>
