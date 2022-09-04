<template>
  <view class="result-wrapper">
    <view class="result-title"> 计算结果</view>
    <view class="result-content">
      <view v-for="(item, index) in resultList" class="info-item" :key="index">
        <text class="label">{{ item.label }}</text>
        <text class="value">{{ item.value }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    resultList: {
      default: () => [],
    },
  },
  onLoad() {},
  methods: {},
}
</script>

<style scoped>
.result-wrapper {
  width: 100%;
  color: #1a1a44cc;
  margin-top: 60rpx ;
}
.result-title {
  margin-bottom: 20rpx;
  font-size: 18px;
}
.result-content {
  width: 100%;
  margin: 0 auto;
  padding: 20rpx 30rpx;
  font-size: 16px;
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
