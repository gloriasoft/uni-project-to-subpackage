import {uniAppHook} from './config'
import {init} from '../vueRouter/init'
import {appInit,removeBackPressEvent,pageIsHeadBack} from '../appRouter/init'
import {appletsInit} from '../appletsRouter/init'
import {appPlatform} from "../helpers/util";
import {proxyIndexHook} from '../appRouter/hooks'
import {appletsProxyIndexHook} from '../appletsRouter/hooks'
import uniapp2wxpackHack from '../uniapp2wxpackHack'

/**
 * 获取一些需要在各个平台混入的事件
 * @param {Object} Router 当前原始路由对象
 */
const getMixins = function(Router) {
	return {
		H5: {
			beforeCreate: function() {
				if (this.$options.router) {
					init(Router.$root, this.$options.router, this);
				}
			}
		},
		APP:{
			onLaunch: function() {
				uniAppHook.onLaunched=true;	//标志已经触发了 onLaunch 事件
				appInit.call(this,Router.$root);
			},
			onLoad:function(){
				//第一个页面 拦截所有生命周期
				if(uniAppHook.onLaunched&&!uniAppHook.pageReady){
					uniAppHook.onLaunched=false;
					proxyIndexHook.call(this,Router.$root);
				}
				removeBackPressEvent(this.$mp.page,this.$options);  //移除页面的onBackPress事件
			},
			onBackPress:function(...args){
				return pageIsHeadBack.call(Router.$root,this.$mp.page,this.$options,args);
			}
		},
		APPLETS:{
			onLaunch: function(){


				uniAppHook.onLaunched=true;	//标志已经触发了 onLaunch 事件
				appletsInit.call(this,Router.$root);

				uniapp2wxpackHack.appLaunch = true;
                uniapp2wxpackHack.appHide = false;
                uniapp2wxpackHack.catchOnLoad && uniapp2wxpackHack.catchOnLoad.call(this);
				setTimeout(()=>{
                    uniapp2wxpackHack.catchOnLoad = null;
				},0)
			},
            // uniapp2wxpack hack
			onLoad:function catchOnLoad(){

                uniapp2wxpackHack.appLoad = true;
                uniapp2wxpackHack.catchOnLoad = catchOnLoad


				if(uniAppHook.onLaunched&&!uniAppHook.pageReady){	//必须是第一个页面
					uniAppHook.onLaunched=false;
					appletsProxyIndexHook.call(this,Router.$root);
				}
			},
			// uniapp2wxpack hack
			onHide(){
                uniapp2wxpackHack.appHide = true
                uniapp2wxpackHack.appLoad = false
                uniapp2wxpackHack.appLaunch = false
			}
		}
	}
}

const initMixins = function(Vue, Router) {
	Vue.mixin({
		...getMixins(Router)[appPlatform(true)],
	})
}

export default initMixins;
