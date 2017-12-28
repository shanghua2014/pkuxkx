// ���ް�ʦ�밲˳������ˮ�������ժ���ӣ�ʨ���ӣ������ӣ�������
// �츳��30 15 20 15

var team = ['sb','xx','tn','du','bai'];
function _switch (name) {
	for(var i in team) {
		if (team[i] == name) 
			EnableTriggerGroup(team[i], 1);
		else
			EnableTriggerGroup(team[i], 0);
	}
}

// 1,δ�����ֶ�������
function dushu (tim) {
	doAfterSpecial(tim, 'dushu', 10);
}

// 2,�Զ���ʦ
function qingan_b( i ) {
	var path = getVariable('qingan'+i+'_b');
	doAfterSpecial(.5, path, 11);
	doAfterSpecial(2, 'say '+i+'��Ŀ���밲���', 0);
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

// 3,�������У����xxStart�������������ɡ�ѧϰ
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
	setVariable('xxName', '�����ڹ�');
	execute('xx');
}
function switchWG() {
	var wg = getVariable('xxName');
	switch (wg) {
		case '�����ڹ�':
			setVariable('xxName', '������');
			setVariable('xxWugong', 'huagong-dafa');
			break;
		case '������':
			deleteVariable('xxWugong');
			deleteVariable('xxName');
			send ('say ѧ���ˣ�������');
			EnableTriggerGroup('xx', 0);
			break;
	}
	send('sk');
	doAfterSpecial(2, 'xx', 10);
}
function skills (skName, lv) {
	var xxName = getVariable('xxName');
	setVariable(skName, lv);
	SetStatus ('['+xxName+']'+skName+"��lv" + lv);
}
function xx (xxName) {
	// �ַ������ͣ�����ѧϰ���������ͣ��鿴���ܵȼ�
	typeof xxName=='string' ? setVariable("xxName", xxName) : send('sk');	
	doAfterSpecial(.5, 'xx', 10);
}
function sleepBusy() {
	doAfterSpecial(30, getVariable('sleepState_b'), 11);
	doAfterSpecial(31, 'xx', 10);
	deleteVariable('sleepState_b');
	deleteVariable('xx');
}

// 4�������������jobStart��
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
		// note('·�����������ɹ���')
		execute('job');
	} else {
		// note('·������δ�����ɹ���')
		execute('jmz');
	}
}
function tuishu () {
	SpeedWalkDelay = 500;
	var backPath = getVariable('shulin1_b');
	//EvaluateSpeedwalk(backPath, true);
	// 2s e s e (ne) e s (enter/out)

	// ɽ�� - 

 //    ɽ�ּ��������ƣ��ƺ����о綾��
 //    �����ġ�: ̫�����߹��ڶ���������С�

 //    �������Եĳ����� north��south��east �� west��

}


/*---- [��������] ----*/
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
	//#���飬Ǳ�ܣ������������ǰ���������������ǰ����
	//#�����Ѫ����Ч��Ѫ����ǰ��Ѫ���������Ч���񣬵�ǰ����
	setVariable('exp', exp);
	setVariable('qn', qn);
	SetStatus ("���飺" + exp+" Ǳ�ܣ�" + qn+' ������'+neili+'/'+max_neili+' ������'+jingli+'/'+max_jingli);
}