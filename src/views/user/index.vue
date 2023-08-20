<template>
    <div class="user-container">
        <el-card class="user-content">

            <div class="left-content">
                <el-image class="image-avatar"
                          :src="url"
                          :preview-src-list="srcList"
                          :zoom-rate="1.2"
                          fit="cover"
                />
            </div>

            <div class="right-content">
                <div class="user-info">
                    <h2>邮箱:</h2>
                    <h3 style="margin:10px 30px;border-bottom: 2px solid #ffffff; width: 20%;padding-bottom: 10px">{{ userEmail }}</h3>
                    <h2>昵称:</h2>
                    <h3 style="margin:10px 30px;border-bottom: 2px solid #ffffff; width: 20%;padding-bottom: 10px">{{ userNickName }}</h3>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, Ref} from "vue";
import request from "@/utils/request.ts";
import {UserDto} from "@/utils/type.ts";

const url = '@/assets/avatar-logo.png';
const srcList = ['@/assets/avatar-logo.png'];

const userInfo: Ref<UserDto> = ref({
    id: 0,
    email: '',
    nickName: '',
    icon: ''
});
const userEmail = ref();
const userNickName = ref();


onMounted(() => {
    request.get('/user/info').then(({data}) => {
        userInfo.value = data;
        userEmail.value = userInfo.value.email;
        userNickName.value = userInfo.value.nickName;
    })
})

</script>

<style scoped lang="scss">
.user-container {
  height: 100vh;
  background-color: var(--main-theme);
  display: flex;
  justify-content: center;
  align-items: center;

  .user-content {
    width: 70vw;
    height: 80vh;
    background-color: #444654;
    border: none;
    overflow-y: auto;
  }
}

.left-content {
  .image-avatar {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-left: 90px;
  }
}

.right-content {
  margin: 30px 90px;
  overflow-y: auto;
  color: white;
}

/*===============================================================*/
.user-content {
  /* 默认情况下隐藏滚动条 */
  overflow: hidden;
}

.user-content:hover {
  /* 鼠标进入时显示滚动条 */
  overflow: auto;
}

.user-content::-webkit-scrollbar {
  width: 6px; /* 调整滚动条宽度 */
}

.user-content::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color); /* 调整滚动条拖动条颜色 */
  border-radius: 8px; /* 轮子圆角度 */
}

.user-content::-webkit-scrollbar-track {
  border-radius: 8px; /* 轮子圆角度 */
}

/*===============================================================*/

@media (max-width: 760px) {
  .right-content {
    margin: 30px 0;
  }
}
</style>