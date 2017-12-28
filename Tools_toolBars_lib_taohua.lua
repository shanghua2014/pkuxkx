BUTTONS_PAD_BUTTONS_COLS=4
----按钮的列数设置：数字。（行数自动计算）
BUTTONS_PAD_BUTTONS_TYPE='vertical'
----按钮的布置方式：vertical 和 horizontal，垂直和水平；
Buttons_Tab = {}
  Buttons_Tab[1] = {}
    Buttons_Tab[1].Caption = "运气"
    Buttons_Tab[1].Type = 1
    Buttons_Tab[1].Click_CMD = "yun recover"
  Buttons_Tab[2] = {}
    Buttons_Tab[2].Caption = "运精"
    Buttons_Tab[2].Type = 1
    Buttons_Tab[2].Click_CMD = "yun regenerate"
  Buttons_Tab[3] = {}
    Buttons_Tab[3].Caption = "撤阵"
    Buttons_Tab[3].Type = 1
    Buttons_Tab[3].Click_CMD = "#EnableTriggerGroup('snow', 0);"
  Buttons_Tab[4] = {}
    Buttons_Tab[4].Caption = "剑-箫花  "
    Buttons_Tab[4].Type = 1
    Buttons_Tab[4].Click_CMD = "perform sword.xiaohua"
  Buttons_Tab[5] = {}
    Buttons_Tab[5].Caption = " 剑-碧海"
    Buttons_Tab[5].Type = 1
    Buttons_Tab[5].Click_CMD = "perform sword.zouxiao\r\
            "
  Buttons_Tab[6] = {}
    Buttons_Tab[6].Caption = "踩雪"
    Buttons_Tab[6].Type = 1
    Buttons_Tab[6].Click_CMD = "#EnableTriggerGroup('snow', 1);"
  Buttons_Tab[7] = {}
    Buttons_Tab[7].Caption = "恢气"
    Buttons_Tab[7].Type = 1
    Buttons_Tab[7].Click_CMD = "yun heal"
  Buttons_Tab[8] = {}
    Buttons_Tab[8].Caption = "恢精"
    Buttons_Tab[8].Type = 1
    Buttons_Tab[8].Click_CMD = "yun inspire"