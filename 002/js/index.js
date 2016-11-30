;(function ($) {
	$.fn.extend({
		"tabify":function (options) {
			//检测用户传进来的参数是否合法
			if (!isValid) {
				return this;
			}
			//覆盖插件默认参数
			var opts = $.extend({},defaluts,options);
			//return 为了支持链式调用 this 是 jQuery对象
			return this.each(function () {
				var self = $(this);
				//创建tabnav 并补全标签
				var strDom = "";
				$(this).children().each(function () {
					strDom += '<li><a href="#'+$(this).attr("id")+'">'+$(this).attr("title")+'</a></li>';		
				});
				this.tabNav = $('<ul class="tab-nav">');
				this.tabNav.html(strDom);
				$(this).prepend(this.tabNav);

				//初始化样式
				$(this).find("#tab1").addClass("active");
				var aa = $(this).find(".tab-nav li").eq(0).addClass("active");

				//点击nav变化
				$(this).find(".tab-nav li a").click(function() {
					var sid = $(this).attr("href");
					$(this).parent().siblings().removeClass("active").end()
						.addClass("active");
					var aa = $(this).parent().parent().siblings().removeClass("active").end()
						.parent().find(sid).addClass("active");
				});
					
			});
		}
	});
	var defaluts = {

	};
	function isValid(options) {
		return !options || (options && options === "object") ? true : false;
	};
})(window.jQuery);