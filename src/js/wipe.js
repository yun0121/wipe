var cas = document.getElementById('cas');
var context = cas.getContext("2d");
var x1 = 0;
var y1 =0;
var c= 0;
var radius = 20;//涂抹的半径
var phone1 = "";
var phone2 = "";
var phone3 = "";
var isMouseDown = false;//表示鼠标的状态,是否按下,默认为未按下;
var device = (/android|webos|iPhone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
console.log(device);
if (device){
	phone1 = "touchstart";
	phone2 = "touchmove";
	phone3 = "touchend";
}else{
	phone1 = "mousedown";
	phone2 = "mousemove";
	phone3 = "mouseup";
}
function drawMask(context){
	context.fillStyle = "#666";
	context.fillRect(0,0,cas.width,cas.height);
	context.globalCompositeOperation = "destination-out";
}
//在画布上画一个半径为30的圆
function drawcav(context,moveX,moveY){
	context.beginPath();
	context.arc(moveX,moveY,radius,0,2*Math.PI);
	context.fillStyle = "red";
	context.fill();
}
//画直线
function drawLine(context,x1,y1,x2,y2){
		context.save();
		context.beginPath();
		context.lineCap = "round";
		context.lineWidth = radius*2;
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		context.stroke();
		//恢复原有绘图状态
		context.restore();
}
//在canvas画布上监听自定义事件"mousedown",调用drawPoint函数
cas.addEventListener(phone1,function(evt){
	isMouseDown = true;
	if (device) {
		x1 = event.touches[0].clientX;
		y1 = event.touches[0].clientY;
	}else{
		x1 = event.clientX;
		y1 = event.clientY;
	}
	drawcav(context,x1,y1);
},false);
//手机端触摸事件
// cas.addEventListener("touchstart",function(evt){
// 	isMouseDown = true;
// 	var event = evt || window.event;
// 	x1 = event.touches[0].clientX;
// 	y1 = event.touches[0].clientY;
// 	drawcav(context,x1,y1);
// });
//手机端移动事件
cas.addEventListener(phone2,fn2,false);
function fn2(evt){
	if (isMouseDown){
		var event = evt || window.event;
		event.preventDefault();
		if (device){
			var x2 = event.touches[0].clientX;
			var y2 = event.touches[0].clientY;
		}else{
			var x2 = event.clientX;
			var y2 = event.clientY;
		}
		drawLine(context,x1,y1,x2,y2);
		x1 = x2;
		y1 = y2;
	}
}
//PC端移动事件
// cas.addEventListener(phone3,fn1,false);
// function fn1(evt){
// 	if (isMouseDown) {
// 		var event = evt || window.event;
// 		var x2 = event.clientX;
// 		var y2 = event.c0lientY;
// 		drawLine(context,x1,y1,x2,y2);
// 		x1 = x2;
// 		y1 = y2;
// 	}
// }
//PC端移动结束时间
cas.addEventListener(phone3,function(){
	isMouseDown = false;
	if (getTranspar(context) > 65) {
		clearRect(context);
	}
	console.log(isMouseDown);
},false);
//手机端手指移开
// cas.addEventListener("touchend",function(){
// 	isMouseDown = false;
// 	if (getTranspar(context) > 65) {
// 		clearRect(context);
// 	}
// 	console.log(isMouseDown);
// },false);
//调用画圆代码
function clearRect(context){
	context.clearRect(0,0,cas.width,cas.height);
}
//计算透明度
function getTranspar(context){
		var a = context.getImageData(0,0,cas.width,cas.height);
		console.log(a);
	for (var j = 0; j < cas.height; j++) {
		for (var i = 0; i < cas.width; i++) {
			var r = ((cas.width*j)+i)*4;
			var g = ((cas.width*j)+i)*4+1;
			var b = ((cas.width*j)+i)*4+2;
			var f = ((cas.width*j)+i)*4+3;
			if (a.data[f] === 0) {
				c++;
			}
		}
	}
	var tmb = c/(cas.width*cas.height)*100;
	console.log(tmb);
	return Math.round(tmb);
}
window.onload = function(){
	drawMask(context);
};