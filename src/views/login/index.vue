<template>
    <div class="login-container">
        <el-card class="login-card">
            <div class="login-logo">
                <img src="@/assets/login-logo.png" alt="Logo">
            </div>
            <el-form
                    ref="ruleFormRef"
                    :model="loginForm"
                    :rules="rules"
                    label-position="top"
                    status-icon
                    class="login-form"
            >
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginForm.email" placeholder="请输入邮箱"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password/>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <div style="display: flex;">
                        <el-input v-model="loginForm.code" type="text" placeholder="请输入验证码"
                                  style="margin-right: 20px"/>
                        <el-button color="#ADA9BB" @click="getAuthCode(loginForm)" :disabled="notDisabled">获取验证码
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button color="#565cff" @click="submitLoginForm(loginForm)" class="login-btn" :loading="loading">
                        {{ loading ? '登录中...' : '登录 / 注册' }}
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button color="#484554" @click="forgotPassword(loginForm)" class="password-btn">
                        找回密码
                    </el-button>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import {onMounted, reactive, ref} from 'vue'
import type {FormRules} from 'element-plus'
import request from "@/utils/request.ts";
import {ElNotification} from "element-plus";
import {ResponseData} from "@/utils/type.ts";

const loading = ref(false);
const notDisabled = ref(false);
const loginForm = reactive({
    email: '',
    password: '',
    code: ''
});

const showMessage = async () => {
    await ElNotification({
        message: '首次登录可直接注册账号，请妥善保管您的账号和密码！',
        type: 'info',
        duration: 4000,
    });
    await ElNotification({
        message: '转借账号有封禁账号风险, 请勿借给他人使用！',
        type: 'warning',
        duration: 5000
    });
};

onMounted(() => {
    showMessage();
});


/**
 * 校验规则
 */
const rules = reactive<FormRules>({
    email: [
        {required: true, message: '请输入邮箱', trigger: 'blur'},
        {
            // 校验邮箱号码
            pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            message: '请输入有效的邮箱地址',
            trigger: 'blur'
        }
    ],
    password: [
        {required: true, message: '请输入密码(6-15字符)', trigger: 'blur'},
        {min: 6, max: 15, message: '密码长度为6-15个字符', trigger: 'blur'},
    ]
})

/**
 * 获取验证码
 */
const getAuthCode = async (loginForm) => {
    notDisabled.value = true; // 禁用按钮
    try {
        const res: ResponseData = await request.post('/user/code', loginForm);
        if (!res.success) {
            return ElNotification({
                message: res.error,
                type: 'error',
                duration: 3000
            });
        }

        ElNotification({
            message: "验证码已发送至邮箱，请注意及时查收(60秒内有效)",
            type: 'success',
            duration: 60 * 1000 // 一分钟
        });

        setTimeout(() => {
            notDisabled.value = false;
        }, 60 * 1000); // 60秒后重新设置为false，可再次点击
    } catch (error) {
        console.log(error);
        ElNotification({
            message: '网络错误, 请稍后重试！',
            type: 'error',
            duration: 3000
        });
    }
}

/**
 * 提交登录注册表
 * @param loginForm
 */
const submitLoginForm = async (loginForm) => {
    try {
        loading.value = true; // 开启 loading 效果
        const res: ResponseData = await request.post('/user/login', loginForm);
        if (!res.success) {
            return ElNotification({
                message: res.error,
                type: 'error',
                duration: 3000
            });
        }
        if (res.data) {
            // 保存用户信息到session
            localStorage.setItem("token", res.data);
        }
        ElNotification({
            message: '登录成功！',
            type: 'success',
            duration: 3000
        });
        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    } catch (error) {
        ElNotification({
            message: '登录失败, 请稍后重试！',
            type: 'error',
            duration: 3000
        });
    } finally {
        loading.value = false; // 结束 loading 效果
    }
};

/**
 * 忘记密码，找回密码
 */
const forgotPassword = async (loginForm) => {
    const res: ResponseData = await request.post('/user/password', loginForm);
    if (!res.success) {
        return ElNotification({
            message: res.error,
            type: 'error',
            duration: 3000
        });
    }

    ElNotification({
        message: "新密码及验证码已发送至邮箱，请注意及时查收",
        type: 'success',
        duration: 3000
    });
}

</script>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #343541;
}

.login-card {
  width: 330px;
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 2px 5px #888888;
}

.login-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.login-logo img {
  width: 250px;
  height: auto;
}

.login-form {
  width: 100%;

  .login-btn {
    width: 100%;
    margin-top: 15px;
  }

  .password-btn {
    width: 100%;
  }
}

@media (max-width: 780px) {
  .login-card {
    width: 300px;
    height: 450px;
    padding: 5px;
    border-radius: 10px;
    box-shadow: 0 2px 5px #888888;
  }
}
</style>