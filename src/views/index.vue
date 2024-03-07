<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '@/axios.js';
// Import Swiper's required moduless
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
//import components
import Intro from '@/components/Intro.vue';
import Card from '@/components/Card.vue';
//import ScrollReveal
import ScrollReveal from 'scrollreveal';




const swiperInstance = ref(null)
const swiperIsReady = ref(false)
function onSwiper(swiper) {
    swiperInstance.value = swiper
    swiperIsReady.value = true
}
const slideChange = (n) => {
    console.log(n);
    if(n>0) swiperInstance.value.slideNext();
    else swiperInstance.value.slidePrev();
};
const realIndex = computed(()=>{
    return swiperInstance.value.realIndex;
})


const getTopUsers = async () => {
    const topUsers_res = await api.post('/getTopUsers', { limit: 5 });
    topUsers.value = topUsers_res.data.map((user) => {
        const { userId, username, sourceImage, MonaLisaUrl, PearlGirlUrl, faceSwapUrl, likes, hashtags } = user;
        return {
            userId,
            username,
            source: [sourceImage, MonaLisaUrl, PearlGirlUrl, faceSwapUrl],
            likes,
            hashtags
        }
    });
}
onMounted(async () => {
    ScrollReveal().reveal('.scroll_reveal', {
        reset: true,
        distance: '30px',
        origin: 'bottom'
    });
    await getTopUsers();
})

const topUsers = ref([])
</script>

<template>
    <Intro></Intro>
    <div class="scroll_reveal overflow-hidden">
        <swiper v-if="topUsers.length" @swiper="onSwiper" :effect="'cards'" :grabCursor="true"
            :modules="[EffectCards]" class="mySwiper">
            <swiper-slide v-for="(user, index) in topUsers" :key="user.userId">
                <Card v-if="swiperIsReady" @slideChange="slideChange" :user="user" :index="index" :realIndex="realIndex"/>
            </swiper-slide>
        </swiper>
    </div>
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