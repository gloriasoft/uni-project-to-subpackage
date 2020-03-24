## Uni-App 解耦构建 
#### 对uni-app在微信小程序的打包方案进行改造，形成解耦打包，并且支持微信原生页面直接在uni-app项目中使用 
+ 可以使uni-app项目输出微信小程序的分包，被其他小程序项目使用
+ 支持微信原生页面直接在uni-app项目中使用（还支持任何原生的js、wxss在uni-app项目中使用）
+ 支持原生小程序项目直接在uni-app项目中进行开发，当uni-app的解耦包是该原生小程序的主包时，uni-app包可以通过globalData进行方法公开，被原生小程序的其他页面和分包使用
+ 支持uni-app项目调用原生小程序项目中的资源 

#### 概念 
+ uni-app项目目录 
    + project/src
+ 主小程序项目（原生）目录
    + project/mainWeixinMp (可进行配置修改)  
+ uni-app项目中的原生小程序页面（或资源）目录
    + project/src/wxresource 
