// var str = '2n e 3(sd) 3(nu) w (nd) (eu) (wd) (nu) (wu) (ed) 2(nd) (nu) (sd) (wd) (nd) (wd) (nd) (nw) n';
// 巡山路径
SetVariable('path', '');
// n(nw)(nd)(wd)(nd)(wd)(sd)(nu) 2(nd)(ed)(wu)(nu)(wd)(eu)(nd) w 3(nu) 3(sd) e 2n

// 走过的路径
SetVariable('patrolOver', 'n(nw)(nd)(wd)(nd)(wd)(sd)(nu) 2(nd)(ed)(wu)(nu)(wd)(eu)(nd) w 3(nu) 3(sd) e 2n');
var	sx = {
	loading:false,
	pathBack : '',
	go : function () {
		var path = GetVariable('path');
		var patrolOver = GetVariable('patrolOver');
		var currentIndex = 0;
		if (patrolOver) {
			if (!path) {
				send('say 巡逻完毕-路径转换中.....');
				this.pathBack = reversePath(GetVariable('patrolOver'));
				if (this.loading) {
					send('say 路径已就绪-开始回家.....');
					note('走');
					note(this.pathBack);
				}
				return;
			}
			note(path);
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
	sx.loading = true;
	return rpath;
}