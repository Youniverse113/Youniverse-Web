<script setup>
import { ref, onMounted, computed, reactive, watch, nextTick, onUpdated, onUnmounted } from 'vue';
import api from '@/axios.js';
import Skeleton from '@/components/Skeleton.vue';

const props = defineProps({
    user: Object,
    isLiked: Boolean,
})
const userInfo = computed(() => {
    let user = props.user;
    user.hashtagsInput = ref('')
    return user
})
const emit = defineEmits(['like', 'returnLike'])

onMounted(() => {
    initProgress()
    if (hastagsDivRef.value.scrollHeight > 100) isHastagsDivOverflow.value = true;
})
onUpdated(() => {
    if (hastagsDivRef.value.scrollHeight > 100) isHastagsDivOverflow.value = true;
    else isHastagsDivOverflow.value = false;
})
onUnmounted(() => {
    clearInterval(interval)
    window.removeEventListener("scroll", handleScroll)
})


const postRef = ref(null);
const imageIsLoadedList = ref([false, false, false, false, false, false, false]);
const imageOnLoad = (index) => {
    imageIsLoadedList.value[index] = true;
}
const isImageAllLoaded = computed(() => {
    return imageIsLoadedList.value.every((isLoaded) => isLoaded)
})

let progress = [];
const progress_state = ref(0);
const progress_0 = ref(null);
const progress_1 = ref(null);
const progress_2 = ref(null);
const progress_3 = ref(null);
function handleScroll() {
    if (postRef.value.getBoundingClientRect().top <= window.innerHeight && !isPostEnterView.value) {
        progressBarAnimation()
        isPostEnterView.value = true;
    }
}
function initProgress() {
    progress = [progress_0.value, progress_1.value, progress_2.value, progress_3.value]
    if (postRef.value.getBoundingClientRect().top <= window.innerHeight && !isPostEnterView.value) {
        progressBarAnimation()
        isPostEnterView.value = true;
    }
    window.addEventListener('scroll', handleScroll)
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
        if (progress_state.value == 3) {
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
        if (progress_state.value === 3 && progress[progress_state.value].style.width.split('%')[0] >= 100) {
            progress[progress_state.value].style.width = '0%';
            progressBarAnimation()
        } else {

            progress[progress_state.value].style.width = '0%';
            width = 0;
            progress_state.value--;
        }
    }
}

//like
const likeRef = ref(null);
const like = async () => {
    if (props.isLiked) {
        emit('returnLike', userInfo.value.userId)
        likeRef.value.children[0].children[0].getAnimations()[0].play();
        likeRef.value.children[0].children[1].getAnimations()[0].play();
        userInfo.value.likes--;
        const res = await api.post('/addLike', {
            userId: userInfo.value.userId,
            count: -1,
        })
    } else {
        emit('like', userInfo.value.userId)
        likeRef.value.children[0].children[0].getAnimations()[0].play();
        likeRef.value.children[0].children[1].getAnimations()[0].play();
        userInfo.value.likes++;
        const res = await api.post('/addLike', {
            userId: userInfo.value.userId,
            count: 1,
        })
    }
}

//hashtags
const hashtagsRefs = ref([]);
const hastagsDivRef = ref(null);
const isHastagsDivOverflow = ref(false);
const isExtendHashtagsDiv = ref(false);
const ExtendHashTagesDiv = () => {
    isExtendHashtagsDiv.value = true;
}
const FoldHashTagesDiv = () => {
    isExtendHashtagsDiv.value = false;
}
const AddHashtags = async () => {
    if (userInfo.value.hashtagsInput === '') return
    const newHashtag = {
        msg: userInfo.value.hashtagsInput,
        count: 1,
        id: Date.now(),
    }
    try {
        userInfo.value.hashtagsInput = ''
        userInfo.value.hashtags.push(newHashtag);
        hastagsDivRef.value.scrollTop = hastagsDivRef.value.scrollHeight - hastagsDivRef.value.clientHeight
        const res = await api.post('/addHashtag', {
            userId: userInfo.value.userId,
            data: newHashtag,
        })
    } catch (err) {
        console.log(err);
    }
}
const likeHashtag = async (id, index) => {
    hashtagsRefs.value[index].children[0].children[2].getAnimations()[0].play();
    userInfo.value.hashtags[index].count++;
    const res = await api.post('/likeHashtag', {
        userId: userInfo.value.userId,
        id,
        count: 1,
    })
}






</script>
<template>
    <div class="w-full" ref="postRef">
        <div v-if="user" class="flex items-center mb-2 font-normal text-base">
            <span class="!text-lg pr-1 pb-[3px]">@</span>{{ user.username }}
        </div>
        <div class="w-full">
            <div class="w-full relative z-10 h-[180px] md:h-[330px] bg-spline-900 rounded-lg">
                <div v-if="user" class="relative h-full">
                    <div v-show="progress_state === 0" class="absolute w-full h-full">
                        <img @load="imageOnLoad(0)" :src="user.source[0]" alt=""
                            class="w-full h-full object-cover rounded-lg">
                    </div>
                    <div v-show="progress_state === 1" class="absolute w-full h-full flex justify-center">
                        <img @load="imageOnLoad(1)" :src="user.source[1]" alt=""
                            class=" relative h-full object-cover z-10">
                        <img @load="imageOnLoad(2)" :src="user.source[1]" alt=""
                            class="w-full h-full object-cover absolute top-0 z-0 opacity-50 rounded-lg">
                    </div>
                    <div v-show="progress_state === 2" class="absolute w-full h-full flex justify-center">
                        <img @load="imageOnLoad(3)" :src="user.source[2]" alt=""
                            class=" relative h-full object-cover z-10">
                        <img @load="imageOnLoad(4)" :src="user.source[2]" alt=""
                            class="w-full h-full object-cover absolute top-0 z-0 opacity-50 rounded-lg">
                    </div>
                    <div v-show="progress_state === 3" class="absolute w-full h-full flex justify-center">
                        <img @load="imageOnLoad(5)" :src="user.source[3]" alt=""
                            class=" relative h-full object-cover z-10">
                        <img @load="imageOnLoad(6)" :src="user.source[3]" alt=""
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
                    </div>
                </div>
                <div class=" absolute top-0 z-20 w-full h-full flex">
                    <div @click="nextIndex(-1)" class="grow h-full cursor-pointer"></div>
                    <div @click="nextIndex(1)" class="grow h-full cursor-pointer"></div>
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
                                class="inline-block items-center gap-1 px-3 py-1 rounded-full bg-spline-button-4 drop-shadow-lg cursor-pointer">
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
                    <div @click="FoldHashTagesDiv" v-show="isHastagsDivOverflow && isExtendHashtagsDiv"
                        class="absolute bottom-0 z-20 w-full h-[30px] py-1 px-2 bg-spline-800-focus flex items-center justify-center gap-2">
                        <div class="h-[1px] grow bg-spline-text2"></div>
                        <span>隱藏</span>
                        <div class="h-[1px] grow bg-spline-text2"></div>
                    </div>
                </div>
                <div class="w-full flex">
                    <label for="hashtagsComment"
                        class="min-w-0 flex shrink items-center w-full p-[3px] bg-black/70 rounded-full">
                        <div @click.prevent="like"
                            class="drop-shadow-lg shrink-0 flex items-center gap-1 px-4 py-1 rounded-full"
                            ref="likeRef">
                            <div class="flex items-center cursor-pointer">
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
    <Skeleton v-show="!isImageAllLoaded"></Skeleton>
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