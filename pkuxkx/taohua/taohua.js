/**
 * 开始任务之前，要在先学1级literate，位置：扬州-书店-老夫子
 */


/*---------------- [新手任务：奇门盾甲] -----------------*/
var qm = {
	find:function (book_en) {
		SetVariable('book_en', book_en);
		DoAfterSpecial(1, 'duBook', 10);
	}
}
/*---------------- [新手任务：桃花阵] -----------------*/
var job = {
	guawei : '',
	position:[],
	i:0,
	lookTu: function ( guawei ) {
		this.guawei = guawei;
		SetVariable('guawei', guawei);
		EnableTriggerGroup('jianding', 0);
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
			DoAfterSpecial(1, '4e', 11);
			hps({
				n: '桃花阵',
				l: guawei,
				m: p1 + '---' + p2 + '---' + p3 + '---' + p4,
				m2: this.position
			});
		}
	},
	zouwei : function ( reset ) {
		if (reset == 0) {	// 走错位，重新走
			this.i = 0;
			send('hpbrief');
		}
		if (this.i > 3) this.i = 0;
		this.position = GetVariable('position').split(',');
		DoAfterSpecial(2, this.position[this.i], 10);
		this.i++;
	},
	busy : function () {
		note('bus处理...')
		this.position = GetVariable('position').split(',');
		if (this.i != 0) {this.i = parseInt(this.i)-1;}
		DoAfterSpecial(2, this.position[this.i], 10);
		this.i++;
	},
	back : function () {
		EnableTriggerGroup('guozhen', 0);
		note('到点出阵了！');
		send('leave');
		send('jiali 0');
		hps_del();
		DoAfterSpecial(3, '3w(ask lu about job)', 11);
	},
	kill : function ( npc ) {
		if (npc) {
			send('jiali max');
			send('l');
			SetVariable('zhen_npc_ch', npc);
		} else {
			var npc = GetVariable('zhen_npc_en');
			DoAfterSpecial(.5, "(kill "+npc+')', 11);
		}
	}
}
/*---------------- [新手任务：鉴定古玩] -----------------*/
var jianding = {
	jianding:function (object) {
		var name = '';
		switch (object) {
			case '字画':
				name='zihua'
				break;
			case '古玩':
				name='guwan'
				break;
		}
		DoAfterSpecial(1, 'jianding '+name, 10);
	},
	guwan: function (guwan ) {
		SetVariable('guwan', guwan);
		DoAfterSpecial(3, 'i', 10);
		hps({
			s: '鉴定完成',
			l: guwan
		});
	},
	over : function (f_name, l_name) {
		f_name = f_name.toLowerCase();
		var guwan = GetVariable('guwan');
		hps({
			l: guwan,
			n: '鉴定古玩',
			s: '鉴定完成',
			m2: f_name+l_name
		});
		if (l_name) {
			DoAfterSpecial(1, '2n2w(give '+f_name + l_name +' to lu)', 11);
		} else {
			DoAfterSpecial(1, '2n2w(give '+f_name +' to lu)', 11);
		}
	}
}

/*---------------- [任务切换] -----------------*/
var change = {
	// 检定任务
	job_jianding : function () {
		hps({
			n: '鉴定古玩',
			s: '鉴定中...'
		});
		EnableTriggerGroup('jianding', 1);
		EnableTriggerGroup('guozhen', 0);
		DoAfterSpecial(1, '2s(na)', 11);
	},
	// 打坐任务
	job_dz : function () {
		DoAfterSpecial(1, 'ne(dazuo 10)', 11);
		SetVariable('job_dz', 1);
		EnableTriggerGroup('qimen', 0);
		EnableTriggerGroup('dazuo', 1);
	}
}

/*---------------- [睡觉] -----------------*/
var base = {
	hpbrief:function(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12){
		var job_dz = GetVariable('job_dz');
		if (job_dz==1 && p3 >= 300) {
			EnableTriggerGroup('dazuo', 0);
			EnableTriggerGroup('qimen', 1);
			EnableTriggerGroup('guozhen', 1);
			DoAfterSpecial(1, 'ws(lujob)', 10);
		}
	},
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
EnableTriggerGroup('qimen', 0)
EnableTriggerGroup('lian', 0)
hps_del()

//--------------------------------------------
//| 公共方法
//--------------------------------------------
function hps (object) {
	SetVariable('Q_name', object.n);
	SetVariable('Q_location', object.l);
	SetVariable('Q_status', object.s);
	SetVariable('Q_misc', object.m);
	SetVariable('Q_misc2', object.m2);
}
function hps_del() {
	DeleteVariable('Q_name');
	DeleteVariable('Q_location');
	DeleteVariable('Q_status');
	DeleteVariable('Q_misc');
	DeleteVariable('Q_misc2');
}
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