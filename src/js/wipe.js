var cas = document.getElementById('cas');
var context = cas.getContext("2d");
var x1 = 0;
var y1 =0;
var c= 0;
var radius = 20;//涂抹的半径
var isMouseDown = false;//表示鼠标的状态,是否按下,默认为未按下;
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
cas.addEventListener("mousedown",function(evt){
	isMouseDown = true;
	console.log(isMouseDown);
	var event = evt || window.event;
	x1 = event.clientX;
	y1 = event.clientY;
	drawcav(context,event.clientX,event.clientY);
},false);
cas.addEventListener("mousemove",fn1,false);
function fn1(evt){
	if (isMouseDown) {
		var event = evt || window.event;
		var x2 = event.clientX;
		var y2 = event.clientY;
		drawLine(context,x1,y1,x2,y2);
		x1 = x2;
		y1 = y2;
	}
}
cas.addEventListener("mouseup",function(){
	isMouseDown = false;
	if (getTranspar(context) > 65) {
		clearRect(context);
	}
	console.log(isMouseDown);
},false);

function clearRect(context){
	context.clearRect(0,0,cas.width,cas.height);
}
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