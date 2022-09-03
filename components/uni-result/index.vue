<template>
  <view class="result-wrapper">
    <view class="result-title"> 计算结果</view>
    <view class="result-content">
      <view class="info-item" :key="index">
        <text class="label">运费陈版本</text>
        <text class="value">00000</text>
      </view>
      <view class="info-item" :key="index">
        <text class="label">运费陈版本</text>
        <text class="value">00000</text>
      </view>
      <view class="info-item" :key="index">
        <text class="label">运费陈版本</text>
        <text class="value">00000</text>
      </view>
      <!-- <view v-for="(item, index) in infoList" :key="index">
        <text class="label"></text>
        <text class="value"></text>
      </view> -->
    </view>
  </view>
</template>

<script>
export default {
  props: {
    infoList: {
      default: () => [],
    },
  },
  onLoad() {},
  methods: {
    handleClick(val) {
      this.active = val
    },
    handleAmountPickerChange(e) {
      this.selectAmount = e.detail.value
    },
    handleWeightPickerChange(e) {
      this.selectWeight = e.detail.value
    },
  },
}
</script>

<style scoped>
.result-wrapper {
  width: 100%;
  font-size: 36rpx;
  color: #1a1a44cc;
}
.result-title {
  margin-bottom: 30rpx;
  font-size: 38rpx;
}
.result-content {
  width: 100%;
  margin: 0 auto;
  /* min-height: 280rpx; */
  padding: 30rpx;
  box-sizing: border-box;
  border: 1px solid #1a1a44cc;
  /* box-shadow: 1px 1px 1px #1a1a44cc; */
}
.info-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20rpx 0;
}
</style>
