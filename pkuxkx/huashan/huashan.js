

/*---------------- [ָ��] -----------------*/
var zd = {
	zd_pathBack:'',
	delay:1.5,
	zd:'zhidian student',
	loading:false,
	init : function () {
		SetVariable('zd_path', 'w s n w w e s n e n n n e (sd) (sd) (sd) (nu) (nu) (nu) w (nd) (eu) (wd) (wu) (ed) (nu) (wu) (ed) (nd) (nd) (nu) (sd) (wd) (nd) (wd) (nd) (nw) w e n');
		SetVariable('is_find', 0);
		EnableTriggerGroup('zd_find', 1);
		EnableTriggerGroup('zd', 0);
		public_init();
		note('������ʼ���ɹ���Ѱ�ҿ�ʼ��');
	},
	// ׼����
	ready:function (npcName) {
		EnableTriggerGroup('zd_find', 0);
		EnableTriggerGroup('zd', 1);
		SetVariable('npcName', npcName);
		DoAfterSpecial(.5, '3e', 11);
		DoAfterSpecial(this.delay, this.zd, 0);
	},
	// ָ����
	start : function () {
		DoAfterSpecial(this.delay, this.zd, 0);
	},
	// Ѱ�ҵ�����
	find: function (init) {
		if (init) { this.init(); note('���ˣ�ȥ׷');}
		note('������');
		var zd_path = GetVariable('zd_path');
		var is_find = GetVariable('is_find');
		var patrolOver = GetVariable('patrolOver');
		
		if (is_find == 0) {
			if (patrolOver) {
				zd_path = zd_path.split(',');
				DoAfterSpecial(this.delay, zd_path[0], 11);
				patrolOver = zd_path.splice(0, 1) + ' ' + patrolOver;
			} else {
				zd_path = zd_path.split(' ');
				DoAfterSpecial(this.delay, zd_path[0], 11);
				patrolOver = zd_path.splice(0, 1);
				note('===>::' + patrolOver);
			}
			SetVariable('zd_path', zd_path);
			SetVariable('patrolOver', patrolOver);
		} else {
			note('�ҵ���-·��ת����.....');
			this.zd_pathBack =  reversePath(GetVariable('patrolOver'), this);
			if (this.loading) {
				note('·���Ѿ���-׼��ѱ��.....');
				DoAfterSpecial(this.delay, 'ask student about gen', 0);
				note(this.zd_pathBack);
			}
			return;
		}
	},
	// ��¼����
	getHouse: function () {
		DoAfterSpecial(.3, 'zd.find()', 12);
	},
	// ���ص�����
	back: function () {
		EnableTriggerGroup('zd_find', 0);
		EnableTriggerGroup('zd', 1);
		DoAfterSpecial(1, '3', 2);
		DoAfterSpecial(2, '2', 2);
		DoAfterSpecial(3, '1', 2);
		DoAfterSpecial(4, '�߰�', 2);
		DoAfterSpecial(5, this.zd_pathBack+' (zhidian student)', 11);
	},
	// ָ��������
	over:function () {
		DoAfterSpecial(1, '3e (ask ning about ���)', 11);
	},
	zdBusy:function () {
		note('Busy����...');
		timer({ name: 'busyTimer', time: 2, cmd: 'zd.start()', where: 12 });
	},
	// �ر�����ָ��������ش���
	close : function () {
		EnableTriggerGroup('zd', 0);
		EnableTriggerGroup('zd_find', 0);
	}
}


/*---------------- [Ѳɽ] -----------------*/ 
// �߹���·��
var xs = {
	loading: false,
	xs_pathBack: '',
	delay: 1,	// ���߼��ʱ��
	init: function () {
		SetVariable('xs_path', 'n n e (sd) (sd) (sd) (nu) (nu) (nu) w (nd) (eu) (wd) (nu) (wu) (ed) (nd) (nd) (nu) (sd) (wd) (nd) (wd) (nd) (nw) n');
		Send('set brief 2');
		EnableTriggerGroup('xs', 1);
		EnableTriggerGroup('xs_job', 0);
		public_init();
		SetVariable('currentHouse', '');
		SetVariable('houseList', '');
		note('������ʼ���ɹ���Ѳɽ��ʼ��');
	},
	end: function () {
		EnableTriggerGroup('xs_job', 1);
		EnableTriggerGroup('xs', 0);
		Send('set brief 0');
	},
	// Ѱɽ
	go: function (init) {
		if (init) this.init();
		var xs_path = GetVariable('xs_path');
		var patrolOver = GetVariable('patrolOver');
		if (patrolOver) {
			if (!xs_path) {
				this.end();
				note('Ѳ�����-·��ת����.....');
				this.xs_pathBack =  reversePath(GetVariable('patrolOver'), this);
				if (this.loading) {
					note('say ·���Ѿ���-��ʼ�ؼ�.....');
					note(this.xs_pathBack);
					DoAfterSpecial(2, this.xs_pathBack, 11);
				}
				return;
			}
			xs_path = xs_path.split(',');
			DoAfterSpecial(this.delay, xs_path[0], 11);
			patrolOver = xs_path.splice(0, 1) + ' ' + patrolOver;
		} else {
			xs_path = xs_path.split(' ');
			DoAfterSpecial(this.delay, xs_path[0], 11);
			patrolOver = xs_path.splice(0, 1);
			note('--' + patrolOver);
		}
		SetVariable('xs_path', xs_path);
		SetVariable('patrolOver', patrolOver);
	},
	// ��¼����
	getHouse: function (houseName) {
		var houseList = GetVariable('houseList');
		if (houseList.indexOf(houseName) <= -1 || houseList.substr(0, 6) == '��ɽС·|��') {
			note('û��');
			houseList = houseName + '|' + houseList;
			SetVariable('currentHouse', houseName);	//��ǰ����
			SetVariable('houseList', houseList); //�߹��ķ���
		} else {
			this.go();
		}
		// note('��Ѳ�ߣ�'+houseList);
		return houseList;
	},
	/**
	 * busy����
	 * ˼·����ԭ��һ��·����Ȼ����Ӷ�ʱ���������������
	 */
	busy: function () {
		note('Busy����...');
		var xs_path = GetVariable('xs_path');
		var patrolOver = GetVariable('patrolOver');
		var tmp = '';
		tmp = patrolOver.split(' ');
		xs_path = tmp[0] + ',' + xs_path;
		tmp.splice(0, 1);
		patrolOver = '';
		for (var i in tmp) {
			if (tmp[i]) {
				patrolOver += tmp[i] + ' ';
			}
		}
		SetVariable('xs_path', xs_path);
		SetVariable('patrolOver', patrolOver);
		timer({ name: 'busyTimer', time: 3, cmd: 'xs.go()', where: 12 });
	},
	// �ر�����Ѳɽ������ش���
	close: function () {
		EnableTriggerGroup('xs_job', 0);
		EnableTriggerGroup('xs', 0);
	}
};

// ���ؽű�ʱ���ر��������񴥷�
xs.close();
// zd.close();
note('====== ���д����ѹرգ��������������');
note('====== ע�⣺');
note('====== 1���뽫username�������ó����������');


//--------------------------------------------
//| ��������
//--------------------------------------------
function public_init () {
	// ��ʼ�����ñ���
	Send('set brief 2');
	SetVariable('patrolOver', '');
}
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