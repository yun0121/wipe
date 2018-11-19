/*
mail:1445236951@qq.com
data: 2018-11-16
*/
function Wipe(obj){
	this.conID = obj.id;
	this.color = obj.color || "#666";//覆盖颜色
	this.percents = obj.percents;
	this.cas = document.getElementById(this.conID);
	this.context = this.cas.getContext("2d");
	this.coverType = obj.coverType;//覆盖的是颜色还是图
	this.cas.style.background="url("+obj.backImgUrl+")" + "center no-repeat";//背景图
	this.cas.style.backgroundSize = "100% 100%";
	this.imgUrl = obj.imgUrl; //覆盖图片
	this.cas.width =obj.width;
	this.cas.height =obj.height;
	this._w = this.cas.width;
	this._h = this.cas.height;
	this.radius = obj.radius;//涂抹的半径
	this.x1 = 0;
	this.y1 =0;
	this.isMouseDown = false;//表示鼠标的状态,是否按下,默认为未按下;
	this.wipeCallback = obj.wipeCallback;
	this.drawMask();
	this.play();
}
//图片遮盖函数
Wipe.prototype.drawMask = function(){
	if (this.coverType === "") {
		this.context.fillStyle = "#666";
		this.context.fillRect(0,0,this._w,this._h);
		this.context.globalCompositeOperation = "destination-out";
	}else if (this.coverType === "color") {
		this.context.fillStyle = this.color;
		this.context.fillRect(0,0,this._w,this._h);
		this.context.globalCompositeOperation = "destination-out";
	}else if(this.coverType === "images"){
		this.img = new Image();
		this.img.src = this.imgUrl;
		console.log(this.img);
		var that = this;
		this.img.onload = function(){
		that.context.drawImage(that.img,0,0,that.img.width,that.img.height,0,0,that._w,that._h);
		that.context.globalCompositeOperation = "destination-out";
		};
	}
	
};
//draw画点和画线函数
//参数:如果只有两个参数,函数功能画圆,x1,y1即圆的中心坐标
//如果传递4个参数,函数功能画线,x1,y1为起始坐标,x2,y2为结束坐标
Wipe.prototype.draw = function(x1,y1,x2,y2){
	var _scrollTop = document.documentElement.scrollTop ||document.body.scrollTop;
	var _scrollLeft = document.documentElement.scrollLeft ||document.body.scrollLeft;
	if (arguments.length===2) {
		this.context.beginPath();
		this.context.arc(x1+_scrollLeft,y1+_scrollTop,this.radius,0,2*Math.PI);
		this.context.fillStyle = "red";
		this.context.fill();
	}else{
		this.context.save();
		this.context.beginPath();
		this.context.lineCap = "round";
		this.context.lineWidth = this.radius*2;
		this.context.moveTo(x1+_scrollLeft,y1+_scrollTop);
		this.context.lineTo(x2+_scrollLeft,y2+_scrollTop);
		this.context.stroke();
		//恢复原有绘图状态
		this.context.restore();
	}
};
//调用画圆代码
Wipe.prototype.clearRect = function(){
	this.context.clearRect(0,0,this._w,this._h);
};
//计算透明度
Wipe.prototype.getTranspar = function(){
	var c = 0;
	var a = this.context.getImageData(0,0,this._w,this._h);
		console.log(a);
	for (var j = 0; j < this._h; j++) {
		for (var i = 0; i < this._w; i++) {
			var r = ((this._w*j)+i)*4;
			var g = ((this._w*j)+i)*4+1;
			var b = ((this._w*j)+i)*4+2;
			var f = ((this._w*j)+i)*4+3;
			if (a.data[f] === 0) {
				c++;
			}
		}
	}
	this.tmb = c/(this._w*this._h)*100;
	console.log(this.tmb);
	return Math.round(this.tmb);
};
Wipe.prototype.play = function(){
this.device = (/android|webos|iPhone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
this.press = this.device ? "touchstart" : "mousedown";
this.move = this.device ? "touchmove" : "mousemove";
this.loosen = this.device ? "touchend" : "mouseup";
var that = this;
//在canvas画布上监听自定义事件"mousedown",调用drawPoint函数
this.cas.addEventListener(this.press,function(evt){
	that.isMouseDown = true;
	console.log(that.isMouseDown);
	if (that.device) {
		that.x1 = event.touches[0].clientX;
		that.y1 = event.touches[0].clientY;
	}else{
		that.x1 = event.clientX;
		that.y1 = event.clientY;
	}
	console.log(that.x1);
	console.log(that.y1);
	that.draw(that.x1-getAllLeft(that.cas),that.y1-getAllTop(that.cas));
},false);
//手机端移动事件
this.cas.addEventListener(this.move,fn2,false);
function fn2(evt){
	if (that.isMouseDown){
		that.event = evt || window.event;
		that.event.preventDefault();
		var x2 = that.device?event.touches[0].clientX:event.clientX;
		var y2 = that.device?event.touches[0].clientY:event.clientY;
		that.draw(that.x1-getAllLeft(that.cas),that.y1-getAllTop(that.cas),x2-getAllLeft(that.cas),y2-getAllTop(that.cas));
		that.x1 = x2;
		that.y1 = y2;
	}
}
//PC端移动结束时间
this.cas.addEventListener(this.loosen,function(){
	//还原isMouseDown 为false
	that.isMouseDown = false;
	//借用外部的处理函数
	var percent = that.getTranspar();
	//调用同名的全局函数
	that.wipeCallback.call(window,percent);
	if (percent > that.percents) {
		that.clearRect();
	}
	console.log(that.isMouseDown);
},false);
};
//所有左偏移量
function getAllLeft(element){
	var allLeft = 0;
	while(element){
		allLeft += element.offsetLeft;
		element = element.offsetParent;
	}
	return allLeft;
}
//所有右偏移量
function getAllTop(element){
	var allTop = 0;
	while(element){
		allTop += element.offsetTop;
		element = element.offsetParent;
	}
	// console.log(allTop);
	return allTop;
}
