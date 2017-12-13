
// 巡山路径
SetVariable('path', 'n n e (sd) (sd) (sd) (nu) (nu) (nu) w (nd) (eu) (wd) (nu) (wu) (ed) (nd) (nd) (nu) (sd) (wd) (nd) (wd) (nd) (nw) n');

// 走过的路径
var	xs = {
	loading:false,
	pathBack : '',
	delay:1,	// 行走间隔时间
	init : function () {
		Send('set brief 2');
		EnableTriggerGroup('xs', 1);
		EnableTriggerGroup('xsover', 0);	// 巡逻结束，抓取 岳灵珊，继续接任务
		note('巡山开始！');
		SetVariable('currentHouse', '');
		SetVariable('houseList', '');
		SetVariable('patrolOver', '');
	},
	end : function () {
		Send('set brief 0');
		EnableTriggerGroup('xs', 0);
		EnableTriggerGroup('xsover', 1);
	},
	// 寻山
	go : function ( init ) {
		if (init) this.init();
		var path = GetVariable('path');
		var patrolOver = GetVariable('patrolOver');
		var currentIndex = 0;
		if (patrolOver) {
			if (!path) {
				this.end();
				note('巡逻完毕-路径转换中.....');
				this.pathBack = reversePath(GetVariable('patrolOver'));
				if (this.loading) {
					note('say 路径已就绪-开始回家.....');
					note(this.pathBack);
					DoAfterSpecial(2, this.pathBack, 11);
				}
				return;
			}
			path = path.split(',');
			DoAfterSpecial(this.delay, path[0], 11);
			patrolOver = path.splice(0, 1) + ' ' + patrolOver;
		} else {
			path = path.split(' ');
			DoAfterSpecial(this.delay, path[0], 11);
			patrolOver = path.splice(0, 1);
			note('--'+patrolOver);
		}
		SetVariable('path', path);
		SetVariable('patrolOver', patrolOver);
	},
	// 记录房间
	getHouse : function ( houseName ) {
		var houseList = GetVariable('houseList');
		if (houseList.indexOf(houseName) <= -1 || houseList.substr(0, 6) == '后山小路|玉') {
			houseList = houseName + '|' + houseList;
			SetVariable('currentHouse', houseName);	//当前房间
			SetVariable('houseList', houseList); //走过的房间
			note('没走')
		} else {
			this.go();
			note('走了')
		}
		note('已巡逻：'+houseList);
		return houseList;
	},
	// busy处理
	busy : function () {
		var path = GetVariable('path');
		var patrolOver = GetVariable('patrolOver');
		var tmp = '';
		tmp = patrolOver.split(' ');
		path = tmp[0] + ' ' + path;
		tmp.splice(0, 1);
		patrolOver = tmp;
		SetVariable('path', path);
		SetVariable('patrolOver', patrolOver);
		timer({name:'busyTimer', time:3, cmd:'xs.test2()', where:12});
	}
};

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
function reversePath ( path ) {
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
	xs.loading = true;
	return rpath;
}