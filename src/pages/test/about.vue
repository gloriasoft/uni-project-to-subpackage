<template>
	<view class="about test-background">
		<view class="content">
			联合分包中的vue test页面
		</view>
	</view>
</template>

<script>
	// 引入原生微信小程序资源（什么都可以引）
	let {packPath} =__uniRequireWx('@wxResource/pack.config.js')

	export default {
		components: {
		},
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
		}
	}
</script>

<style>
	.content{font-size:90rpx;font-weight: 900;color:darkred}
</style>
