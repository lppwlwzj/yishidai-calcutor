<template>
	<view class="login">
		<button @click="login" class="login-btn">一键登录</button>
		<view class="modal-dialog">
			<view class="modal-mask" catchtouchmove="preventTouchMove" v-if="showModal">
				<view class="modal-content">
					<view class="info">绑定手机号</view>
					<view class="info">请先绑定手机号在进行此操作</view>
					<button open-type="getPhoneNumber" class="phone-btn" @getphonenumber="onGetPhoneNumber">微信用户一键绑定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showModal: false
		};
	},
	onShareAppMessage: function (res) {
	    return {
	      title: '石材成本计算器',
	      path: 'pages/index/index',
	      success: function (res) {
	      },
	      fail: function (res) {
	      },
	    }
	  },
	methods: {
		login() {
			// #ifdef MP-WEIXIN
			wx.getUserProfile({
				desc: '获取你的昵称、头像、地区及性别',
				success: res => {
					uni.setStorageSync('userInfo', res.userInfo);
					this.showModal = true;
				},
				fail: res => {
					//拒绝授权
					uni.showToast({
						title: '您拒绝了请求,不能正常使用小程序',
						icon: 'error',
						duration: 2000
					});
					return;
				}
			});
			// #endif
		},
		onGetPhoneNumber(data) {
			  uni.showLoading({
			   title: '加载中'
			});
			//#ifdef MP-WEIXIN
			wx.cloud.callFunction({
			  // 云函数名称
			  name: 'getPhone',
			  // 传给云函数的参数
			  data: {
			    code: data.detail.code,
			    nickname: uni.getStorageSync('userInfo').nickName
			  },
			  success: function(res) {
				  
                 uni.hideLoading();
					if (res.errMsg.indexOf('ok') > -1) {
						uni.redirectTo({
							url: '../index/index'
						});
					} else {
						uni.showToast({
							title: `授权失败，请重新授权`,
							icon: 'error',
							duration: 2000
						});
					}
			  },
			  fail: console.error
			})
			// #endif
		}
	}
};
</script>

<style>
.login {
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background: #d6d6eac7;
}
.login-btn {
	width: 200px;
	height: 50px;
	line-height: 50px;
	background-color: #22ac38;
	color: #fff;
}
.modal-mask {
	width: 100%;
	height: 100vh;
	position: absolute;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.35);
	display: flex;
	align-items: center;
	justify-content: center;
}
.modal-content {
	width: 80%;
	height: 300px;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.info {
	margin: 10px 0;
}
.phone-btn {
	margin: 10px 0;
	width: 200px;
	height: 50px;
	line-height: 50px;
	background-color: #22ac38;
	color: #fff;
}
</style>
