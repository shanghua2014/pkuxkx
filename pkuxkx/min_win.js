var infoSize = {
	left : 260,
	top : 18,
	right : 70,
	bottom : 35,
	fontOffsetLeft : 15,
	fontOffsetTop : 15
}
var win = "info" + GetPluginID();
var result = {}	// �������մ�����ɺ�ķ���ֵ������һ�����˵�ƫ������Ϊ�´δ���ʹ��
WindowFont(win, "f2", "΢���ź�", 12, true, false, false, false, 1, 0); // ����������

//result = createHP(win);	 // ����HP��Ϣ��������ƫ����

//createFont(win, '�����'+result.top, 180, result.top); // ����һ��ƫ�������ԣ�û�ã�����ɾ��

// createFont(win, '���飺123564856', infoSize.fontOffsetLeft, result.top);
// createFont(win, 'Ǳ�ܣ�123564856', infoSize.fontOffsetLeft, result.top+result.offset);

function createHP (win) {
	var res = { }
	var infoList = [
		'����','����','��Ѫ', '����','ʳ��','��ˮ',
		['����','Ǳ��']
	]

	
	// ��������
	WindowCreate (win, 0, 0, 300, 40*infoList.length, 12, 0, ColourNameToRGB("#333333"));

	// ��̬����
	var offset = infoSize.bottom - infoSize.top + 10	// ���λ���ƫ����
	for (var i=0; i<infoList.length; i++) {
		if(typeof infoList[i] == 'string') {
			createArc(
				win, 
				infoSize.left, 
				infoSize.top + offset * i, 
				infoSize.right, 
				infoSize.bottom + offset * i, 
				'#009000'
			);
			createFont(win, infoList[i]+'��', infoSize.fontOffsetLeft, infoSize.fontOffsetTop+offset*i);
		} else {
			for (var j=0; j<infoList[i].length; j++) {
			createFont(win, infoList[i][j]+'��', infoSize.fontOffsetLeft, infoSize.fontOffsetTop+offset*(i+j));
			}
		}
		res.top = infoSize.top + offset * (i+1);
		res.offset = offset;
		res.i = i+1;
	}
	
	WindowShow (win,  true);
	return res;
}
function createArc (win, left, top, right, bottom, color) {
	WindowRectOp (win, 2, left, top, right, bottom, ColourNameToRGB(color), 1);
	WindowRectOp (win, 1, right, top, 260, bottom, ColourNameToRGB("#cccccc"), 1);
}
function createFont (win, ft, fontOffsetLeft, fontOffsetTop) {
	WindowText(win, "f2", ft, fontOffsetLeft, fontOffsetTop, 0, 0, ColourNameToRGB ("#ffffff"), false);
}