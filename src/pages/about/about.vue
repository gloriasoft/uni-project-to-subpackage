<template>
	<view class="about test-background">
		<view class="content">
			<view class="qrcode">
				<image src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/app_download.png" @longtap="save"></image>
				<text class="tip">扫码体验uni-app</text>
			</view>
			<view class="desc">
				<text class="code">uni-app</text>
				是一个使用 <text class="code">Vue.js</text> 开发跨平台应用的前端框架。
			</view>
			<view class="source">
				<view class="title" style="font-weight:900">此项目是uni-app的微信小程序解耦构建示例项目，可以将uni-app项目打包成为一个解耦包，集成到任何一个原生小程序项目中</view>
			</view>
			<button @click="toNative">跳转到一个uni项目自身的原生小程序页面</button>
		</view>
	</view>
</template>

<script>
	// 引入原生微信小程序资源（什么都可以引）
	let nativeJsTest=__uniRequireWx('@wxResource/natvieJs/test').default
	console.log(nativeJsTest)
	export default {
		components: {
		},
		data() {
			return {
				providerList: [],
				version: ''
			}
		},
		onLoad() {

		},
		methods: {
		    toNative(){
		        uni.navigateTo({
					url:'../../nativePage/index'
				})
			}
		}
	}
</script>

<style>
	/*引入原生微信小程序wxss*/
	__uniWxss{
		@import: '@wxResource/nativePage/index.wxss';
		@import: '@wxResource/nativeCommon/test.wxss';
	}

	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	image {
		width: 360upx;
		height: 360upx;
	}

	.about {
		flex-direction: column;
		flex: 1;
	}

	.content {
		flex: 1;
		padding: 30upx;
		flex-direction: column;
		justify-content: center;
	}

	.qrcode {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.qrcode .tip {
		margin-top: 20upx;
	}

	.desc {
		margin-top: 30upx;
		display: block;
	}

	.code {
		color: #e96900;
		background-color: #f8f8f8;
	}

	button {
		width: 100%;
		margin-top: 40upx;
	}

	.version {
		height: 80upx;
		line-height: 80upx;
		justify-content: center;
		color: #ccc;
	}

	.source {
		margin-top: 30upx;
		flex-direction: column;
	}

	.source-list {
		flex-direction: column;
	}

	.link {
		color: #007AFF;
	}
</style>
