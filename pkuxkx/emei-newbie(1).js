/**
���򾲺�ʦ̫�����йء�help������Ϣ��
����ʦ̫˵��������ս����ɣ���ʵ����һ���Ծ���Ϊ��������ȥ��������η�(nianjing)�����������ɡ���

ͨ����ε�Ĭ��𾭣�������Լ��Ķ���д������ˡ�

*/

// �
function nianjing (area) {
	setVariable('area_ch', area);
	switch (area) {
		case '������':
			_go('s');
			break;
		case 'ǧ���ִ��':
			_go('2s');
			break;
		case '�����':
			_go('3s');
			break;
		case '��¬��':
			_go('4s');
			break;
		case 'ǧ���ִ���':
			_go('4s(sd)');
			break;
		case '������':
			_go(getAliasInfo('em_hd_qyg', 2));
			break;
		case '������':
			_go('4s(sd)(ed)(eu)');
			break;
		case '��ˮ��':
			_go('4s2(sd)(ed)(sd)');
			break;
		case 'ɽ�ŵ�':
			_go('4s(sd)(ed)3(sd)');
			break;
		case 'ɽ��':
			_go('4s(sd)(ed)4(sd)');
			break;
		case '��Ů��':
			_go('4s(sd)(ed)4(sd)(wd)');
			break;
		case 'ʯ��':
			_go('4s(sd)(ed)4(sd)(wd)(sd)');
			break;
		case '������':
			_go('4s(sd)(ed)4(sd)(wd)2(sd)');
			break;
	}
}

// �����
function nianjingBack() {
	var backPath;
	var area_ch = getVariable('area_ch');
	switch (area_ch) {
		case 'ǧ���ִ��':
			_back(getVariable('backPath'));
			break;
	}
}


//---------- ˽�з��������ᱻmush����
function _go (dir) {
	note(dir);
	doAfterSpecial(.5, dir+'(nianjing)', 11);
	setVariable('backPath', ReverseSpeedwalk(dir));
}
function _back ( backPath ) {
	doAfterSpecial(.8, backPath, 11);
	doAfterSpecial(1.5, 'ask jinghe about finish', 11);
}

function test() {
	doAfterSpecial(.1, "5n5s", 11);
}