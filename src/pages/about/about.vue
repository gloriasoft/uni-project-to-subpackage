<template>
	<view class="about test-background">
		<view class="img-test"></view>
		<view class="content">
			<view class="source">
				<view class="title" style="font-weight:900">此项目是uni-app的微信小程序解耦构建示例项目，可以将uni-app项目打包成为一个解耦包，集成到任何一个原生小程序项目中</view>
				<view class="title" style="font-weight:900;color:darkred">在原来uni项目的基础上，使用uniapp2wxpack的cli升级成解耦构造的微信小程序项目</view>
				<view style="font-weight: 900;font-size:50rpx">
					此页面是uni项目的vue页面
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN-PACK -->
			<button @click="toNative(packPath+'/nativePage/index')">跳转到一个uni项目自身的原生小程序页面</button>
			<!--#endif-->
			<!-- #ifdef MP-WEIXIN-PACK -->
			<button @click="toNative('/pages/logs/logs')">跳转主小程序的log页面</button>
			<!--#endif-->
			<button @click="toNative(packPath+'/pages/test/about')">test联合分包中的vue页面</button>
			<!-- #ifdef MP-WEIXIN-PACK -->
			<button @click="toNative(packPath+'/pages/test/index')">test联合分包中的原生页面</button>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
	// 引入原生微信小程序资源（什么都可以引）
	//#ifdef MP-WEIXIN-PACK
	console.log(11111)
	let {packPath} =__uniRequireWx('@wxResource/pack.config.js')
	//#endif
    //#ifndef MP-WEIXIN-PACK
	console.log(22222)
    let packPath = ''
    //#endif

	export default {
		components: {
		},
		data() {
			return {
				providerList: [],
				version: '',
				packPath
			}
		},
		onLoad() {

		},
		methods: {
		    toNative(url, isTabBar){
		        if(isTabBar){
		            uni.switchTab({url})
					return
				}
		        uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	/*引入原生微信小程序wxss*/
	/*#ifdef MP-WEIXIN-PACK*/
	__uniWxss{
		import: '@wxResource/nativeCommon/test.wxss';
		import: '@wxResource/nativeCommon/test1.wxss';
	}
	/*#endif*/

	.img-test{
		width:200rpx;
		height:200rpx;
		background: url(../../static/uni.png);
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
