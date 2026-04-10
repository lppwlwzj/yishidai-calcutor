<script>
import Vue from "vue";
export default {
  onLaunch: function () {
    // //云开发初始化
    // //#ifdef MP-WEIXIN
    // wx.cloud.init({
    // env: 'calc-8guz5613ee562b39' ,//你的云空间id
    // traceUser: true
    // })
    // //#endif
    // uni.getSystemInfo({
    // 	success: function(e) {
    // 		// // #ifndef MP
    // 		// Vue.prototype.StatusBar = e.statusBarHeight
    // 		// if (e.platform == 'android') {
    // 		//   Vue.prototype.CustomBar = e.statusBarHeight + 50
    // 		// } else {
    // 		//   Vue.prototype.CustomBar = e.statusBarHeight + 45
    // 		// }
    // 		// // #endif
    // 		// #ifdef MP-WEIXIN
    // 		Vue.prototype.StatusBar = e.statusBarHeight;
    // 		let custom = wx.getMenuButtonBoundingClientRect();
    // 		Vue.prototype.Custom = custom;
    // 		Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
    // 		// #endif
    // 		// // #ifdef MP-ALIPAY
    // 		// Vue.prototype.StatusBar = e.statusBarHeight
    // 		// Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight
    // 		// // #endif
    // 	}
    // });
  },
  onShow: function () {
    // uni.login({
    // 	provider: 'weixin',
    // 	success: function(loginRes) {
    // 		if(loginRes.errMsg.indexOf('ok') > -1)
    // 		uni.setStorageSync('code', loginRes.code);
    // 	},
    // 	fail: function(error) {
    // 		uni.showToast({
    // 			title: '登录失败,不能正常使用小程序',
    // 			icon: 'error',
    // 			duration: 2000
    // 		});
    // 	}
    // });
  },
  onHide: function () {
    console.log("App Hide");
  }
};
</script>

<style>
@import "colorui/main.css";
@import "colorui/icon.css";
</style>
