<script setup>
import { useMeta } from 'vue-meta'
import Post from '@/components/Post.vue';
import { ref, onMounted } from 'vue';
import api from '../axios.js';
useMeta({
    title: 'exhibition',
    meta: [
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },]
})

const posts = ref([]);
const getTopUsers = async () => {
    const topUsers_res = await api.post('/getTopUsers', { limit: 5 });
    posts.value = topUsers_res.data.map((user) => {
        const { userId, username, sourceImage, MonaLisaUrl, PearlGirlUrl, faceSwapUrl, ageUrls, likes, hashtags } = user;
        return {
            userId,
            username,
            source: [sourceImage, MonaLisaUrl, PearlGirlUrl, faceSwapUrl, ageUrls[3]],
            likes,
            hashtags
        }
    });
}
const filterType = ref(0);
onMounted(() => {
    getTopUsers();
})
</script>
<template>
    <div class="w-[85%] max-w-[620px] m-auto py-[50px]">
        <div class="w-full mt-6 sticky top-0">
            <label for="search" class="flex items-center w-full px-2 py-1 bg-spline-button-3 rounded-2xl">
                <div class="p-2 flex items-center">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass"
                        class=" text-spline-text2 w-[14px] h-[14px]" />
                </div>
                <input id="search" type="text"
                    class=" bg-transparent text-sm font-normal text-spline-text grow focus:outline-none"
                    placeholder="搜尋">
            </label>
        </div>
        <div class="flex justify-center items-center my-4 gap-2">
            <div @click="filterType = 0" class="py-1 px-10 border-b-2 border-transparent text-spline-text2/40" :class="{'!border-spline-text !text-spline-text' : !filterType}">推薦</div>
            <div @click="filterType = 1" class="py-1 px-10 border-b-2 border-transparent text-spline-text2/40" :class="{'!border-spline-text !text-spline-text' : filterType}">最新</div>
        </div>
        <div class="w-full flex flex-col gap-4">
            <Post v-for="post in posts" v-if="posts.length" :user="post"></Post>
        </div>
    </div>
</template>
<style scoped></style>