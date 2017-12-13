
// Ѳɽ·��
SetVariable('path', 'n n e (sd) (sd) (sd) (nu) (nu) (nu) w (nd) (eu) (wd) (nu) (wu) (ed) (nd) (nd) (nu) (sd) (wd) (nd) (wd) (nd) (nw) n');

// �߹���·��
var	xs = {
	loading:false,
	pathBack : '',
	delay:1,	// ���߼��ʱ��
	init : function () {
		Send('set brief 2');
		EnableTriggerGroup('xs', 1);
		EnableTriggerGroup('xsover', 0);	// Ѳ�߽�����ץȡ ����ɺ������������
		note('Ѳɽ��ʼ��');
		SetVariable('currentHouse', '');
		SetVariable('houseList', '');
		SetVariable('patrolOver', '');
	},
	end : function () {
		Send('set brief 0');
		EnableTriggerGroup('xs', 0);
		EnableTriggerGroup('xsover', 1);
	},
	// Ѱɽ
	go : function ( init ) {
		if (init) this.init();
		var path = GetVariable('path');
		var patrolOver = GetVariable('patrolOver');
		var currentIndex = 0;
		if (patrolOver) {
			if (!path) {
				this.end();
				note('Ѳ�����-·��ת����.....');
				this.pathBack = reversePath(GetVariable('patrolOver'));
				if (this.loading) {
					note('say ·���Ѿ���-��ʼ�ؼ�.....');
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
	// ��¼����
	getHouse : function ( houseName ) {
		var houseList = GetVariable('houseList');
		if (houseList.indexOf(houseName) <= -1 || houseList.substr(0, 6) == '��ɽС·|��') {
			houseList = houseName + '|' + houseList;
			SetVariable('currentHouse', houseName);	//��ǰ����
			SetVariable('houseList', houseList); //�߹��ķ���
			note('û��')
		} else {
			this.go();
			note('����')
		}
		note('��Ѳ�ߣ�'+houseList);
		return houseList;
	},
	// busy����
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
 * @param {object} t ��Ӷ�ʱ��
 * 	t.name ��ʱ������
 * 	t.time ����ʱ����
 * 	t.cmd ���͵�����
 * 	t.where ���͵Ķ��� [12:�ű�]
 * 	t.once �Ƿ�ֻ����һ�Σ�Ĭ�ϣ���
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
 * @param {string} path ��ת·��
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