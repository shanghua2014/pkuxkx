


/*---------------- [新手任务] -----------------*/
var job = {
	guawei : '',
	position:[],
	i:0,
	lookTu: function ( guawei ) {
		this.guawei = guawei;
		EnableTriggerGroup('guozhen', 1);
		DoAfterSpecial(1, 'look tu', 10);
	},
	zhenCN: function (guawei, p1, p2, p3, p4) {
		this.position = [];
		if (guawei == this.guawei){
			this.position.push(reversePathCN(p1));
			this.position.push(reversePathCN(p2));
			this.position.push(reversePathCN(p3));
			this.position.push(reversePathCN(p4));
			SetVariable('position', this.position);
			SetStatus('位置：' + p1 + '------' + p2 + '------' + p3 + '------' + p4 + ':::' + this.position);
			DoAfterSpecial(1, '4e', 11);
		}
	},
	zouwei : function ( reset ) {
		if (reset == 0) {	// 走错位，重新走
			this.i = 0;
			send('hpbrief');
		}
		if (this.i > 3) this.i = 0;
		this.position = GetVariable('position').split(',');
		note('走了一步：'+this.position[this.i]);
		DoAfterSpecial(2, this.position[this.i], 10);
		this.i++;
	},
	busy : function () {
		this.position = GetVariable('position').split(',');
		if (this.i != 0) --this.i;
		DoAfterSpecial(2, this.position[this.i], 10);
		this.i++;
	},
	back : function () {
		note('到点出阵了！');
		send('leave');
		send('jiali 0');
		DoAfterSpecial(1, '3w', 11);
		DoAfterSpecial(3, '(ask lu about job)', 11);
	},
	kill : function ( npc ) {
		if (npc) {
			send('jiali max');
			send('l');
			SetVariable('zhen_npc_ch', npc);
		} else {
			var npc = GetVariable('zhen_npc_en');
			note(npc);
			DoAfterSpecial(2, "(kill "+npc+')', 11);
		}
	}
}

/*---------------- [睡觉] -----------------*/
var base = {
	sleep:function (i, cmd) {
		// 醒来
		if (i == 0) { DoAfterSpecial(.5, cmd, 10); }
		// 睡觉
		if (i == 1) { send(cmd); send('hpbrief'); }
	},
	sleepDelay:function (time, cmd) {
		note('睡多了，等会吧。');
		DoAfterSpecial(time, cmd, 10);
	}
}
note('====== 所有触发已关闭，请启动相关任务！');
EnableTriggerGroup('dazuo', 0)
EnableTriggerGroup('tuna', 0)
EnableTriggerGroup('dushu', 0)
EnableTriggerGroup('lian', 0)
EnableTriggerGroup('guozhen', 0)
EnableTriggerGroup('ludu', 0)
EnableTriggerGroup('snow', 0)
EnableTriggerGroup('xuexi', 0)


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
function reversePathCN(path) {
	var p = '';
	switch (path) {
		case '东':
			p='e';
			break;
		case '西':
			p='w';
			break;
		case '南':
			p='s';
			break;
		case '北':
			p='n';
			break;
		case '东北':
			p='ne';
			break;
		case '西北':
			p='nw';
			break;
		case '东南':
			p='se';
			break;
		case '西南':
			p='sw';
			break;
	}
	return p;
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