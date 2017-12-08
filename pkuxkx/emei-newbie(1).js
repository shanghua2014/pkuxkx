/**
你向静和师太打听有关『help』的消息。
静和师太说道：「你刚进我派，其实我派一切以静修为主，你且去清音阁念段佛经(nianjing)，静下心来吧。」

通过这段的默念佛经，你觉得自己的读书写字提高了。

*/

// 念经
function nianjing (area) {
	setVariable('area_ch', area);
	switch (area) {
		case '接引殿':
			_go('s');
			break;
		case '千佛庵大殿':
			_go('2s');
			break;
		case '文殊殿':
			_go('3s');
			break;
		case '毗卢殿':
			_go('4s');
			break;
		case '千佛庵大门':
			_go('4s(sd)');
			break;
		case '清音阁':
			_go(getAliasInfo('em_hd_qyg', 2));
			break;
		case '万年庵':
			_go('4s(sd)(ed)(eu)');
			break;
		case '神水阁':
			_go('4s2(sd)(ed)(sd)');
			break;
		case '山门殿':
			_go('4s(sd)(ed)3(sd)');
			break;
		case '山门':
			_go('4s(sd)(ed)4(sd)');
			break;
		case '玉女池':
			_go('4s(sd)(ed)4(sd)(wd)');
			break;
		case '石坊':
			_go('4s(sd)(ed)4(sd)(wd)(sd)');
			break;
		case '解脱桥':
			_go('4s(sd)(ed)4(sd)(wd)2(sd)');
			break;
	}
}

// 念经返回
function nianjingBack() {
	var backPath;
	var area_ch = getVariable('area_ch');
	switch (area_ch) {
		case '千佛庵大殿':
			_back(getVariable('backPath'));
			break;
	}
}


//---------- 私有方法，不会被mush调用
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