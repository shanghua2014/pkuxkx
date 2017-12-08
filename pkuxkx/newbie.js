var skills = ['force','dodge','sword','parry','strike','taiyi-shengong','taiyi-you','taiyi-jian','taiyi-zhang'];
function laohusile() {
	enableTriggerGroup('laohu', 0);
	enableTriggerGroup('job', 1);
	doAfterSpecial(1, '3n(knock gate)3n(ask you about 闯荡江湖)', 11);
}
function kill () {
	send('hp');
	send('w');
	send('wield all');
	doAfterSpecial(5, '(perform sword.bafang)', 11);
	doAfterSpecial(10, '(perform sword.bafang)', 11);
	doAfterSpecial(15, '(perform sword.bafang)', 11);
	doAfterSpecial(20, '(perform sword.bafang)', 11);
	doAfterSpecial(25, '(perform sword.bafang)', 11);
}
function shalaohu2() {
	var path = '';
	var sex = getVariable('sex');
	if (sex == 1 ) {
		path = 'e';
	} else {
		path = 'w';
	}
	doAfterSpecial(.5, path+'3s(open gate)3s(ne)', 11);
	doAfterSpecial(3, '(sw)s(climb down)', 11);
}
function shalaohu() {
	note('不要着急，先休息一下，再去杀老虎！！！');
	var path = '';
	var sex = getVariable('sex');
	if (sex == 1 ) {
		path = 'w';
	} else {
		path = 'e';
	}
	doAfterSpecial(10, path+'(sleep)', 11);
	enableTriggerGroup('laohu', 1);
	enableTriggerGroup('job', 0);
}
function lianjianBack () {
	var path = '';
	var sex = getVariable('sex');
	if (sex == 1 ) {
		path = 'e';
	} else {
		path = 'w';
	}
	doafterspecial(.5, path+'(ask you about 闯荡江湖)', 11);
	enableTriggerGroup('job', 1);
	enableTriggerGroup('lian', 0);
}
function lianjian () {
	var path = '';
	var sex = getVariable('sex');
	if (sex == 1 ) {
		path = 'w';
	} else {
		path = 'e';
	}
	enableTriggerGroup('job', 0);
	enableTriggerGroup('lian', 1);
	doAfterSpecial(5, 's'+path+'(lian sword 1)', 11);
}
function jifa () {
	enableTriggerGroup('job', 1);
	enableTriggerGroup('xx', 0);
	doAfterSpecial(1, 'jifa force '+skills[5], 0);
	doAfterSpecial(5, 'jifa dodge '+skills[6], 0);
	doAfterSpecial(10, 'jifa sword '+skills[7], 0);
	doAfterSpecial(15, 'jifa parry '+skills[8], 0);
	doAfterSpecial(20, 'jifa strike '+skills[8], 0);
}
function xuexi3 () {
	var i = parseInt(getVariable('i')) + 1;
	note('第【'+i+'】门功夫学完！');
	if ( i<=8 ) {
		setVariable('i', i);
	} else {
		setVariable('i', 0);
	}
	doAfterSpecial(1, 'xue wushi for '+ skills[i] +' 1', 0);
}
function xuexi4 () {
	var path = '';
	var sex = getVariable('sex');
	if (sex == 1 ) {
		path = 'e';
	} else {
		path = 'w';
	}
	var i = getVariable('i');
	doAfterSpecial(1, path+'n(xue wushi for '+ skills[i] +' 1)', 11)
}
function xuexi2 () {
	var i = getVariable('i');
	doAfterSpecial(1, 'xue wushi for '+ skills[i] +' 1', 0);
}
function xuexi () {
	enableTriggerGroup('job', 0);
	enableTriggerGroup('xx', 1);
	setVariable('i', 0);
	doAfterSpecial(1, 'xue wushi for force 1', 0);
}
function sleep3 () {
	var path = '';
	var sex = getVariable('sex');
	if (sex == 1 ) {
		path = 'w';
	} else {
		path = 'e';
	}
	doAfterSpecial(.2, 's'+path+'(sleep)', 11);
	
}
function sleep2 () {
	var path = '';
	var sex = getVariable('sex');
	if (sex == 1 ) {
		path = 'w';
	} else {
		path = 'e';
	}
	doAfterSpecial(.3, 's'+path+'(sleep)', 11);
}
function sleepBack1 () {
	var path = '';
	var sex = getVariable('sex');
	if (sex == 1 ) {
		path = 'e';
	} else {
		path = 'w';
	}
	doAfterSpecial(.5, path+'(ask you about 闯荡江湖)', 11);
}
function sleep1 () {
	var path = '';
	var sex = getVariable('sex');
	if (sex == 1 ) {
		path = 'w';
	} else {
		path = 'e';
	}
	doAfterSpecial(.5, 's'+path+'(sleep)' , 11);
}
function xizaoOk () {
	var path = '';
	var sex = getVariable('sex');
	if (sex == 1 ) {
		path = 'e';
	} else {
		path = 'w';
	}
	doAfterSpecial(.5, '(wear all)(s)('+path+')(ask you about 闯荡江湖)', 11);
}
function zhuangman () {
	doAfterSpecial(.5, '10(drink hulu)', 11);
	doAfterSpecial(1.5, '(get ye guo)', 11);
}
function paotui () {
	doAfterSpecial(1, '3s(open gate)', 11);
	doAfterSpecial(1.3, '2se', 11);
	doAfterSpecial(1.8, '(buy shi he)', 11);
}
function maishihe() {
	doAfterSpecial(1, 'ws(se)(buy jitui)', 11);
	doAfterSpecial(2, '(put jitui in shi he)', 11);
	
}
function maishaodaozi() {
	doAfterSpecial(.5, '(nw)3n(knock gate)4n', 11);
	doAfterSpecial(1, '(give shaodaozi to wushi)', 11);
	doAfterSpecial(2, '(give jian to wushi)', 11);
}
function start () {
	enableTriggerGroup('job', 1);
	enableTriggerGroup('xx', 0);
	enableTriggerGroup('laohu', 0);
	enableTriggerGroup('lian', 0);
	send('quest');
}
function getSex (sex) {
	note(sex);
	if (sex == '男') {
		setVariable('sex', 1)
	} else {
		setVariable('sex', 0)
	}
}