var infoSize = {
	left : 260,
	top : 18,
	right : 70,
	bottom : 35,
	fontOffsetLeft : 15,
	fontOffsetTop : 15
}
var win = "info" + GetPluginID();
var result = {}	// 用来接收创建完成后的返回值，返回一个顶端的偏移量，为下次创建使用
WindowFont(win, "f2", "微软雅黑", 12, true, false, false, false, 1, 0); // 定义字体规格

//result = createHP(win);	 // 创建HP信息，并返回偏移量

//createFont(win, '结果：'+result.top, 180, result.top); // 这是一个偏移量测试，没用，可以删除

// createFont(win, '经验：123564856', infoSize.fontOffsetLeft, result.top);
// createFont(win, '潜能：123564856', infoSize.fontOffsetLeft, result.top+result.offset);

function createHP (win) {
	var res = { }
	var infoList = [
		'精神','精力','气血', '内力','食物','饮水',
		['经验','潜能']
	]

	
	// 创建背景
	WindowCreate (win, 0, 0, 300, 40*infoList.length, 12, 0, ColourNameToRGB("#333333"));

	// 动态绘制
	var offset = infoSize.bottom - infoSize.top + 10	// 矩形绘制偏移量
	for (var i=0; i<infoList.length; i++) {
		if(typeof infoList[i] == 'string') {
			createArc(
				win, 
				infoSize.left, 
				infoSize.top + offset * i, 
				infoSize.right, 
				infoSize.bottom + offset * i, 
				'#009000'
			);
			createFont(win, infoList[i]+'：', infoSize.fontOffsetLeft, infoSize.fontOffsetTop+offset*i);
		} else {
			for (var j=0; j<infoList[i].length; j++) {
			createFont(win, infoList[i][j]+'：', infoSize.fontOffsetLeft, infoSize.fontOffsetTop+offset*(i+j));
			}
		}
		res.top = infoSize.top + offset * (i+1);
		res.offset = offset;
		res.i = i+1;
	}
	
	WindowShow (win,  true);
	return res;
}
function createArc (win, left, top, right, bottom, color) {
	WindowRectOp (win, 2, left, top, right, bottom, ColourNameToRGB(color), 1);
	WindowRectOp (win, 1, right, top, 260, bottom, ColourNameToRGB("#cccccc"), 1);
}
function createFont (win, ft, fontOffsetLeft, fontOffsetTop) {
	WindowText(win, "f2", ft, fontOffsetLeft, fontOffsetTop, 0, 0, ColourNameToRGB ("#ffffff"), false);
}