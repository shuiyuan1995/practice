;(function($){
	
	var Carousel = function (poster) {
		var self = this;

		//保存单个旋转对象
		this.poster = poster;
		this.posterItemMain = poster.find("ul.poster-list");
		this.nextBtn = poster.find("div.poster-next-btn");
		this.prevBtn = poster.find("div.poster-prev-btn");
		this.posterItems = poster.find("li.poster-item");
		if(this.posterItems.size()%2 == 0){
			this.posterItemMain.append(this.posterItems.eq(0).clone());
			this.posterItems = this.posterItemMain.children();
		};
		this.posterFirstItem = this.posterItems.eq(0);
		this.posterLastItem = this.posterItems.last();
		this.rotateFlag = true;

		//默认配置参数
		this.setting = {
			"width":1000,   	//幻灯片的宽度
			"height":270,		//幻灯片的高度
			"posterWidth":640,	//幻灯片第一帧的宽度
			"posterHeight":270,	//幻灯片第一帧的高度
			"scale":0.9,		//记录显示比例关系
			"speed":500,
			"autoPlay":false,
			"verticalAlign":"middle", //top buttom
			"delay":500
		};

		$.extend(this.setting,this.getSetting());

		//设置配置参数值
		this.setSettingValue();
		this.setPosterPos();

		this.nextBtn.click(function() {
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("left");
			};
		});
		this.prevBtn.click(function() {
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("right");
			};
		});
		//是否开启自动播放
		if(this.setting.autoPlay){
			this.autoplay();
			this.poster.hover(function () {
				window.clearInterval(self.timer);
			},function () {
				self.autoplay();
			})
		};

	};
	Carousel.prototype = {

		autoplay:function () {
			var self = this;
			this.timer = window.setInterval(function () {
				self.nextBtn.click();
			},this.setting.delay);
		},

		//旋转
		carouseRotate:function(dir) {
			var _this_ = this;
			var zIndexArr = [];
			if(dir === "left"){

				this.posterItems.each(function () {
					var self = $(this),
						prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
						width = prev.width(),
						height = prev.height(),
						zIndex = prev.css("zIndex"),
						opacity = prev.css("opacity"),
						left = prev.css("left"),
						top = prev.css("top");
						zIndexArr.push(zIndex);

						self.animate({
							width:width,
							height:height,
							//zIndex:zIndex,
							opacity:opacity,
							left:left,
							top:top
						},_this_.setting.speed,function () {
							_this_.rotateFlag = true;
						});
				});
				this.posterItems.each(function (i){
					$(this).css("zIndex",zIndexArr[i]);
				});

			}else if(dir === "right"){

				this.posterItems.each(function () {
					var self = $(this),
						next = self.next().get(0)?self.next():_this_.posterFirstItem,
						width = next.width(),
						height = next.height(),
						zIndex = next.css("zIndex"),
						opacity = next.css("opacity"),
						left = next.css("left"),
						top = next.css("top");
						zIndexArr.push(zIndex);

						self.animate({
							width:width,
							height:height,
							//zIndex:zIndex,
							opacity:opacity,
							left:left,
							top:top
						},_this_.setting.speed,function () {
							_this_.rotateFlag = true;
						});

				});
				this.posterItems.each(function (i){
					$(this).css("zIndex",zIndexArr[i]);
				});

			};
		},

		//设置剩余帧的位置关系
		setPosterPos:function () {
			var _self = this; 
			var sliceItems = this.posterItems.slice(1),
				sliceSize = sliceItems.size()/2,
				rightSlice = sliceItems.slice(0,sliceSize),
				leftSlice = sliceItems.slice(sliceSize),
				level = Math.floor(this.posterItems.size()/2);


			//设置右边帧的位置关系和宽度高度top
			var rw = this.setting.posterWidth,
				rh = this.setting.posterHeight,
				gap = ((this.setting.width-this.setting.posterWidth)/2)/level;
			var firstLest = (this.setting.width-this.setting.posterWidth)/2;
			var	fixOffsetLeft =firstLest +rw;

			rightSlice.each(function (i) {
				level--;
				rw = rw*_self.setting.scale;
				rh = rh*_self.setting.scale;
				fixOffsetLeft = fixOffsetLeft+gap;
				$(this).css({
				 	zIndex:level,
				 	width:rw,
				 	height:rh,
				 	opacity:1/(++i),
				 	left:fixOffsetLeft-rw,
				 	top:_self.setVertucalAlign(rh)
				 });
			});
			//设置左边帧的位置关系和宽度高度top
			var lw = rightSlice.last().width(),
				lh = rightSlice.last().height();
			var oloop = Math.floor(this.posterItems.size()/2);
			
			leftSlice.each(function (i) {
				
				$(this).css({
				 	zIndex:i,
				 	width:lw,
				 	height:lh,
				 	opacity:1/oloop,
				 	left:i*gap,
				 	top:_self.setVertucalAlign(lh)
				});
				oloop--;
				lw = lw/_self.setting.scale;
				lh = lh/_self.setting.scale;
			});

		},
		//设置垂直排列对齐
		setVertucalAlign:function (height) {
			var verticalTYpe = this.setting.verticalAlign,
				top = 0;
			if(verticalTYpe === "middle"){
				top = (this.setting.height-height)/2;
			} else if(verticalTYpe === "top"){
				top = 0;
			} else if(verticalTYpe === "bottom"){
				top = this.setting.height-height;
			} else {
				top = (this.setting.height-height)/2;
			};
			return top;
		},
		//设置配置参数值去控制基本的宽度高度。。。
		setSettingValue:function () {
			this.poster.css({
				width:this.setting.width,
				height:this.setting.height
			});
			this.posterItemMain.css({
				width:this.setting.width,
				height:this.setting.height
			});
			//计算上下按钮宽度
			var w = (this.setting.width-this.setting.posterWidth)/2;
			this.nextBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			});
			this.prevBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			});
			this.posterFirstItem.css({
				width:this.setting.posterWidth,
				height:this.setting.posterHeight,
				left:w,
				zIndex:Math.floor(this.posterItems.size()/2)
			})
		},

		//获取人工配置参数
		getSetting:function(){
			var setting = this.poster.attr("data-setting");
			if(setting&&setting != ""){
				return $.parseJSON(setting);
			} else {
				return {};
			};
		}
	};
	Carousel.init = function (posters) {
		var _this_ = this;
		posters.each(function() {
			new _this_($(this));
		});
	};

	window["Carousel"] = Carousel;
	
})(jQuery);