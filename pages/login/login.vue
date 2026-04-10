<template>
  <view class="login">
    <!-- <button @click="login" class="login-btn">一键登录</button> -->

    <button
      class="login-btn"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
    >
      授权手机号
    </button>

    <view class="protocol-tip">
      <u-checkbox-group placement="column" v-model="protocolChecked">
        <u-checkbox
          shape="circle"
          activeColor="#dd524d"
          style="margin-right: 12rpx"
        />
      </u-checkbox-group>
      已阅读并同意
      <text class="link" @tap="goToUserAgreement">《用户服务协议》</text>
      和
      <text class="link" @tap="goToPrivacyPolicy">《隐私权政策》</text>
    </view>
    <!-- <view class="modal-dialog">
			<view class="modal-mask" catchtouchmove="preventTouchMove" v-if="showModal">
				<view class="modal-content">
					<view class="info">绑定手机号</view>
					<view class="info">请先绑定手机号在进行此操作</view>
					<button open-type="getPhoneNumber" class="phone-btn" @getphonenumber="onGetPhoneNumber">微信用户一键绑定</button>
				</view>
			</view>
		</view> -->
  </view>
</template>

<script>
export default {
  onLoad() {
    this.getWxUserCode();
  },
  data() {
    return {
      protocolChecked: false,
      showModal: false,
      login_code: "",
      appid: "",
      session_key: "",
      openid: "",
      phone_code: "",
      phone_encryptedData: "",
      phone_iv: "",
      phone_number: "",
      phone_number_encryptedData: ""
    };
  },
  onShareAppMessage: function (res) {
    return {
      title: "石材成本计算器",
      path: "pages/index/index",
      success: function (res) {},
      fail: function (res) {}
    };
  },

  methods: {
    // async login() {
    //   if (!this.protocolChecked) {
    //     uni.showToast({
    //       title: "请先阅读并同意协议",
    //       icon: "none"
    //     });
    //     return;
    //   }
    //   this.showModal = true;
    // },
    getWxUserCode() {
      uni.login({
        provider: "weixin",
        success: (res) => {
          uni.showToast({
            title: "授权登录成功",
            icon: "none"
          });
          this.login_code = res.code; // 获得的code
          console.log("login_code", this.login_code);
        },
        fail: (res) => {
          uni.showToast({
            title: res.errMsg,
            icon: "none"
          });
        }
      });
    },
    async jiemi(params) {
      const res = await this.$api.jiemi(params);
      //   uni.showToast({
      //     title: "解密结果..."
      //   });
      if (+res.code === 0) {
        this.phone_number = res.re.phoneNumber; // 手机号
        uni.hideLoading();
        this.showModal = false;
      } else {
        uni.hideLoading({
          title: "授权失败，请重新操作"
        });
      }
    },
    async get_miyao() {
      // 获取密钥 ===
      const res = await this.$api.getmiyao({
        login_code: this.login_code
      });
      uni.showToast({
        title: "获取密钥..." + JSON.stringify(res)
      });
      if (res.code === 0) {
        uni.showToast({
          title: "返回密钥..." + JSON.stringify(res.re)
        });
        return res.re;
      }
    },
    getPhoneNumber(res) {
      const that = this;
      if (!this.protocolChecked) {
        uni.showToast({
          title: "请先阅读并同意协议",
          icon: "none"
        });
        return;
      }
      //   if (!that.login_code) {
      //     uni.showToast({
      //       title: "login_code 丢失了吗..."
      //     });
      //     that.getWxUserCode();
      //     uni.hideLoading();
      //     return false;
      console.log("res--->", res);
      //   }
      that
        .get_miyao()
        .then((data) => {
          console.log("data--->", data);
          //   uni.showToast({
          //     title: "准备解密了..."
          //   });
          const params = {
            openid: data.openid,
            appid: that.appid,
            session_key: data.session_key,
            phone_code: res.detail.code,
            phone_encryptedData: res.detail.encryptedData,
            phone_iv: res.detail.iv
          };
          that.jiemi(params);
        })
        .catch((err) => {
          uni.hideLoading();
        });
    },
    goToUserAgreement() {
      //   uni.navigateTo({
      //     url: "/pages/agreement/user-agreement"
      //   });
    },
    goToPrivacyPolicy() {
      //   uni.navigateTo({
      //     url: "/pages/agreement/privacy-policy"
      //   });
    }
    // login() {
    // 	// #ifdef MP-WEIXIN
    // 	wx.getUserProfile({
    // 		desc: '获取你的昵称、头像、地区及性别',
    // 		success: res => {
    // 			uni.setStorageSync('userInfo', res.userInfo);
    // 			this.showModal = true;
    // 		},
    // 		fail: res => {
    // 			//拒绝授权
    // 			uni.showToast({
    // 				title: '您拒绝了请求,不能正常使用小程序',
    // 				icon: 'error',
    // 				duration: 2000
    // 			});
    // 			return;
    // 		}
    // 	});
    // 	// #endif
    // },
    // onGetPhoneNumber(data) {
    //   uni.showLoading({
    //     title: "加载中"
    //   });
    //   //#ifdef MP-WEIXIN
    //   wx.cloud.callFunction({
    //     // 云函数名称
    //     name: "getPhone",
    //     // 传给云函数的参数
    //     data: {
    //       code: data.detail.code,
    //       nickname: uni.getStorageSync("userInfo").nickName
    //     },
    //     success: function (res) {
    //       uni.hideLoading();
    //       if (res.errMsg.indexOf("ok") > -1) {
    //         uni.redirectTo({
    //           url: "../index/index"
    //         });
    //       } else {
    //         uni.showToast({
    //           title: `授权失败，请重新授权`,
    //           icon: "error",
    //           duration: 2000
    //         });
    //       }
    //     },
    //     fail: console.error
    //   });
    //   // #endif
    // }
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
