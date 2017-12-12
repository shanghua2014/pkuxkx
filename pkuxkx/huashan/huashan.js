
// 巡山路径
SetVariable('path', 'nne(sd)(sd)(sd)(nu)(nu)(nu)w(nd)(eu)(wd)(nu)(wu)(ed)(nd)(nd)(nu)(sd)(wd)(nd)(wd)(nd)(nw)n');

// 走过的路径
var	xs = {
	loading:false,
	pathBack : '',
	init : function () {
		EnableTriggerGroup('house', 1);
		note('巡山开始！');
		SetVariable('currentHouse', '');
		SetVariable('houseList', '');
		SetVariable('patrolOver', '');
	},
	end : function () {
		EnableTriggerGroup('house', 0);
	},
	// 寻山开始
	go : function () {
		this.init();
		var path = GetVariable('path');
		var patrolOver = GetVariable('patrolOver');
		var currentIndex = 0;
		if (patrolOver) {
			if (!path) {
				this.end();
				send('say 巡逻完毕-路径转换中.....');
				this.pathBack = reversePath(GetVariable('patrolOver'));
				if (this.loading) {
					send('say 路径已就绪-开始回家.....');
					note('走');
					DoAfterSpecial(2, this.pathBack, 11);
				}
				return;
			}
			path = path.split(',');
			note(path[0]);
			DoAfterSpecial(.5, path[0], 11);
			patrolOver = path.splice(0, 1) + ' ' + patrolOver;
		} else {
			path = path.split(' ');
			DoAfterSpecial(.5, path[0], 11);
			patrolOver = path.splice(0, 1);
			note('--'+patrolOver);
		}
		SetVariable('path', path);
		SetVariable('patrolOver', patrolOver);
	},
	// 记录房间
	getHouse : function ( houseName ) {
		var houseList = GetVariable('houseList');
		note(houseName);
		if (houseList.indexOf(houseName)<=-1) {
			note(houseList.indexOf(houseName))
			houseList = houseName + '|' + houseList;
			SetVariable('currentHouse', houseName);	//当前房间
			SetVariable('houseList', houseList); //走过的房间
			note('没走')
		} else {
			this.go();
			note('走了')
		}
		note(houseList);
		return houseList;
	}
};

/**
 * 
 * @param {string} path 反转路径
 */
function reversePath ( path ) {
	var rpath = '';
	path = path.split(' ');
	for (var i = path.length; i>=0; i--) {
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

/**
 * 
 * @param {string} path 要用node命令
 */
function analysePath(path) {
	var bbb = '';
	path = path.split(' ');
	for (var i in path) {
		for (var j in path[i]) {
			if (parseInt(path[i][j]) % 10 == path[i][j]) {
				for (var k = 0; k < path[i][j]; k++) {
					bbb += path[i].substr(1)
				}
				break;
			} else {
				bbb += path[i][j];
			}
		}
	}
	console.log(bbb)
}