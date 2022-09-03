<template>
  <view class="form-content">
    <view class="form-item">
      <text class="label">长</text>
      <input class="input" type="number" v-model="form.len" placeholder="" />
    </view>
    <view class="form-item">
      <text class="label">宽</text>
      <input class="input" type="number" v-model="form.width" placeholder="" />
    </view>

    <view class="form-item">
      <text class="label">厚</text>
      <input
        class="input"
        type="number"
        v-model="form.thickness"
        placeholder=""
      />
    </view>
    <view class="form-item">
      <view class="label"> 数量规格 </view>
      <view class="label select">
        <picker
          @change="handleAmountPickerChange"
          :value="form.selectAmount"
          :range="amountOptions"
          range-key="label"
        >
          <view class="uni-input">{{
            amountOptions[form.selectAmount].label
          }}</view>
        </picker>
      </view>
      <input class="input" type="number" v-model="form.amount" placeholder="" />
    </view>

    <view class="form-item">
      <view class="label"> 重量单位 </view>
      <view class="input">
        <picker
          @change="handleWeightPickerChange"
          :value="form.selectWeight"
          :range="weightOptions"
          range-key="label"
        >
          <view class="uni-input">{{
            weightOptions[form.selectWeight].label
          }}</view>
        </picker>
      </view>
    </view>
    <!-- <uni-result  v-show="showResult"></uni-result> -->

    <view class="btn-groups">
      <button class="left" type="default">清空</button>
      <button
        :class="['right', { disabled: disabled }]"
        type="default"
        @click="handleCal"
      >
        计算结果
      </button>
    </view>
  </view>
</template>

<script>
import uniResult from '@/components/uni-result/index.vue'
// const waysOfCalMap = {
//   1: {
//     1: (val) => {},
//     2: (val) => {},
//     3: (val) => {},
//     4: (val) => {},
//   },
//   2: {
//     1: (val) => {},
//     2: (val) => {},
//     3: (val) => {},
//     4: (val) => {},
//   },
// }
export default {
  data() {
    return {
      isShowResult: false,
      form: {
        selectAmount: 1,
        selectWeight: 1,
        len: '',
        width: '',
        amount: '',
        thickness: '',
      },
      amountOptions: [
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
        {
          label: '成品重量(吨)',
          value: 1,
        },
        {
          label: '毛板重量(吨)',
          value: 2,
        },
      ],
      waysOfCalMap: {
        1: {
          1: () => {
            const { len, width, amount, thickness } = this.form
            // return
          },
          2: () => {},
          3: () => {},
          4: () => {},
        },
        2: {
          1: () => {},
          2: () => {},
          3: () => {},
          4: () => {},
        },
      },
    }
  },
  components: {
    uniResult,
  },
  computed: {
    disabled() {
      return Object.keys(this.form).some((key) => this.isNil(this.form[key]))
    },
  },
  onLoad() {},
  methods: {
    handleCal() {
      if (this.disabled) return
    },
    handleClick(val) {
      this.active = val
    },
    isNil(value) {
      return !value && value !== 0
    },

    handleAmountPickerChange(e) {
      this.form['selectAmount'] = e.detail.value
    },
    handleWeightPickerChange(e) {
      this.form['selectWeight'] = e.detail.value
    },
  },
}
</script>

<style scoped>
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
  padding: 0 50rpx 0 40rpx;
  box-sizing: border-box;
}
.label {
  width: 140rpx;
}
.select {
  width: 100rpx;
  margin-left: 80rpx;
}
.input {
  flex: 1;
  height: 100%;
  text-align: right;
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
  background: #1a1a44cc;
  color: #fff;
}
.disabled {
  background: #9e9eb7cc;
}
</style>
