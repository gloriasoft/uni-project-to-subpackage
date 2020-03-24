## Uni-App的解耦构建（分包化）  
#### 对uni-app在微信小程序的打包方案进行改造，形成解耦打包，并且支持微信原生页面直接在uni-app项目中使用  
+ 可以使uni-app项目输出微信小程序的分包，被其他小程序项目使用  
+ 支持微信原生页面直接在uni-app项目中使用（还支持任何原生的js、wxss在uni-app项目中使用）  
+ 支持原生小程序项目直接在uni-app项目中进行开发，当uni-app的解耦包是该原生小程序的主包时，uni-app包可以通过globalData进行方法公开，被原生小程序的其他页面和分包使用  
+ 支持uni-app项目调用原生小程序项目中的资源   

#### 概念 
+ uni-app项目目录   
    + project/src  
+ 主小程序项目（原生）目录  
    + project/mainWeixinMp   (可进行配置修改)  
+ uni-app项目中的原生小程序页面（或资源）目录  
    + project/src/wxresource   
+ uni-app项目打包输出之后在主小程序项目中的目录  
    + uniSubpackage (可进行配置修改)  
    

#### 脚手架结构 
与普通uni-app项目的结构保持一致
``````
│  babel.config.js 
│  gulpfile.js 
│  package-lock.json 
│  package.json 
│  postcss.config.js
│  projectToSubPackageConfig.js             // 解耦包配置文件
│  README.md
├─dist
│  └─dev
│      ├─mp-weixin                          // uni-app微信小程序普通构建目录
│      └─mp-weixin-subpackage-project       // uni-app微信小程序解耦构建目录
├─mainWeixinMp                              // 原生主小程序目录
├─public  
└─src                                       // uni-app源码目录
    │  App.vue
    │  LICENSE
    │  main.js
    │  manifest.json
    │  package.json
    │  pages.json
    │  README.md
    │  template.h5.html
    │  uni.scss
    │  
    ├─pages       
    ├─static
    ├─store
    ├─wxcomponents
    └─wxresource                            // 原生页面及资源存放目录
``````   

#### 安装  
````  
npm i
````  

#### 运行  
````
// 开发
npm run dev:mp-weixin-pack

// 打包
npm run build:mp-weixin-pack
````  

#### projectToSubPackageConfig.js   
解耦包配置文件  
````javascript
module.exports={
    // 微信原生小程序目录
    mainWeixinMpPath: './mainWeixinMp',
    // uni项目输出的分包在微信原生小程序中的路径
    subPackagePath: 'uniSubpackage'
}
````   

#### wxresource目录  
uni-app源码中要使用的原生页面及资源存放目录  
在构建后，此目录会与uni-app的构建目录融合，此目录里的文件相对路径就等于uni-app构建之后的分包根目录
