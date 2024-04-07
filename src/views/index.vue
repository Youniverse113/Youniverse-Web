<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/axios.js';
// Import Swiper's required moduless
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
//import components
import Navbar from '@/components/Navbar.vue';
import Intro from '@/components/Intro.vue';
import Exhibition_Painting from '@/components/Exhibition_Painting.vue';
import Exhibition_Roles from '@/components/Exhibition_Roles.vue';
import Exhibition_Age from '@/components/Exhibition_Age.vue';
import TopUsersCard from '@/components/TopUsersCard.vue';
import Footer from '@/components/Footer.vue';
//import ScrollReveal
import ScrollReveal from 'scrollreveal';

const router = useRouter();

const swiperInstance = ref(null)
const swiperIsReady = ref(false)
function onSwiper(swiper) {
    swiperInstance.value = swiper
    swiperIsReady.value = true
}
const slideChange = (n) => {
    if (n > 0 && activeIndex.value < topUsers.value.length - 1) {
        swiperInstance.value.slideNext();
    }
    else if (n < 0 && activeIndex.value > 0) {
        swiperInstance.value.slidePrev();
    }
};
const activeIndex = computed({
    get() {
        return swiperInstance.value.activeIndex;
    },
})

const getTopUsers = async () => {
    const topUsers_res = await api.post('/getTopUsers', { offset: 0, limit: 5 });
    topUsers.value = topUsers_res.data.usersList.map((user) => {
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

const isScrollRevealOnCard = ref(false);
const afterReveal = (el) => {
    isScrollRevealOnCard.value = true;
}
onMounted(async () => {
    ScrollReveal().reveal('.scroll_reveal', {
        reset: true,
        distance: '30px',
        origin: 'bottom'
    })
    ScrollReveal().reveal('.scroll_reveal_card', {
        reset: false,
        distance: '30px',
        origin: 'bottom',
        afterReveal
    })
    ScrollReveal().reveal('.scroll_reveal_notReset', {
        reset: false,
        distance: '30px',
        origin: 'bottom'
    });

    await getTopUsers();
})

const topUsers = ref([])
</script>

<template>
    <Navbar></Navbar>
    <Intro></Intro>
    <div class="">
        <div class="w-[85%] lg:w-[60%] m-auto mb-[16vh]">
            <h1 class="scroll_reveal whitespace-break-spaces">探索屬宇你的宇宙，<br>與你相遇。
            </h1>
            <p class="py-6 scroll_reveal">看見不一樣的自己，<br>
                經典藝術與AI科技的詼諧轉譯，<br>
                典雅中帶點愜意，逗趣中富含品味，<br>
                好玩、好拍，翻轉觀展傳統體驗。</p>
        </div>
        <!-- <Exhibition_Painting></Exhibition_Painting> -->
        <Exhibition_Roles class="scroll_reveal"></Exhibition_Roles>
        <Exhibition_Age class="scroll_reveal"></Exhibition_Age>
    </div>
    <div class="overflow-hidden flex items-center justify-center py-[16vh]">
        <div>
            <div class="w-[85%] lg:w-[60%] m-auto mb-[5vh]">
                <h1 class="scroll_reveal whitespace-break-spaces text-center">人氣精選，宇你分享
                </h1>
                <p class="py-6 scroll_reveal text-center">來看看誰是人氣王，將你的宇宙分享給朋友們，讓他們為你的宇宙貼上標籤，
                    邀請他們一同進入宇你的世界！</p>
                <div class="flex justify-center items-center">
                    <a @click="router.push('/exhibition')">
                        <button class="flex items-center justify-between gap-2">查看你的宇宙
                            <font-awesome-icon :icon="['fas', 'arrow-right']"
                                class="text-spline-text w-[16px] h-[16px] bg-spline-button-2 rounded-full p-2" />
                        </button>
                    </a>
                </div>
            </div>
            <div class="scroll_reveal_card">
                <swiper v-if="topUsers.length" @swiper="onSwiper" :effect="'cards'" :grabCursor="true"
                    :modules="[EffectCards]" class="mySwiper">
                    <swiper-slide v-for="(user, index) in topUsers" :key="user.userId">
                        <TopUsersCard v-if="swiperIsReady" @slideChange="slideChange" :user="user" :index="index"
                            :isScrollRevealOnCard="isScrollRevealOnCard" :activeIndex="activeIndex" />
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<style scoped>
.of {
    overflow: hidden;
}

.swiper {
    width: 240px;
    height: 360px;
}

.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 22px;
    font-weight: bold;
}
</style>