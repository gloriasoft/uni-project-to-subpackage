<script>
    /*
    * App.vue在解耦构建的模式种，并不会被执行，这是因为uni项目只是作为一个包被引入到主小程序项目中
    * 主小程序的原生app.js才是入口文件，是否执行uni项目的App.vue是由整个小程序的管理者决定
    * App.vue的对象会被保存在wx.__uniapp2wxpack.uniSubpackage.__packInit中
    * 主小程序的原生app.js可以自己选择在合适的时候去使用App.vue中的方法和数据
    * */
    export default {
        onLaunch: function() {
            console.log('App Launch');
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        },
		globalData: {
			test: 'Hello! I am the globalData from App.vue'
		}
    }
</script>

<style>
    /*__uniWxss{*/
        /*import: '/static/test.wxss';*/
    /*}*/
    /*view,.aabbcc{*/
        /*background: red;*/
    /*}*/
</style>
