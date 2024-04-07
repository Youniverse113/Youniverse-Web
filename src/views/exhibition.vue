<script setup>
import Navbar from '@/components/Navbar.vue';
import Post from '@/components/Post.vue';
import Skeleton from '@/components/Skeleton.vue';
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import api from '../axios.js';
onMounted(() => {
    window.scrollTo({ top: 0 })
    getTopUsers();
    initLiked();
})
onUnmounted(() => {
    window.removeEventListener('scroll', scrollHandle)
})

const posts = ref([]);
const LIMIT = 3;
let offset = ref(0);
let hasMore = ref(true);
const filterType = ref(0);
const changeFilter = (index, isFromButton) => {
    if (index === filterType.value && isFromButton) return;
    filterType.value = index;
    offset.value = 0;
    hasMore.value = false;
    posts.value = [];
    if (index === 0) {
        getTopUsers();
    } else {
        getNewUsers();
    }
}
const getTopUsers = async () => {
    isGettingUsers.value = true;
    const topUsers_res = await api.post('/getTopUsers', { offset: offset.value, limit: LIMIT });
    hasMore.value = topUsers_res.data.hasMore;
    offset.value += LIMIT;
    const newPost = topUsers_res.data.usersList.map((user) => {
        const { userId, username, sourceImage, MonaLisaUrl, PearlGirlUrl, faceSwapUrl, ageUrls, likes, hashtags } = user;
        return {
            userId,
            username,
            source: [faceSwapUrl, MonaLisaUrl, PearlGirlUrl, ageUrls[3]],
            likes,
            hashtags
        }
    });
    posts.value = posts.value.concat(newPost);
    isGettingUsers.value = false;
}
const getNewUsers = async () => {
    isGettingUsers.value = true;
    const newUsers_res = await api.post('/getNewUsers', { offset: offset.value, limit: LIMIT });
    hasMore.value = newUsers_res.data.hasMore;
    offset.value += LIMIT;
    const newPost = newUsers_res.data.usersList.map((user) => {
        const { userId, username, sourceImage, MonaLisaUrl, PearlGirlUrl, faceSwapUrl, ageUrls, likes, hashtags } = user;
        return {
            userId,
            username,
            source: [faceSwapUrl, MonaLisaUrl, PearlGirlUrl, ageUrls[3]],
            likes,
            hashtags
        }
    });
    posts.value = posts.value.concat(newPost);
    isGettingUsers.value = false;
}
//dynamic getUsers
const isGettingUsers = ref(false);
const container = ref(null);
async function scrollHandle() {
    if (window.scrollY + window.screen.height >= container.value.offsetHeight) {
        if (!hasMore.value) return;
        if (isGettingUsers.value) return;

        if (searchInput.value !== '') await search();
        if (filterType.value === 0) {
            await getTopUsers();
        } else {
            await getNewUsers();
        }
    }
}
window.addEventListener('scroll', scrollHandle)

//like
const liked = ref([]);
function initLiked() {
    const likeditems = localStorage.getItem('liked');
    if (likeditems) {
        liked.value = JSON.parse(likeditems);
    } else {
        localStorage.setItem('liked', JSON.stringify([]));
    }
}
const isLiked = computed(() => {
    return posts.value.map((post) => {
        return liked.value.includes(post.userId)
    })
})
const like = (userId) => {
    liked.value.push(userId);
    localStorage.setItem('liked', JSON.stringify(liked.value));
}
const returnLike = (userId) => {
    liked.value = liked.value.filter((id) => id !== userId);
    localStorage.setItem('liked', JSON.stringify(liked.value));
}

//search
let timer;
function debounce(fn, delay = 500) {
    clearTimeout(timer);
    timer = null;
    // 清除之後，再重新計時
    // 當 delay 時間到時，執行 fn
    timer = setTimeout(() => {
        fn();
    }, delay)
    return;
}
const searchInput = ref('');
const search = async () => {
    isGettingUsers.value = true;
    offset.value = 0;
    hasMore.value = false;
    posts.value = [];
    const searchUsers_res = await api.post('/getSearchUsers', { offset: offset.value, limit: LIMIT, searchInput: searchInput.value });
    hasMore.value = searchUsers_res.data.hasMore;
    offset.value += LIMIT;
    const newPost = searchUsers_res.data.usersList.map((user) => {
        const { userId, username, sourceImage, MonaLisaUrl, PearlGirlUrl, faceSwapUrl, ageUrls, likes, hashtags } = user;
        return {
            userId,
            username,
            source: [faceSwapUrl, MonaLisaUrl, PearlGirlUrl, ageUrls[3]],
            likes,
            hashtags
        }
    });
    posts.value = posts.value.concat(newPost);
    isGettingUsers.value = false;
}
watch(searchInput, () => {
    if (searchInput.value === '') {
        changeFilter(filterType.value, false);
    } else {
        debounce(search);
    }
})
</script>
<template>
    <Navbar></Navbar>
    <div ref="container" class="w-[85%] max-w-[620px] m-auto py-[50px]">
        <div class="w-full mt-6 mb-2 sticky top-0">
            <label for="search" class="flex items-center w-full px-2 py-1 bg-spline-button-3 rounded-2xl">
                <div class="p-2 flex items-center">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass"
                        class=" text-spline-text2 w-[14px] h-[14px]" />
                </div>
                <input v-model="searchInput" id="search" type="text"
                    class=" bg-transparent text-sm font-normal text-spline-text grow focus:outline-none"
                    placeholder="搜尋">
            </label>
        </div>
        <div v-show="searchInput === ''" class="flex justify-center items-center my-4 gap-2">
            <div @click="changeFilter(0, true)"
                class="py-1 px-12 border-b-2 border-transparent text-spline-text2/40 cursor-pointer"
                :class="{ '!border-spline-text !text-spline-text': !filterType }">熱門</div>
            <div @click="changeFilter(1, true)"
                class="py-1 px-12 border-b-2 border-transparent text-spline-text2/40 cursor-pointer"
                :class="{ '!border-spline-text !text-spline-text': filterType }">最新</div>
        </div>
        <div class="w-full flex flex-col gap-4">
            <Post v-for="(post, index) in posts" :user="post" :isLiked="isLiked[index]" @like="like"
                @returnLike="returnLike">
            </Post>
            <div v-show="isGettingUsers">
                <Skeleton v-for="index in LIMIT"></Skeleton>
            </div>
        </div>
    </div>
</template>
<style scoped></style>