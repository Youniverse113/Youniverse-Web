<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

onMounted(() => {
    window.scrollTo({ top: 0 })
})
</script>
<template>
    <Navbar></Navbar>
    <div class="w-[85%] lg:w-[60%] max-w-[800px] m-auto py-[80px] flex flex-col gap-10 min-h-[85vh] lg:flex-row lg:items-center">
        <div class="lg:w-1/2">
            <div class="flex justify-center">
                <strong class="scroll_reveal whitespace-break-spaces text-center w-full pb-2 mb-6">展場資訊</strong>
            </div>
            <div class="lg:h-[220px]">
                <p>
                    🫧校內審查<br>
                    時間｜𝟐𝟎𝟐𝟒.𝟎𝟒.𝟏𝟓(𝐌𝐨𝐧.) — 𝟐𝟎𝟐𝟒.𝟎𝟒.𝟏𝟗(𝐅𝐫𝐢.)<br>
                    地點｜元智大學 五館三樓<br>
                    <br>
                    <!-- ※星期二審查中不對外開放※<br><br> -->
                    🫧校外展<br>
                    時間｜𝟐𝟎𝟐𝟒.𝟎𝟓.𝟏𝟎(𝐅𝐫𝐢.) — 𝟐𝟎𝟐𝟒.𝟎𝟓.𝟏𝟑(𝐌𝐨𝐧.)<br>
                    地點｜松山文創園區三號倉庫
                </p>
            </div>
        </div>
        <div class="lg:w-1/2">
            <div class="flex justify-center">
                <strong class="scroll_reveal whitespace-break-spaces text-center w-full pb-2 mb-6">關於我們</strong>
            </div>
            <div class="flex flex-wrap gap-6 lg:h-[220px]">
                <div class="w-full">
                    <img class="rounded-lg" src="@/assets/us.jpg" alt="">
                </div>
                <div class="w-full flex justify-center items-center">
                    <p class="">
                        我們是宇你工作室，
                        一群想帶給大家歡樂體驗的人們，
                        希望能用我們的肝與淚換到你們的笑容！
                    </p>
                </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>
<style scoped></style>