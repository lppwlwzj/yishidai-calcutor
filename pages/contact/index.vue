<template>
  <view class="contact-wrapper">
    <image src="../../static/logo.jpg" mode="aspectFill"></image>
    <view class="contact-content">
      <view class="contact-item">
        <text class="phone">联系人</text>
        <text>黄先生</text>
      </view>
      <view class="contact-item">
        <text class="phone">联系电话</text>
        <a href="tel:17720779699">17720779699</a>
      </view>

      <view class="contact-item">
        <text class="phone">联系地址</text>
        <text>福建省家里蹲大学</text>
      </view>
    </view>
  </view>
</template>
<style scoped>
image {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 70rpx auto 100rpx;
}
.contact-content {
  width: 90%;
  margin: 70rpx auto;
  border: 1px solid #1a1a44cc;
  height: 400rpx;
}
.contact-item {
  width: 100%;
  padding: 40rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
</style>
