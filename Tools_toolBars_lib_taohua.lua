BUTTONS_PAD_BUTTONS_COLS=4
----��ť���������ã����֡��������Զ����㣩
BUTTONS_PAD_BUTTONS_TYPE='vertical'
----��ť�Ĳ��÷�ʽ��vertical �� horizontal����ֱ��ˮƽ��
Buttons_Tab = {}
  Buttons_Tab[1] = {}
    Buttons_Tab[1].Caption = "����"
    Buttons_Tab[1].Type = 1
    Buttons_Tab[1].Click_CMD = "yun recover"
  Buttons_Tab[2] = {}
    Buttons_Tab[2].Caption = "�˾�"
    Buttons_Tab[2].Type = 1
    Buttons_Tab[2].Click_CMD = "yun regenerate"
  Buttons_Tab[3] = {}
    Buttons_Tab[3].Caption = "����"
    Buttons_Tab[3].Type = 1
    Buttons_Tab[3].Click_CMD = "#EnableTriggerGroup('snow', 0);"
  Buttons_Tab[4] = {}
    Buttons_Tab[4].Caption = "��-�ﻨ  "
    Buttons_Tab[4].Type = 1
    Buttons_Tab[4].Click_CMD = "perform sword.xiaohua"
  Buttons_Tab[5] = {}
    Buttons_Tab[5].Caption = " ��-�̺�"
    Buttons_Tab[5].Type = 1
    Buttons_Tab[5].Click_CMD = "perform sword.zouxiao\r\
            "
  Buttons_Tab[6] = {}
    Buttons_Tab[6].Caption = "��ѩ"
    Buttons_Tab[6].Type = 1
    Buttons_Tab[6].Click_CMD = "#EnableTriggerGroup('snow', 1);"
  Buttons_Tab[7] = {}
    Buttons_Tab[7].Caption = "����"
    Buttons_Tab[7].Type = 1
    Buttons_Tab[7].Click_CMD = "yun heal"
  Buttons_Tab[8] = {}
    Buttons_Tab[8].Caption = "�־�"
    Buttons_Tab[8].Type = 1
    Buttons_Tab[8].Click_CMD = "yun inspire"