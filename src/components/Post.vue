<script setup>
import { ref, onMounted, computed, reactive, watch, nextTick, onUpdated } from 'vue';
import api from '@/axios.js';

const props = defineProps({
    user: Object,
})
const userInfo = computed(() => {
    let user = props.user;
    user.hashtagsInput = ref('')
    return user
})





onMounted(() => {
    initProgress()
    if (hastagsDivRef.value.scrollHeight > 100) isHastagsDivOverflow.value = true;
})
onUpdated(() => {
    if (hastagsDivRef.value.scrollHeight > 100) isHastagsDivOverflow.value = true;
    else isHastagsDivOverflow.value = false;
})


const postRef = ref(null);
let progress = [];
const progress_state = ref(0);
const progress_0 = ref(null);
const progress_1 = ref(null);
const progress_2 = ref(null);
const progress_3 = ref(null);
const progress_4 = ref(null);
function initProgress() {
    progress = [progress_0.value, progress_1.value, progress_2.value, progress_3.value, progress_4.value]
    if (postRef.value.getBoundingClientRect().top <= window.innerHeight * 0.6 && !isPostEnterView.value) {
        progressBarAnimation()
        isPostEnterView.value = true;
    }
    window.addEventListener('scroll', () => {
        if (postRef.value.getBoundingClientRect().top <= window.innerHeight * 0.6 && !isPostEnterView.value) {
            progressBarAnimation()
            isPostEnterView.value = true;
        }
    })
}
let width = 0;
let interval = null;
const isPostEnterView = ref(false);
function progressBarAnimation() {
    width = 0;
    interval = setInterval(frame, 1);
}
function frame() {
    if (width >= 100) {
        if (progress_state.value == 4) {
            clearInterval(interval);
        } else {
            progress_state.value++;
            width = 0;
        }
    } else {
        width += 0.15;
        progress[progress_state.value].style.width = width + '%';
    }
}
// story
const nextIndex = (n) => {
    if (progress_state.value + n < 0) {
        return width = 0;
    } else if (progress_state.value + n > props.user.source.length - 1) {
        return
    }
    if (n > 0) {
        progress[progress_state.value].style.width = '100%';
        width = 0;
        progress_state.value++;
    } else {
        if (progress_state.value === 4 && progress[progress_state.value].style.width.split('%')[0] >= 100) {
            progress[progress_state.value].style.width = '0%';
            console.log('resetttt');
            progressBarAnimation()
        } else {

            progress[progress_state.value].style.width = '0%';
            width = 0;
            progress_state.value--;
        }
    }
}

// like
const likeRef = ref(null);
const isLiked = ref(false);
const like = async () => {
    likeRef.value.children[0].children[0].getAnimations()[0].play();
    likeRef.value.children[0].children[1].getAnimations()[0].play();
    isLiked.value = true;
    userInfo.value.likes++;
    const res = await api.post('/addLike', {
        userId: userInfo.value.userId,
        count: 1,
    })
}

//hashtags
const hashtagsRefs = ref([]);
const hastagsDivRef = ref(null);
const isHastagsDivOverflow = ref(false);
const isExtendHashtagsDiv = ref(false);
const ExtendHashTagesDiv = () => {
    isExtendHashtagsDiv.value = true;
}
const AddHashtags = async () => {
    if (userInfo.value.hashtagsInput === '') return
    const newHashtag = {
        msg: userInfo.value.hashtagsInput,
        count: 1,
        id: Date.now(),
    }
    try {
        const res = await api.post('/addHashtag', {
            userId: userInfo.value.userId,
            data: newHashtag,
        })
        userInfo.value.hashtagsInput = ''
        userInfo.value.hashtags.push(newHashtag);
        hastagsDivRef.value.scrollTop = hastagsDivRef.value.scrollHeight - hastagsDivRef.value.clientHeight
    } catch (err) {
        console.log(err);
    }
}
const likeHashtag = async (id, index) => {
    hashtagsRefs.value[index].children[0].children[2].getAnimations()[0].play();
    const res = await api.post('/likeHashtag', {
        userId: userInfo.value.userId,
        id,
        count: 1,
    })
    userInfo.value.hashtags = res.data.hashtags;
}




let timer;
function debounce(fn, delay = 500) {
    // debounce function 最終會回傳一個 function
    clearTimeout(timer);
    // 清除之後，再重新計時
    // 當 delay 時間到時，執行 fn
    timer = setTimeout(() => {
        fn();
    }, delay);
    return;
}

</script>
<template>
    <div class="w-full" ref="postRef">
        <div v-if="user" class="flex items-center mb-2 font-normal text-lg">
            <span class="!text-lg pr-1 pb-[3px]">@</span>{{ user.username }}
        </div>
        <div class="w-full">
            <div class="w-full relative z-10 h-[180px] md:h-[330px] bg-spline-900 rounded-lg">
                <div v-if="user" class="relative h-full">
                    <div v-show="progress_state === 0" class="absolute w-full h-full">
                        <img :src="user.source[0]" alt="" class="w-full h-full object-cover rounded-lg">
                    </div>
                    <div v-show="progress_state === 1" class="absolute w-full h-full flex justify-center">
                        <img :src="user.source[1]" alt="" class=" relative h-full object-cover z-10">
                        <img :src="user.source[1]" alt=""
                            class="w-full h-full object-cover absolute top-0 z-0 opacity-50 rounded-lg">
                    </div>
                    <div v-show="progress_state === 2" class="absolute w-full h-full flex justify-center">
                        <img :src="user.source[2]" alt="" class=" relative h-full object-cover z-10">
                        <img :src="user.source[2]" alt=""
                            class="w-full h-full object-cover absolute top-0 z-0 opacity-50 rounded-lg">
                    </div>
                    <div v-show="progress_state === 3" class="absolute w-full h-full">
                        <img :src="user.source[3]" alt="" class="w-full h-full object-cover rounded-lg">
                    </div>
                    <div v-show="progress_state === 4" class="absolute w-full h-full flex justify-center">
                        <img :src="user.source[4]" alt="" class=" relative h-full object-cover z-10">
                        <img :src="user.source[4]" alt=""
                            class="w-full h-full object-cover absolute top-0 z-0 opacity-50 rounded-lg">
                    </div>
                </div>
                <div class="w-full absolute top-[10px] z-20">
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
                </div>
                <div class=" absolute top-0 z-20 w-full h-full flex">
                    <div @click="nextIndex(-1)" class="grow h-full"></div>
                    <div @click="nextIndex(1)" class="grow h-full"></div>
                </div>
            </div>
            <div class="w-full bg-spline-800-focus relative rounded-xl top-[-15px] z-0 p-3 py-2 flex flex-col gap-3">
                <div class="relative before:content-[''] before:block before:h-[15px] before:w-full">
                    <div v-if="!userInfo.hashtags.length" class="w-full flex justify-center py-1"><span>No hashtags
                            yet</span></div>
                    <div v-show="userInfo.hashtags.length" class="flex gap-2 flex-wrap overflow-hidden py-1"
                        :class="{ 'max-h-[100px]': !isExtendHashtagsDiv }" ref="hastagsDivRef">
                        <TransitionGroup name="custom-classes" enter-active-class="animate__animated animate__fadeIn"
                            leave-active-class="animate__animated animate__fadeOut">
                            <div @click="likeHashtag(hashtag.id, index)" v-for="(hashtag, index) in userInfo.hashtags"
                                ref="hashtagsRefs" :key="hashtag.id"
                                class="inline-block items-center gap-1 px-3 py-1 rounded-full bg-spline-button-4 drop-shadow-lg">
                                <div class="flex">
                                    <span>#</span>
                                    <span>{{ hashtag.msg }}</span>
                                    <span class="ml-1 animate__animated animate__fadeInUp">{{ hashtag.count }}</span>
                                </div>
                            </div>
                        </TransitionGroup>
                    </div>
                    <div @click="ExtendHashTagesDiv" v-show="isHastagsDivOverflow && !isExtendHashtagsDiv"
                        class="absolute bottom-0 z-20 w-full h-[30px] py-1 px-2 bg-spline-800-focus flex items-center justify-center gap-2">
                        <div class="h-[1px] grow bg-spline-text2"></div>
                        <span>顯示更多</span>
                        <div class="h-[1px] grow bg-spline-text2"></div>
                    </div>
                </div>
                <div class="w-full flex">
                    <label for="hashtagsComment"
                        class="min-w-0 flex shrink items-center w-full p-[3px] bg-black/70 rounded-full">
                        <div @click.prevent="like"
                            class="drop-shadow-lg shrink-0 flex items-center gap-1 px-4 py-1 rounded-full"
                            ref="likeRef">
                            <div class="flex items-center">
                                <font-awesome-icon :icon="[isLiked ? 'fa-solid' : 'fa-regular', 'fa-heart']"
                                    class="mr-1 w-[18px] h-[18px] animate__animated animate__jello"
                                    :class="[isLiked ? 'text-red-900' : '']" />
                                <span class="animate__animated animate__fadeInUp pb-[2.5px] !text-base">{{
            userInfo.likes }}</span>
                            </div>
                        </div>
                        <span class="px-2 py-1 shrink-0">#</span>
                        <input @keyup.enter="AddHashtags" v-model="userInfo.hashtagsInput" id="hashtagsComment"
                            type="text"
                            class="min-w-0 bg-transparent text-sm font-normal text-spline-text shrink grow focus:outline-none"
                            placeholder="新增hashtags">
                        <button @click="AddHashtags" v-show="userInfo.hashtagsInput"
                            class=" bg-transparent pt-1 pb-1 px-3 shrink-0">新增</button>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.progress {
    @apply grow h-[2px] bg-white/20
}

.progress-bar {
    @apply w-0 h-[2px] bg-white
}

span {
    @apply font-medium text-xs
}


.animate__jello {
    --animate-duration: 0.7s;
}

.animate__fadeInUp {
    --animate-duration: 0.5s;
}
</style>