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
      <text class="label">立方单价</text>
      <input
        class="input"
        type="number"
        v-model="form.cubePrice"
        placeholder=""
      />
    </view>

    <view class="form-item">
      <text class="label">运费</text>
      <input
        class="input"
        type="number"
        v-model="form.freight"
        placeholder=""
      />
    </view>

    <view class="form-item">
      <view class="label"> 单价规格 </view>
      <view class="input">
        <picker
          @change="handlePricePickerChange"
          :value="form.selectUnitPrice"
          :range="unitPriceOptions"
          range-key="label"
        >
          <view class="uni-input">{{
            unitPriceOptions[form.selectUnitPrice].label
          }}</view>
        </picker>
      </view>
    </view>

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
export default {
  data() {
    return {
      form: {
        selectUnitPrice: 1,
        len: '',
        width: '',
        thickness: '',
        cubePrice: '',
        freight: '',
      },
      unitPriceOptions: [
        {
          label: '每平方单价',
          value: 1,
        },
        {
          label: '每米单价',
          value: 2,
        },
        {
          label: '每块单价',
          value: 3,
        },
      ],
      selectUnitPrice: 1,
    }
  },
  computed: {
    disabled() {
      return Object.keys(this.form).some((key) => this.isNil(this.form[key]))
    },
  },
  onLoad() {},
  methods: {
    isNil(value) {
      return !value && value !== 0
    },
    handleClick(val) {
      this.active = val
    },
    handleCal() {
      if (this.disabled) return
    },
    handlePricePickerChange(e) {
      this.form['selectUnitPrice'] = e.detail.value
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
