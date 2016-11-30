$(function () {
	$(".miaoshu div").css("display","none");
	$(".c").click(function () {
		var self = $(this).index()/2;
		var newmiaoshu = $(this).parent().parent().find(".miaoshu").children().eq(self);
		newmiaoshu.toggle(500).siblings().fadeOut();
	});

	//初始化根据数字显示进度begin
	$(".allmiaoshu").each(function (i) {
		var bfb = $(this).find(".span").text();
		bfb = bfb*140/100;
		$(".img").children().eq(i*2+1).find("img").animate({width:bfb+"px"});
	});

	// 点击进度条调整进度_调整数字改变进度 begin
	$(".bfb").click(function (e) {
		var self = ($(this).index()-1)/2;
		var newmiaoshu = $(this).parent().parent().find(".miaoshu").children().eq(self);
		newmiaoshu.fadeIn().siblings().fadeOut();
	 	x=$(this).offset();
	 	var ep = e.pageX - x.left;
	 	$(this).find("img").animate({width:ep + "px"});
	 	var bfb = $(this).parent().parent().find(".miaoshu").children().eq(self).find(".span"),
	 		bfb_text = bfb.text();
	 		bfb_text = ep*100/140;
	 	bfb.text(parseInt(bfb_text));
	});
});