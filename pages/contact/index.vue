<template>
  <view class="contact-wrapper">
    <cu-custom :isBack="true">
      <block slot="backText"> </block>
      <block slot="content" class="tarbar">联系我们</block>
    </cu-custom>
    <image src="../../static/logo.jpg" mode="widthFix"></image>
    <view class="contact-content">
      <view class="contact-item">
        <text class="phone">联系人</text>
        <text>黄先生</text>
      </view>
      <view class="contact-item">
        <text class="phone">联系电话</text>
        <a href="tel:15280421666">15280421666</a>
      </view>

      <view class="contact-item">
        <text class="phone">联系地址</text>
        <text>湖北麻城中部石材产业园</text>
      </view>
    </view>
    <button open-type="contact">联系客服</button>
  </view>
</template>
<script>
export default {
  onShareAppMessage: function (res) {
    return {
      title: '成本计算器',
      path: 'pages/index/index',
      success: function (res) {
        // console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // console.log("转发失败:" + JSON.stringify(res));
      },
    }
  },
}
</script>
<style scoped>
image {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 60rpx auto;
}
.contact-content {
  width: 90%;
  margin: 60rpx auto;
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
button {
  width: 90%;
  margin: 0 auto;
  background-color: #4d4d77cc;
  color: #fff;
}
</style>
