<template>
    <div class="home-container">
        <div class="page-home">
            <div class="home-intro">
                <p class="text">
                    探索AI未来，创新从此开始
                </p>
                <p class="eraser">
                    <span class="eraser-text" style="border-radius: 10px; padding: 5px">
                        探索AI未来，创新从此开始
                    </span>
                </p>
            </div>

            <div class="home-intro-footer">
                <p><span>一款基于人工智能语言大模型的网站，致力于带来优质的AI产品......</span></p>

                <el-button
                        style="margin-top: 10vh; padding: 18px;font-size: 1rem;border-radius: 50px;margin-right: 30px"
                        color="#00c6ff"
                        @click="moreContent"
                >
                    了解更多信息
                </el-button>
                <el-button style="margin-top: 10vh; padding: 18px;font-size: 1rem;border-radius: 50px" color="#ff0173"
                           @click="router.push('/login')"
                >
                    立即登录使用
                </el-button>
            </div>
        </div>

        <div class="more-intro">
            <div class="more-content">
                <h1 class="wave-animation">MagicalTools</h1>
                <h2>More Fast, More Cheap, More Stable</h2>
                <p>一款打破区域限制的AI产品，用最低的价格带来最优质的服务</p>
            </div>
            <img src="@/assets/homeImage/animate-image.png"
                 alt="MagicalTools Image"
                 class="animate-img"
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import router from "@/router";

const moreContent = () => {
    const homeContainer = document.querySelector('.home-container');
    const pageHome = document.querySelector('.page-home');
    homeContainer.scrollTo({
        top: pageHome.scrollHeight + 20,
        behavior: 'smooth'
    })
}

</script>

<style scoped>
p {
    user-select: none;
}

.home-container {
    height: var(--calc-height);
    background-color: #111121;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    color: white;
}

.home-intro {
    height: 55vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}

.home-intro p {
    font-size: 6rem;
}

.text {
    background-image: linear-gradient(to right, #15ef05, #05cef1, #4005f1);
    background-clip: text;
    -webkit-background-clip: text; /* 兼容性前缀 */
    -webkit-text-fill-color: transparent; /* 隐藏文字颜色 */
}

.eraser {
    position: absolute;
}

.eraser-text {
    --p: 8%;
    background: linear-gradient(to right, #0000 var(--p), #111121 calc(var(--p) + 80px));
    color: transparent;
    animation: flash 5s forwards infinite;
}

@property --p {
    syntax: '<percentage>';
    initial-value: 0%;
    inherits: false;
}

@keyframes flash {
    to {
        --p: 100%;
    }
}

.home-intro-footer {
    text-align: center;
    margin-bottom: 20vh;
    font-size: 1.5rem;
}

.more-intro {
    width: 100%;
    height: 50vh;
    margin-top: 10vh;
    margin-bottom: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    background-color: #00C6C3;

}

.more-content h1 {
    font-size: 5rem;
    margin-bottom: 20px;
}

.more-content h2 {
    font-size: 3rem;
    margin-bottom: 30px;
    background: linear-gradient(75deg, #580b9f, #14132a, #00c6c3 80%);
    border-radius: 10px;
    padding: 10px;
}

.more-content p {
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 50px;
}

img {
    width: 500px;
    height: 500px;
    border-radius: 10px;
}

/*@keyframes slideInLeft {*/
/*    0% {*/
/*        transform: translateX(-100%);*/
/*        opacity: 0;*/
/*    }*/
/*    100% {*/
/*        transform: translateX(0);*/
/*        opacity: 1;*/
/*    }*/
/*}*/

/*@keyframes slideInRight {*/
/*    0% {*/
/*        transform: translateX(100%);*/
/*        opacity: 0;*/
/*    }*/
/*    100% {*/
/*        transform: translateX(0);*/
/*        opacity: 1;*/
/*    }*/
/*}*/


/*===========================================================*/
.home-container::-webkit-scrollbar {
    width: 10px; /* 调整滚动条宽度 */
}

.home-container::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-color); /* 调整滚动条拖动条颜色 */
    border-radius: 8px; /* 轮子圆角度 */
}

.home-container::-webkit-scrollbar-track {
    border-radius: 8px; /* 轮子圆角度 */
}

/*===========================================================*/
</style>