<template>
	<view class="form-content">
		<!-- <view class="form-item">
      <text class="label">长</text>
      <input class="input" type="number" v-model="form.len" />
    </view>
    <view class="form-item">
      <text class="label">宽</text>
      <input class="input" type="number" v-model="form.width" />
    </view>

    <view class="form-item">
      <text class="label">厚</text>
      <input class="input" type="number" v-model="form.thickness" />
    </view> -->
		<view class="form-inline">
			<view class="form-inline-item">
				<text class="form-inline-label">长/mm</text>
				<input class="input" type="number" v-model="form.len" />
			</view>
			<view class="form-inline-item">
				<text class="form-inline-label">宽/mm</text>
				<input class="input" type="number" v-model="form.width" />
			</view>

			<view class="form-inline-item">
				<text class="form-inline-label">厚/mm</text>
				<input class="input" type="number" v-model="form.thickness" />
			</view>
		</view>

		<view class="form-item">
			<view class="label">数量规格</view>
			<view class="label select">
				<picker @change="handleAmountPickerChange" :value="selectAmount" :range="amountOptions" range-key="label">
					<view class="uni-input">{{ amountOptions[selectAmount].label }}</view>
				</picker>
			</view>
			<input class="input" type="number" v-model="form.amount" />
		</view>

		<view class="form-item">
			<view class="label">重量单位</view>
			<view class="input">
				<picker @change="handleWeightPickerChange" :value="selectWeight" :range="weightOptions" range-key="label">
					<view class="uni-input">{{ weightOptions[selectWeight].label }}</view>
				</picker>
			</view>
		</view>
		<uni-result v-show="isShowResult" :resultList="resultList"></uni-result>

		<view class="btn-groups">
			<button class="left" type="default" @click="handleReset">清空</button>
			<button :class="['right', { disabled: disabled }]" type="default" @click="handleCal">计算结果</button>
		</view>
	</view>
</template>

<script>
import uniResult from '@/components/uni-result/index.vue';
export default {
	data() {
		return {
			selectAmount: 0,
			selectWeight: 0,
			isShowResult: false,
			form: {
				len: '',
				width: '',
				amount: '',
				thickness: ''
			},
			amountOptions: [
				{
					label: '平方'
				},
				{
					label: '立方'
				},
				{
					label: '米'
				},
				{
					label: '块'
				}
			],
			weightOptions: [
				{
					label: '成品重量(吨)'
				},
				{
					label: '毛板重量(吨)'
				}
			],
			resultList: [],
			productWeight: 0, //成品重量
			boardWeight: 0, //毛板重量
			productWeightCalMap: {
				0: () => {
					//=E4*(A4-1)*2.7*0.001
					const { len, width, amount, thickness } = this.form;
					return amount * (thickness - 1) * 2.7 * 0.001;
				},
				1: () => {
					const { len, width, amount, thickness } = this.form;
					return amount * 2.7;
				},
				2: () => {
					//=G4*(A4-1)*C4*2.7*0.000001
					const { len, width, amount, thickness } = this.form;
					return amount * (thickness - 1) * width * 2.7 * 0.000001;
				},
				3: () => {
					//=(A4-1)*B4*C4*H4*2.7*0.000000001
					const { len, width, amount, thickness } = this.form;
					return (thickness - 1) * len * width * amount * 2.7 * 0.000000001;
				}
			}
		};
	},
	components: {
		uniResult
	},
	computed: {
		disabled() {
			return Object.keys(this.form).some(key => this.isNil(this.form[key]));
		}
	},

	methods: {
		handleReset() {
			this.isShowResult = false;
			Object.keys(this.form).map(key => (this.form[key] = ''));
		},
		handleCal() {
	
			if (this.disabled) return;
			this.productWeight = this.productWeightCalMap[parseInt(this.selectAmount)]();
			if (+this.selectWeight === 0) {
				this.resultList = [
					{
						label: '成品重量（吨）：',
						value: this.productWeight.toFixed(2)
					}
				];
				this.isShowResult = true;
				return;
			}
			this.boardWeight = parseFloat(this.productWeight) * 1.2;
			this.resultList = [
				{
					label: '毛板重量（吨）：',
					value: this.boardWeight.toFixed(2)
				}
			];
			this.isShowResult = true;
		},
		handleClick(val) {
			this.active = val;
		},
		isNil(value) {
			return !value && value !== 0;
		},

		handleAmountPickerChange(e) {
			this.selectAmount = e.detail.value;
		},
		handleWeightPickerChange(e) {
			this.selectWeight = e.detail.value;
		}
	}
};
</script>

<style scoped>
.form-content {
	width: 100%;
}

.form-inline-item,
.form-item {
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	color: #1a1a44cc;
	border: 1px solid #1a1a44cc;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin: 40rpx 0 80rpx 0;
	padding: 0 50rpx 0 40rpx;
	box-sizing: border-box;
}
.form-inline {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
}
.form-inline-item {
	width: 32%;
	margin: 30rpx 0 30rpx 0;
	padding: 0 16rpx;
}
.form-inline-label {
	width: 90rpx;
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
	margin: 100rpx 0 60rpx;
	display: flex;
	flex-direction: row;

	justify-content: space-around;
}
.left {
	font-size: 18px;
	width: 180rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin-right: 30rpx;
}
.right {
	height: 90rpx;
	line-height: 90rpx;
	font-size: 18px;
	flex: 1;
	background: #1a1a44cc;
	color: #fff;
}
.disabled {
	background: #9e9eb7cc;
}
</style>
