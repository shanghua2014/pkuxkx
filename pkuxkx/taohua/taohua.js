

/*---------------- [打坐] -----------------*/
var dz = {
	sleep : function ( i ) {
		// 醒来
		if (i == 0) { EnableTimer('sleepT', true); DoAfterSpecial(.5, 'dazuo 10', 10); }
		// 睡觉
		if (i == 1) { EnableTimer('sleepT', false); send('sleep'); }
	},
	sleepDelay : function () {
		note('睡多了，等会吧。');
		DoAfterSpecial(30, 'dazuo 10', 10);
	}
}
note('====== 所有触发已关闭，请启动相关任务！');


//--------------------------------------------
//| 公共方法
//--------------------------------------------

/**
 * 
 * @param {object} t 添加定时器
 * 	t.name 定时器名称
 * 	t.time 倒计时：秒
 * 	t.cmd 发送的命令
 * 	t.where 发送的对象 [12:脚本]
 * 	t.once 是否只触发一次，默认：是
 */
function timer (t) {
	Addtimer(t.name, 1, 0, 0, "", 5, "");
	SetTimerOption(t.name, "hour", 0);
	SetTimerOption(t.name, "minute", 0);
	SetTimerOption(t.name, "second", t.time);
	SetTimerOption(t.name, "send_to", t.where);
	SetTimerOption(t.name, "send", t.cmd);
	SetTimerOption(t.name, "one_shot", t.once);
}
/**
 * 
 * @param {string} path 反转路径
 */
function reversePath ( path, object ) {
	var rpath = '';
	path = path.split(' ');
	for (var i = 0; i < path.length; i++) {
		if(path[i]) {
			if (/nu/.test(path[i])) {
				rpath += path[i].replace(/nu/, 'sd') + ' ';
			} else if (/nd/.test(path[i])) {
				rpath += path[i].replace(/nd/, 'su') + ' ';
			} else if (/ne/.test(path[i])) {
				rpath += path[i].replace(/ne/, 'sw') + ' ';
			} else if (/nw/.test(path[i])) {
				rpath += path[i].replace(/nw/, 'se') + ' ';
			} else if (/su/.test(path[i])) {
				rpath += path[i].replace(/su/, 'nd') + ' ';
			} else if (/sd/.test(path[i])) {
				rpath += path[i].replace(/sd/, 'nu') + ' ';
			} else if (/se/.test(path[i])) {
				rpath += path[i].replace(/se/, 'nw') + ' ';
			} else if (/sw/.test(path[i])) {
				rpath += path[i].replace(/sw/, 'ne') + ' ';
			} else if (/ed/.test(path[i])) {
				rpath += path[i].replace(/ed/, 'wu') + ' ';
			} else if (/eu/.test(path[i])) {
				rpath += path[i].replace(/eu/, 'wd') + ' ';
			} else if (/wu/.test(path[i])) {
				rpath += path[i].replace(/wu/, 'ed') + ' ';
			} else if (/wd/.test(path[i])) {
				rpath += path[i].replace(/wd/, 'eu') + ' ';
			} else if (/e/.test(path[i])) {
				rpath += path[i].replace(/e/, 'w') + ' ';
			} else if (/w/.test(path[i])) {
				rpath += path[i].replace(/w/, 'e') + ' ';
			} else if (/s/.test(path[i])) {
				rpath += path[i].replace(/s/, 'n') + ' ';
			} else if (/n/.test(path[i])) {
				rpath += path[i].replace(/n/, 's') + ' ';
			} else if (/out/.test(path[i])) {
				rpath += path[i].replace(/out/, 'enter') + ' ';
			} else if (/enter/.test(path[i])) {
				rpath += path[i].replace(/enter/, 'out') + ' ';
			} else if (/u/.test(path[i])) {
				rpath += path[i].replace(/u/, 'd') + ' ';
			} else {
				rpath += path[i].replace(/d/, 'u') + ' ';
			}
		}
	}
	object.loading = true;
	return rpath;
}