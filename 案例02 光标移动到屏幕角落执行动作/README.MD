光标移动到屏幕角落执行任务

添加到**全局动作-启动/退出**

关显示屏
`sp.WindowFromHandle(new IntPtr(0xffff)).PostMessageObj(0x112, 0xf170, 2);`

任务窗口
`sp.SendModifiedVKeys([vk.LWIN], [vk.TAB]);`

隐藏其他窗口
`sp.SendModifiedVKeys([vk.LWIN], [vk.HOME]);`
