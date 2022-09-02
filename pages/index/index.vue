<template>
  <view class="cal-content">
    <view class="cal-title">
      <text class="title">{{ title }}</text>
      <text class="contact">联系我们</text>
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
      <view class="form-content" v-show="active === 0">
        <view class="form-item">
          <text class="label">长</text>
          <input class="input" type="number" placeholder="" />
        </view>
        <view class="form-item">
          <text class="label">宽</text>
          <input class="input" type="number" placeholder="" />
        </view>

        <view class="form-item">
          <text class="label">厚</text>
          <input class="input" type="number" placeholder="" />
        </view>
        <view class="form-item">
          <view class="label select-label">
            <picker
              @change="handleAmountPickerChange"
              :value="selectAmount"
              :range="amountOptions"
              range-key="label"
            >
              <view class="uni-input">{{
                amountOptions[selectAmount].label
              }}</view>
            </picker>
          </view>
          <input class="input" type="number" placeholder="" />
        </view>

        <!-- <view class="form-item">
          <view class="label select-label">
            <picker
              @change="handleWeightPickerChange"
              :value="selectWeight"
              :range="weightOptions"
              range-key="label"
            >
              <view class="uni-input">{{
                weightOptions[selectWeight].label
              }}</view>
            </picker>
          </view>
          <input class="input" type="number" placeholder="" />
        </view> -->
        <view class="form-item">
          <view class="label select-label"> 重量单位 </view>
          <view class="input">
            <picker
              @change="handleWeightPickerChange"
              :value="selectWeight"
              :range="weightOptions"
              range-key="label"
            >
              <view class="uni-input">{{
                weightOptions[selectWeight].label
              }}</view>
            </picker>
          </view>
        </view>

        <view class="btn-groups">
          <button class="left" type="default">清空</button>
          <button class="right" type="default">计算结果</button>
        </view>
      </view>
      <view class="weight" v-show="active === 1">计算路沿石</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '内部成本计算器',
      active: 0,
      amountOptions: [
        {
          label: '选择数量',
          value: 0,
        },
        {
          label: '平方',
          value: 1,
        },
        {
          label: '立方',
          value: 2,
        },
        {
          label: '米',
          value: 3,
        },
        {
          label: '块',
          value: 4,
        },
      ],
      weightOptions: [
        // {
        //   label: '选择重量',
        //   value: 0,
        // },
        {
          label: '成品重量(吨)',
          value: 1,
        },
        {
          label: '毛板重量(吨)',
          value: 2,
        },
      ],
      selectAmount: 0,
      selectWeight: 1,
    }
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
  /* height: 33px; */
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
.cal-tab-content,
.form-content {
  width: 100%;
}
.form-item {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  color: #1a1a44cc;
  border: 1px solid #1a1a44cc;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20rpx 0 60rpx 0;
}
.label {
  width: 60rpx;
  padding: 0 40rpx;
}
.input {
  flex: 1;
  height: 100%;
}

.select-label {
  width: 200rpx;
}
.btn-groups {
  margin: 100rpx 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.left {
  width: 180rpx;
  margin-right: 30rpx;
}
.right {
  flex: 1;
  background: #9e9eb7cc;
  color: #fff;
}
</style>
