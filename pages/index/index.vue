<template>
  <view class="cal-content">
    <view class="cal-title">
      <text class="title">{{ title }}</text>
      <text class="contact" @click="contact">联系我们</text>
    </view>
    <view class="cal-tab">
      <view :class="['tab', { active: active === 0 }]" @click="handleClick(0)"
        >计算重量</view
      >
      <view :class="['tab', { active: active === 1 }]" @click="handleClick(1)"
        >计算路沿石</view
      >
    </view>
    <view class="cal-tab-content">
      <uni-weight v-show="active === 0"></uni-weight>
      <uni-curb v-show="active === 1"></uni-curb>
    </view>
  </view>
</template>

<script>
import uniWeight from '@/components/uni-weight/index.vue'
import uniCurb from '@/components/uni-curb/index.vue'

export default {
  data() {
    return {
      title: '内部成本计算器',
      active: 0,
    }
  },
  components: {
    uniWeight,
    uniCurb,
  },
  onLoad() {},
  methods: {
    handleClick(val) {
      this.active = val
    },
    contact() {
      uni.navigateTo({
        url: '../contact/index',
        animationType: 'pop-in',
        animationDuration: 200,
      })
    },
    // handleAmountPickerChange(e) {
    //   this.selectAmount = e.detail.value
    // },
    // handleWeightPickerChange(e) {
    //   this.selectWeight = e.detail.value
    // },
  },
}
</script>

<style scoped less="sass">
.cal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28rpx;
  box-sizing: border-box;
  color: #1a1a44cc;
}
.cal-title {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 10rpx 40rpx;
  justify-content: space-between;
}
.title {
  font-size: 36rpx;
}
.contact {
  border: 1px solid #1a1a44cc;
  padding: 6rpx;
}
.cal-tab {
  width: 100%;
  margin: 30rpx 0;
  color: #1a1a44cc;
  border: 1px solid #1a1a44cc;
  display: flex;
  flex-direction: row;
  border-radius: 8rpx;
  height: 60rpx;
  line-height: 60rpx;
}
.tab {
  width: 50%;
  text-align: center;
}
.active {
  background: #1a1a44cc;
  color: #fff;
}
.cal-tab-content {
  width: 100%;
}
</style>
