// 星宿拜师请安顺序：李秋水，丁春秋，摘星子，狮吼子，天狼子，出尘子
// 天赋：30 15 20 15

var team = ['sb','xx','tn','du','bai'];
function _switch (name) {
	for(var i in team) {
		if (team[i] == name) 
			EnableTriggerGroup(team[i], 1);
		else
			EnableTriggerGroup(team[i], 0);
	}
}

// 1,未进新手洞，读书
function dushu (tim) {
	doAfterSpecial(tim, 'dushu', 10);
}

// 2,自动拜师
function qingan_b( i ) {
	var path = getVariable('qingan'+i+'_b');
	doAfterSpecial(.5, path, 11);
	doAfterSpecial(2, 'say '+i+'号目标请安完毕', 0);
	if (i == 6) {
		doAfterSpecial(5, 'bai a zi', 0);
		var ids = getVariable('qa_id');
		for (var i=1; i<= ids; i++) {
			deleteVariable('qingan'+i+'_b');
		}
	}
}
function qingan ( i ) {
	note(i)
	setVariable('qa_id', i);
	var path = '';
	switch (i) {
		case 1:
			path = '2n2w2n(qingan li qiushui)';
		break;
		case 2:
			path = '(sd/nu)(nd/su)2n(qingan ding chunqiu)';
		break;
		case 3:
			path = '(sd/nu)(nd/su)(qingan zhaixing zi)';
		break;
		case 4:
			path = '(sd/nu)(qingan shihou zi)';
		break;
		case 5:
			path = '(sd/nu)s(qingan tianlang zi)';
		break;
		case 6:
			path = 'n(qingan chuchen zi)';
		break;
	}
	setVariable('qingan'+i+'_b', ReverseSpeedwalk(path));
	doAfterSpecial(.5, path, 11);
}

// 3,进洞修行（命令：xxStart）：打坐、吐纳、学习
function tnStart () {
	_switch('tn');
	execute('tn');
}
function dzStart () {
	_switch('dz');
	execute('dz');
}
function xxStart () {
	_switch('xx');
	deleteVariable('xxWugong');
	deleteVariable('xxName');
	setVariable('xxWugong', 'force');
	setVariable('xxName', '基本内功');
	execute('xx');
}
function switchWG() {
	var wg = getVariable('xxName');
	switch (wg) {
		case '基本内功':
			setVariable('xxName', '化功大法');
			setVariable('xxWugong', 'huagong-dafa');
			break;
		case '化功大法':
			deleteVariable('xxWugong');
			deleteVariable('xxName');
			send ('say 学完了！！！！');
			EnableTriggerGroup('xx', 0);
			break;
	}
	send('sk');
	doAfterSpecial(2, 'xx', 10);
}
function skills (skName, lv) {
	var xxName = getVariable('xxName');
	setVariable(skName, lv);
	SetStatus ('['+xxName+']'+skName+"：lv" + lv);
}
function xx (xxName) {
	// 字符串类型：继续学习。数字类型：查看技能等级
	typeof xxName=='string' ? setVariable("xxName", xxName) : send('sk');	
	doAfterSpecial(.5, 'xx', 10);
}
function sleepBusy() {
	doAfterSpecial(30, getVariable('sleepState_b'), 11);
	doAfterSpecial(31, 'xx', 10);
	deleteVariable('sleepState_b');
	deleteVariable('xx');
}

// 4，新手任务（命令：jobStart）
function jobStart () {
	_switch('job');
	setVariable('isJob', 1);
	execute('l');
}
function findNpc (npc) {
	note(npc);
	var isJob = getVariable('isJob');
	if (isJob == 1) {
		// mapping(1)
		// note('路径绘制启动成功！')
		execute('job');
	} else {
		// note('路径绘制未启动成功！')
		execute('jmz');
	}
}
function tuishu () {
	SpeedWalkDelay = 500;
	var backPath = getVariable('shulin1_b');
	//EvaluateSpeedwalk(backPath, true);
	// 2s e s e (ne) e s (enter/out)

	// 山林 - 

 //    山林间雾气缭绕，似乎蕴有剧毒。
 //    「初夏」: 太阳正高挂在东方的天空中。

 //    这里明显的出口是 north、south、east 和 west。

}


/*---- [公共触发] ----*/
function wake () {
	var sleepState = getVariable('sleepState');
	switch (sleepState) {
		case 'xx':
			doAfterSpecial(.5, getVariable('sleepState_b'), 11);
			doAfterSpecial(.8, 'xx', 10);
			break;
		case 'dz':
			doAfterSpecial(.5, getVariable('sleepState_b'), 11);
			doAfterSpecial(.8, 'dazuo 10', 10);
			break;
		case 'sb':
			doAfterSpecial(.5, getVariable('sleepState_b'), 11);
			doAfterSpecial(.8, 'sb', 10);
			break;
		case 'tn':
			doAfterSpecial(1, 'tn', 10);
			break;
	}
	deleteVariable('sleepState_b');
	deleteVariable('sleepState');
}
function sleep ( sleepState ) {
	var cmd = '(enter/out)n(sleep)';
	switch ( sleepState ) {
		case 'xx':
			setVariable('sleepState', sleepState);
			break;
		case 'dz':
			setVariable('sleepState', sleepState);
			break;
		case 'sb':
			cmd = '(w)(n)(sleep)';
			setVariable('sleepState', sleepState);
			break;
		case 'tn':
			cmd = '(sleep)';
			setVariable('sleepState', sleepState);
			break;
	}
	setVariable('sleepState_b',ReverseSpeedwalk(cmd))
	doAfterSpecial(.5, cmd, 11);
}

function hp (exp, qn, max_neili,neili,jingli,max_jingli) {
	//#经验，潜能，最大内力，当前内力，最大精力，当前精力
	//#最大气血，有效气血，当前气血，最大精神，有效精神，当前精神
	setVariable('exp', exp);
	setVariable('qn', qn);
	SetStatus ("经验：" + exp+" 潜能：" + qn+' 内力：'+neili+'/'+max_neili+' 精力：'+jingli+'/'+max_jingli);
}