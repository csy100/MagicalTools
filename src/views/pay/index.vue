<template>
  <div class="pay-container">
    <div class="pay-intro">
      <h1>选择最适合您的计划</h1>
      <span>
                <el-switch
                    v-model="switchValue"
                    class="switch-combo"
                    active-text="按月支付"
                    inactive-text="按年支付"
                    size="large"
                    inline-prompt
                />
            </span>
    </div>

    <div class="pay-content">
      <div class="cycle-pay" style="width: 80%" v-if="switchValue">
        <el-space wrap :size="100" style="display: flex;justify-content: center;align-items: flex-start">
          <el-card v-for="item in monthPayData"
                   :key="item.price"
                   class="common-card"
                   style="width: 300px;background-color:#f0f3f8"
          >
            <template #header>
              <div class="card-header"
                   style="display: flex;align-items: center;justify-content: space-between">
                <span style="font-size: 2rem">{{ item.cardName }}</span>
              </div>
            </template>

            <hr>
            <div class="card-price">
              <span style="font-size: 4.5rem">￥{{ item.price }}</span>
              <span style="font-size: 1.5rem">{{ item.paymentStyle }}</span>
            </div>
            <hr style="margin-bottom: 30px">

            <div v-for="intro in item.intro" :key="intro"
                 style="display: flex;align-items: flex-start;margin-bottom: 5px">
                            <span
                                style="display: flex;align-items: center;margin-right: 15px;border-radius: 50%; background-color: #19c37d;padding: 2px;margin-top: 3px">
                                <el-icon color="#ffffff"><Select/></el-icon>
                            </span>
              <span style="width:80%;font-size: 1.2rem;word-wrap: break-word">{{ intro }}</span>
            </div>

            <el-button color="#0665d0" style="margin-top: 20px;" v-show="item.currentOrder === 0"
                       @click="payBill(item.price)">立即订阅
            </el-button>
            <span class="current-order" v-show="item.currentOrder === 1">
                            <el-icon style="display: flex;align-items: center;margin-right: 10px" size="20px"><CircleCheckFilled/></el-icon>
                            当前套餐
                        </span>
          </el-card>
        </el-space>
      </div>

      <div class="custom-pay" style="width: 80%" v-else>
        <el-space wrap :size="100" style="display: flex;justify-content: center;align-items: flex-start">
          <el-card v-for="item in yearPayData"
                   :key="item.price"
                   class="common-card"
                   style="width: 300px;background-color:#f0f3f8"
          >
            <template #header>
              <div class="card-header"
                   style="display: flex;align-items: center;justify-content: space-between">
                <span style="font-size: 2rem">{{ item.cardName }}</span>
              </div>
            </template>

            <hr>
            <div class="card-price">
              <span style="font-size: 4.5rem">￥{{ item.price }}</span>
              <span style="font-size: 1.5rem">{{ item.paymentStyle }}</span>
            </div>
            <hr style="margin-bottom: 30px">

            <div v-for="intro in item.intro" :key="intro"
                 style="display: flex;align-items: flex-start;margin-bottom: 5px">
                            <span
                                style="display: flex;align-items: center;margin-right: 15px;border-radius: 50%; background-color: #19c37d;padding: 2px;margin-top: 3px">
                                <el-icon color="#ffffff"><Select/></el-icon>
                            </span>
              <span style="width:80%;font-size: 1.2rem;word-wrap: break-word">{{ intro }}</span>
            </div>

            <el-button color="#930303" style="margin-top: 20px" v-show="item.currentOrder === 0"
                       @click="payBill(item.price)">立即订阅
            </el-button>
            <span class="current-order" v-show="item.currentOrder === 1">
                            <el-icon style="display: flex;align-items: center;margin-right: 10px;" size="20px"><CircleCheckFilled/></el-icon>
                            当前套餐
                        </span>
          </el-card>
        </el-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import {markRaw, ref} from 'vue'
import {ElMessageBox} from "element-plus";
import {Pointer} from "@element-plus/icons-vue";
import request from "@/utils/request";

const switchValue = ref(true);
const monthPayData = ref([
  {
    cardName: '体验版',
    price: 0,
    paymentStyle: '',
    currentOrder: 1, // 1 是当前套餐 0 不是当前套餐
    intro: [
      'ChatGPT-3.5',
      '仅初级线路可用',
      '每日赠送1000免费金币',
      '全球各地网络运营商网络环境不一，具体以您试用体验为准'
    ]
  },
  {
    cardName: '基础版',
    price: 0.01,
    paymentStyle: '/月付',
    currentOrder: 0, // 1 是当前套餐 0 不是当前套餐
    intro: [
      'ChatGPT-4.0',
      '初级线路可用',
      'API速率限制提高到每分钟400次'
    ]
  },
  {
    cardName: '标准版',
    price: 29.9,
    paymentStyle: '/月付',
    currentOrder: 0, // 1 是当前套餐 0 不是当前套餐
    intro: [
      'ChatGPT-4.0',
      '中级线路可用',
      'GPT-4系列模型费用8折优惠',
      '线路通道优化体验',
      'API速率限制提高到每分钟800次'
    ]
  },
  {
    cardName: '高级版',
    price: 49.9,
    paymentStyle: '/月付',
    currentOrder: 0, // 1 是当前套餐 0 不是当前套餐
    intro: [
      'ChatGPT-4.0',
      '高级线路可用',
      'GPT-4系列模型费用8折优惠',
      '最优线路通道优化，保证高并发情况下的流量服务',
      'API速率限制提高到每分钟1000次'
    ]
  }
]);
const yearPayData = ref([
  {
    cardName: '基础版',
    price: 198.8,
    paymentStyle: '/年付',
    currentOrder: 0, // 1 是当前套餐 0 不是当前套餐
    intro: [
      'ChatGPT-4.0',
      '初级线路可用',
      'API速率限制提高到每分钟400次'
    ]
  },
  {
    cardName: '标准版',
    price: 299.9,
    paymentStyle: '/年付',
    currentOrder: 0, // 1 是当前套餐 0 不是当前套餐
    intro: [
      'ChatGPT-4.0',
      '中级线路可用',
      'GPT-4系列模型费用8折优惠',
      '线路通道优化体验',
      'API速率限制提高到每分钟800次'
    ]
  },
  {
    cardName: '高级版',
    price: 449.9,
    paymentStyle: '/年付',
    currentOrder: 0, // 1 是当前套餐 0 不是当前套餐
    intro: [
      'ChatGPT-4.0',
      '高级线路可用',
      'GPT-4系列模型费用8折优惠',
      '最优线路通道优化，保证高并发情况下的流量服务',
      'API速率限制提高到每分钟1000次'
    ]
  },
]);
/**
 * 支付
 */
const payBill = (price: number) => {
  request.get(`/order/getQRCode?price=${price}`).then(({data}) => {
    let QRCode = 'https://xorpay.com/qr?data=' + data;
    ElMessageBox.confirm(
        `<img src="${QRCode}" alt=""/>`,
        '支付',
        {
          type: 'warning',
          icon: markRaw(Pointer),
          dangerouslyUseHTMLString: true,
        }
    )
  });

};

</script>

<style scoped lang="scss">
.pay-container {
  height: var(--calc-height);
  background-color: var(--main-theme);
  color: white;
  overflow-y: auto;
  user-select: none;
}

.pay-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  h1 {
    font-size: 28px;
  }

  span {
    margin-top: 40px;
  }

  .switch-combo {
    --el-switch-on-color: #0665d0;
    --el-switch-off-color: #930303;
  }
}

.pay-content {
  margin-top: 50px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 760px) {
  .pay-content {
    margin-left: 100px;
  }
}

.common-card:hover {
  transform: translateY(-15px);
}

.current-order {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #33027c;
  color: white;
  border-radius: 5px;
}

/*===========================================================*/
.pay-container::-webkit-scrollbar {
  width: 10px; /* 调整滚动条宽度 */
}

.pay-container::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color); /* 调整滚动条拖动条颜色 */
  border-radius: 4px; /* 轮子圆角度 */
}

.pay-container::-webkit-scrollbar-track {
  border-radius: 8px; /* 轮子圆角度 */
}

/*===========================================================*/
</style>
