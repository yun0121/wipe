## ver 0.0.1 ##
PC端实现涂抹效果,超过50%的涂抹面积可以全部显示。涂抹颜色和背景图片手动指定。2018-11-12
## ver 1.0.0 ##
更新了手势操作,函数优化,可以适用手机端和PC端的涂抹功能
## ver 2.0.0 ##
实现面向对象方式,增加了参数配置
## ver 3.0.0 ##
1.浏览器滚动距离下bug修复
2.canvas画布在有偏移和绝对定位下bug修复
3.增加了回调函数。让用户可以自己完成后继功能

使用步骤说明:
1.在HTML中添加一个指定的canvas标签
例如:
` <canvas id="cas"></canvas> `
2.编译配置文件
|属性名 |取值类型|备注|
|id |字符串|canvas标签的id|
|coverType |字符串|取值为"color"或"images",如果不指定默认值为color,默认取值#666|
|color|字符串|十六进制颜色码,或rgba(),如果不指定默认值为#666|
|imgUrl|字符串|前面覆盖的图片|
|backImgUrl|字符串|canvas背景图片|
|width|数值类型|canvas的宽度|
|height|数值类型|canvas的高度|
|radius|字符串|涂抹笔的半径|
|percents|数值|透明度占整个画布的百分比,超出此数字显示全部画布|
|wipeCallback|函数|用户自定义回调函数名称|
例如:
``` 
var wipeConfig = {
		id:"cas", 			//id
		coverType:"color",  //取值类型color,image,如果没有值,则画布覆盖色默认为灰色
		color:"red",  		    //颜色参数
		imgUrl:"image/wipe2.jpg",		    //覆盖图片
		backImgUrl:"image/wipe1.jpg",	    //背景图片
		width:400, 		    //canvas宽
		height:600,         //canvas高
		radius:10,           //画笔的半径
		percents:50,		 //透明度占整个画布的百分比,超出此数字显示全部画布
		wipeCallback:wipeCallback //配置的回调函数名称
	}
 ```
 3.初始化wipe插件,并将上一步的配置变量作为参数传入
 例如:
``` 
 new Wipe(wipeConfig)
 ```
 4.编写回调函数。用户在涂抹完成的后继操作必须写在此回调函数中
 例如:
 ``` 
function wipeCallback(percent){
		if (percent > 50) {
			console.log("透明面积超过50%,查看底图");
		}
	}
 ```
## ver 3.0.1 ##
添加透明度延迟检测


