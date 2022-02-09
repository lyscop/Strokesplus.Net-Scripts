分享一些接触到的手势脚本，一些简单案例，一些基础设置

有些功能是其他软件或者手势工具上的，部分来自官方论坛作者Rob分享的

已发 [卡饭](https://bbs.kafan.cn/thread-2208325-1-1.html) [小众论坛](https://meta.appinn.net/t/topic/29815)

软件官网：https://www.strokesplus.net

**第一部分成品**

1 大写键监控、自动6s关闭大写<br>
2 截图显示屏幕（调用win10截图快捷键） |（手势框选区域）<br>
3 截图OCR（调用win10截图快捷键 百度OCR api）<br>
4 截图保存桌面（调用win10截图快捷键）<br>
5 桌面提示中英文输入法状态（搜狗）<br>
<img src="https://i.imgur.com/FZyVXJJ.png" width="450"><br>
6 设置当前输入法为中文或者英文（搜狗）<br>
&nbsp;&nbsp;需要在启动/退出 中添加5中第一部分代码在启动/退出<br>
7 解压缩到当前文件夹（7Zip）<br>
&nbsp;&nbsp;分别解压缩包内单文件、单文件夹、多文件文件夹、批量解压缩，需要含密码情况留言<br>
8 压缩选中文件、文件夹（7Zip）<br>
&nbsp;&nbsp;分别压缩选中单文件、单文件夹、多文件文件夹<br>
9 鼠标穿屏<br>
&nbsp;&nbsp;鼠标在屏幕上下左右边界穿过到另一侧，如果使用多个屏幕需要调整代码<br>
10 划词翻译<br>
&nbsp;&nbsp;划词后，中文Google翻译，英文句子Google翻译，英文单词有道翻译，结果保存剪切板，同时显示在鼠标处<br>
&nbsp;&nbsp;自动6秒关闭结果显示，鼠标点击和滚动关闭显示需要在鼠标事件中设置<br>
&nbsp; &nbsp;&nbsp;<img src="https://i.vgy.me/DsEJ0V.gif" width="380"><br>
11 选中图片上传返回链接（ShareX）<br>
&nbsp; &nbsp;&nbsp;自带图床有（Imgur、vgy等），自定义上传图床（Imgbb无法外链大图)，可添加工作流上传后Google搜索<br>
12 选中图片打开编辑（ShareX）<br>
&nbsp; &nbsp;&nbsp;使用命令行，跳过弹出点击选择窗口<br>
13 Alt+拖动窗口<br>
14 搜索选中文字或打开链接<br>
15 固定鼠标在屏幕的当前点<br>
16 屏幕取色<br>
17 当前窗口信息<br>
18 选中图片转化base64<br>
19 选中图片预览<br>
<img src="https://i.vgy.me/Vdflkm.png" width="450"><br>

**第二部分案例**

1 任意窗口搜索输入内容<br>
&nbsp; &nbsp;&nbsp;类似于 Power Toys 或者 Listary<br>
<img src="https://i.vgy.me/WuyoE8.png" width="450"><br>
2 光标移动到屏幕角落执行动作
&nbsp; &nbsp;&nbsp;鼠标停留在角落执行动作，鼠标移出再移入，取消执行动作<br>
3 监控设备接入<br>
4 监控程序启动/退出<br>
5 全局手势中指定不同程序<br>
6 指定软件设置快捷键<br>
7 定时执行动作/启动程序<br>
8 手势作用在浏览器特定的页面<br>
9 双击鼠标左键/右键/中键<br>
10 双击Ctrl/Alt<br>
11 请求HTTPS<br>
12 全局变量<br>
&nbsp; &nbsp;&nbsp;Vision0.5.5.4更新了 Saved Values，保存设置文件中，退出S+net，变量清除<br>
13 桌面/文件夹所有文件数文件名、文件文件夹数量、选中桌面/文件夹文件<br>
14 内置函数信息<br>
15 桌面显示倒计时<br>
16 调整窗口尺寸位置<br>
17 忽略软件/区域、全屏禁用手势<br>
18 更换触发鼠标键<br>
19 屏幕边缘滚动调节亮度、声音、浏览器标签页切换、程序切换<br>
20 窗口、图片放大缩小<br>
21 最小化到托盘、最小化指定窗口到托盘（指定窗口设置老板键）<br>
22 窗口透明<br>
23 窗口置前、置顶<br>
24 手势对应热键识别窗口<br>
25 当前时间格式<br>

**第三部分设置**

1 统计手势次数<br>
2 应用程序定义<br>
3 切换语言
