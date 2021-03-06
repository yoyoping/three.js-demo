let canvas;
function clock () {
  
	canvas = document.createElement('canvas');
	canvas.width=200;
	canvas.height=200;
  let ctx = canvas.getContext('2d');
  if (ctx) {
    class canvasObj {
      constructor () {
        this.x = 0;
				this.y = 0;
				this.rotation = 0;
				this.borderWidth = 2;
				this.borderColor = '#000000';
				this.fill = false;
				this.fillColor = '#ff0000';
				this.update = function(){
				if(!this.ctx)throw new Error('你没有指定ctx对象。');
				let ctx = this.ctx
				ctx.save();
				ctx.lineWidth = this.borderWidth;
				ctx.strokeStyle = this.borderColor;
				ctx.fillStyle = this.fillColor;
				ctx.translate(this.x, this.y);
				if(this.rotation)ctx.rotate(this.rotation * Math.PI/180);
				if(this.draw)this.draw(ctx);
				if(this.fill)ctx.fill();
				ctx.stroke();
				ctx.restore();
				}
      }
    }

    // 表盘类
    class Circle extends canvasObj {
      constructor () {
        super()
      }
      draw (ctx) {
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
      }
    }

    // 刻度类
    class Line extends canvasObj {
      constructor () {
        super()
        this.fill = false;
        this.start = [0,0];
        this.end = [5,5];
      }
      draw (ctx) {
        ctx.beginPath();
        ctx.moveTo.apply(ctx,this.start);
        ctx.lineTo.apply(ctx,this.end);
        ctx.closePath();
      };

    }

    // 表盘绘制
    const circle = new Circle();
		circle.ctx = ctx;
		circle.x = 100;
		circle.y = 100;
		circle.radius = 90;
		circle.fill = true;
		circle.borderWidth = 6;
    circle.fillColor = '#ffffff';
    
    // 刻度绘制
    let ls=[];
    let cache;
    for(let i=0;i<12;i++){
			cache = ls[i] = new Line();
			cache.ctx = ctx;
			cache.x = 100;
			cache.y = 100;
			cache.borderColor = "orange";
			cache.borderWidth = 2;
			cache.rotation = i * 30;
			cache.start = [0,-70];
			cache.end = [0,-80];
    }
    
    // 时针绘制
    const hour = new Line();
    hour.ctx = ctx;
    hour.x = 100;
    hour.y = 100;
    hour.borderColor = '#000';
    hour.borderWidth = 10;
    hour.rotation = 0;
    hour.start = [0,20];
    hour.end = [0, -50];

    // 分针绘制
    const minute = new Line();
    minute.ctx = ctx;
    minute.x = 100;
    minute.y = 100;
    minute.borderColor = "#999";
    minute.borderWidth = 7;
    minute.rotation = 0;
    minute.start = [0,20];
    minute.end = [0, -70]; 

    // 秒针绘制
    const seconds = new Line();
    seconds.ctx = ctx;
    seconds.x = 100;
    seconds.y = 100;
    seconds.borderColor = "#ff0000";
    seconds.borderWidth = 4;
    seconds.rotation = 0;
    seconds.start = [0,20];
    seconds.end = [0, -80]; 
    

    const center = new Circle();
		center.ctx = ctx;
		center.x = 100;
		center.y = 100;
		center.radius = 5;
		center.fill = true;
		center.borderColor = 'orange';

    setInterval(function(){
      // 清除画布
			ctx.clearRect(0,0,200,200);
			// 填充背景色
			ctx.fillStyle = 'orange';
			ctx.fillRect(0,0,200,200);
			// 表盘
      circle.update();
      // 绘制刻度表
      for(let i=0;cache=ls[i++];)cache.update();

      // 绘制时针
      hour.rotation = (new Date()).getHours() * 30;
      hour.update();
      
      // 绘制分针
      minute.rotation = (new Date()).getMinutes() * 6;
      minute.update();
      
      // 绘制秒针
      seconds.rotation = (new Date()).getSeconds() * 6;
      seconds.update();
      
      // 中心圆
			center.update();
		}, (1000 / 60) | 0);
  } else {
    alert('您的浏览器不支持canvas,请升级或更换当前浏览器')
  }
}