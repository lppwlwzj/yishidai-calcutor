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
      <input class="input" type="number" v-model="freight" placeholder="" />
    </view>

    <view class="form-item">
      <view class="label"> 单价规格 </view>
      <view class="input">
        <picker
          @change="handlePricePickerChange"
          :value="selectUnitPrice"
          :range="unitPriceOptions"
          range-key="label"
        >
          <view class="uni-input">{{
            unitPriceOptions[selectUnitPrice].label
          }}</view>
        </picker>
      </view>
    </view>
    <uni-result v-show="isShowResult" :resultList="resultList"></uni-result>

    <view class="btn-groups">
      <button class="left" type="default" @click="handleReset">清空</button>
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

export default {
  data() {
    return {
      freight: '',
      resultList: [],
      isShowResult: false,
      form: {
        len: '',
        width: '',
        thickness: '',
        cubePrice: '',
        // freight: '',
      },
      unitPriceOptions: [
        {
          label: '每平方单价',
        },
        {
          label: '每米单价',
        },
        {
          label: '每块单价',
        },
      ],
      selectUnitPrice: 0,
      factoryCost: 0, //出厂成本
      freightCost: 0, //运费成本
      totalCost: 0, //综合成本
      unitPriceCalMap: {
        //出厂成本Map
        factoryCost: {
          0: () => {
            //=D15*A15*0.001
            const { len, width, cubePrice, thickness } = this.form
            return cubePrice * thickness * 0.001
          },
          1: () => {
            //=A15*C15*D15*0.000001
            const { len, width, cubePrice, thickness } = this.form
            return cubePrice * thickness * width * 0.000001
          },
          2: () => {
            //=A15*C15*B15*D15*0.000000001
            const { len, width, cubePrice, thickness } = this.form
            return len * cubePrice * thickness * width * 0.000000001
          },
        },
        freightCost: {
          //运费成本Map
          0: () => {
            //=D15*A15*0.001
            const { len, width, cubePrice, thickness } = this.form
            return this.freight * thickness * 0.001
          },
          1: () => {
            //=A15*C15*D15*0.000001
            const { len, width, cubePrice, thickness } = this.form
            return this.freight * thickness * width * 0.000001
          },
          2: () => {
            //=A15*C15*B15*D15*0.000000001
            const { len, width, cubePrice, thickness } = this.form
            return len * this.freight * thickness * width * 0.000000001
          },
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
    handleReset() {
      Object.keys(this.form).map((key) => (this.form[key] = ''))
    },
    isNil(value) {
      return !value && value !== 0
    },
    handleClick(val) {
      this.active = val
    },
    handleCal() {
      if (this.disabled) return
      //出厂成本
      this.factoryCost =
        this.unitPriceCalMap['factoryCost'][this.selectUnitPrice]()

      //运费成本
      if (!this.isNil(this.freight)) {
        this.freightCost =
          this.unitPriceCalMap['freightCost'][this.selectUnitPrice]()
      }
      //综合成本
      this.totalCost = this.factoryCost + this.freightCost
      this.resultList = [
        {
          label: '出厂成本',
          value: this.factoryCost,
        },
        {
          label: '运费成本',
          value: this.freightCost,
        },
        {
          label: '综合成本',
          value: this.totalCost,
        },
      ]
      this.isShowResult = true
    },
    handlePricePickerChange(e) {
      this.selectUnitPrice = e.detail.value
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
