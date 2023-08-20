<template>
    <div class="nav-container">
        <el-menu class="nav-content"
                 mode="horizontal"
                 :router="true"
                 :default-active="activeIndex"
                 background-color="black"
        >
            <el-menu-item style="margin-left: 2vw;" @click="router.push('/')">
                <img src="@/assets/logo-icon.png" style="width: 50px; height: 50px; border-radius: 8px;">
                <h2 style="color: white">agicalTools</h2>
            </el-menu-item>

            <div style="flex-grow: 0.2"/>

            <el-menu-item v-for="item in navData"
                          :key="item.path"
                          :index="item.index"
                          class="nav-title"
            >
                <span style="font-size: 1rem; color: white">{{ item.label }}</span>
            </el-menu-item>

            <div style="flex-grow: 0.7"/>

            <div class="navbar-right">
                <div class="login-button">
                    <router-link to="/login" v-show="!hasUser">
                        <el-button color="#565cff">登录 | 注册</el-button>
                    </router-link>

                    <el-dropdown style="cursor: pointer;" v-show="hasUser">
                        <span style="color: white; font-size: 1rem;border: none;outline: none;display: flex;align-items: center">
                            <span class="person-content">我的</span>
                            <el-icon style="margin-left: 10px"><arrow-down /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <el-button color="#ec8e06" @click="router.push('/person')">个人中心</el-button>
                                </el-dropdown-item>
                                <el-dropdown-item style="display: flex;justify-content: center">
                                    <el-button color="#565cff" @click="exitLogin">退出登录</el-button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import request from "@/utils/request.ts";
import {ElNotification} from "element-plus";

const hasUser = ref(false);
const route = useRoute();
const router = useRouter();
const activeIndex = ref(route.path);
const navData = ref([
    {
        path: '/home',
        label: '网站首页',
        index: '/home'
    },
    {
        path: '/tools',
        label: 'AI 工具',
        index: '/tools'
    },
    {
        path: '/inform',
        label: '公告信息',
        index: '/inform'
    },
    {
        path: '/pay',
        label: '支付通道',
        index: '/pay'
    }
]);

onMounted(() => {
    if (localStorage.getItem('token')) {
        hasUser.value = true;
    }
})

/**
 * 退出登录
 */
const exitLogin = async () => {
    try {
        await request.post('/user/logout?token=' + localStorage.getItem('token')).then(({data}) => {
            localStorage.clear();
            sessionStorage.clear();
            ElNotification({
                message: data,
                type: 'success',
                duration: 2000
            });
            setTimeout(() => {
                window.location.href = '/';
            }, 500);
        })
    } catch (error) {
        console.log(error);
    }
}

</script>

<style scoped lang="scss">
.el-menu {
  border: none;
  height: 100%;
}

.nav-container {
  height: var(--navbar-height);
  user-select: none;
  color: white;
}

.navbar-right {
  display: flex;
  align-items: center;
}

@media (max-width: 760px) {
    .person-content {
        margin: 10px 0 15px 15px;
    }
}
</style>
