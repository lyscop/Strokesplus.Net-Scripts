分享一些接触到的手势脚本，一些简单案例，一些基础设置

有些成品功能是其他软件或者手势工具上的，部分案例来自官方论坛作者Rob分享的

考虑以后把分享的所有脚本打包在配置文件再分享

软件官网：https://www.strokesplus.net/

脚本已分享在 [卡饭](https://bbs.kafan.cn/thread-2208325-1-1.html) [小众论坛](https://meta.appinn.net/t/topic/29815)（手势图）

暂时没有S+net的群，可加旧版S+的群204647334

**第一部分成品**

01 自动6s关闭大写 <a href="https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%88%90%E5%93%8101%20%E8%87%AA%E5%8A%A86s%E5%85%B3%E9%97%AD%E5%A4%A7%E5%86%99" target="_blank">直达</a><br>
02 截图显示屏幕（调用win10截图快捷键）  |（手势框选区域）[直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%88%90%E5%93%8102%20%E6%88%AA%E5%9B%BE%E6%98%BE%E7%A4%BA%E5%B1%8F%E5%B9%95) 待更新<br>
03 截图OCR（调用win10截图快捷键 百度OCR api）[直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%88%90%E5%93%8103%20%E6%88%AA%E5%9B%BEOCR)<br>
04 截图保存桌面（调用win10截图快捷键）[直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%88%90%E5%93%8104%20%E6%88%AA%E5%9B%BE%E4%BF%9D%E5%AD%98%E6%A1%8C%E9%9D%A2)<br>
05 桌面提示中英文输入法状态（搜狗） / 大写提示[直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%88%90%E5%93%8105%20%E6%A1%8C%E9%9D%A2%E6%8F%90%E7%A4%BA%E4%B8%AD%E8%8B%B1%E6%96%87%E8%BE%93%E5%85%A5%E6%B3%95%E7%8A%B6%E6%80%81%EF%BC%88%E6%90%9C%E7%8B%97%EF%BC%89%20%E5%A4%A7%E5%86%99%E6%8F%90%E7%A4%BA)<br>
<img src="https://i.imgur.com/FZyVXJJ.png" width="450"><br>
06 设置当前输入法为中文或者英文（搜狗）[直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%88%90%E5%93%8106%20%E8%AE%BE%E7%BD%AE%E5%BD%93%E5%89%8D%E8%BE%93%E5%85%A5%E6%B3%95%E4%B8%BA%E4%B8%AD%E6%96%87%E6%88%96%E8%80%85%E8%8B%B1%E6%96%87%EF%BC%88%E6%90%9C%E7%8B%97%EF%BC%89)<br>
&nbsp;&nbsp;&nbsp;需要在启动/退出 中添加5中第一部分代码在启动/退出<br>
07 解压缩到当前文件夹（7Zip）[直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%88%90%E5%93%8107%20%E8%A7%A3%E5%8E%8B%E7%BC%A9%E5%88%B0%E5%BD%93%E5%89%8D%E6%96%87%E4%BB%B6%E5%A4%B9%EF%BC%887Zip%EF%BC%89)<br>
&nbsp;&nbsp;&nbsp;分别解压缩包内单文件、单文件夹、多文件文件夹、批量解压缩，需要含密码情况留言<br>
08 压缩选中文件、文件夹（7Zip）[直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%88%90%E5%93%8108%20%E5%8E%8B%E7%BC%A9%E9%80%89%E4%B8%AD%E6%96%87%E4%BB%B6%E3%80%81%E6%96%87%E4%BB%B6%E5%A4%B9%EF%BC%887Zip%EF%BC%89)<br>
&nbsp;&nbsp;&nbsp;分别压缩选中单文件、单文件夹、多文件文件夹<br>
09 鼠标穿屏 [直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%88%90%E5%93%8109%20%E9%BC%A0%E6%A0%87%E7%A9%BF%E5%B1%8F)<br>
&nbsp;&nbsp;&nbsp;鼠标在屏幕上下左右边界穿过到另一侧，如果使用多个屏幕需要调整代码<br>
10 划词翻译 v0.2 [直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%88%90%E5%93%8110%20%E5%88%92%E8%AF%8D%E7%BF%BB%E8%AF%91)<br>
&nbsp;&nbsp;&nbsp;划词后，中文Google翻译，英文句子Google翻译，英文单词有道翻译，结果保存剪切板，同时显示在鼠标处<br>
&nbsp;&nbsp;&nbsp;自动6秒关闭结果显示，鼠标点击和滚动关闭显示需要在鼠标事件中设置<br>
&nbsp; &nbsp;&nbsp;<img src="https://i.vgy.me/DsEJ0V.gif" width="380"><br>
11 选中图片上传返回链接（ShareX）<br>
&nbsp; &nbsp;&nbsp;自带图床有（Imgur、vgy等），自定义上传图床（Imgbb无法外链大图)，可添加工作流上传后Google搜索<br>
12 选中图片打开编辑（ShareX）<br>
&nbsp;&nbsp;&nbsp;&nbsp;使用命令行，跳过弹出点击选择窗口<br>
13 Alt+拖动窗口<br>
14 搜索选中文字或打开链接<br>
15 固定鼠标在屏幕的当前点<br>
16 屏幕取色<br>
17 当前窗口信息<br>
18 选中图片转化base64<br>
19 选中图片预览 [直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%88%90%E5%93%8119%20%E9%80%89%E4%B8%AD%E5%9B%BE%E7%89%87%E9%A2%84%E8%A7%88)<br>
<img src="https://i.vgy.me/Vdflkm.png" width="450"><br>
20 右键执行中键<br>
&nbsp;&nbsp;&nbsp;&nbsp;点右键关闭浏览器标签页，打开书签栏书签，支持Chrome，Edge，Firefox，按Ctrl+右键正常显示菜单，不过还是手势关闭比较方便<br>
21 WEBP互转JPG、PNG<br>
22 窗口透明（鼠标可点击）<br>
23. 桌面显示倒计时<br>
&nbsp;&nbsp;&nbsp;输入结束时间，倒计时显示桌面，结束后发出嘀声<br>
&nbsp;&nbsp;&nbsp;时间格式为年, 月, 日, 时, 分(可选), 秒(可选) 或者 年-月-日-时-分(可选)-秒(可选)<br>
<img src='https://i.vgy.me/kJOUiC.gif' width="450"><br>
               
**第二部分案例**

01 任意窗口搜索输入内容 [直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%A1%88%E4%BE%8B01%20%E4%BB%BB%E6%84%8F%E7%AA%97%E5%8F%A3%E6%90%9C%E7%B4%A2%E8%BE%93%E5%85%A5%E5%86%85%E5%AE%B9)<br>
&nbsp;&nbsp;&nbsp;&nbsp;类似于 Power Toys 或者 Listary<br>
<img src="https://i.vgy.me/WuyoE8.png" width="450"><br>
02 光标移动到屏幕角落执行动作 [直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%A1%88%E4%BE%8B02%20%E5%85%89%E6%A0%87%E7%A7%BB%E5%8A%A8%E5%88%B0%E5%B1%8F%E5%B9%95%E8%A7%92%E8%90%BD%E6%89%A7%E8%A1%8C%E5%8A%A8%E4%BD%9C)<br>
&nbsp; &nbsp;&nbsp;鼠标停留在角落执行动作，鼠标移出再移入，取消执行动作<br>
03 屏幕边缘滚动调节亮度、声音、浏览器标签页切换、程序切换 [直达](https://github.com/lyscop/Strokesplus.Net-Scripts/tree/main/%E6%A1%88%E4%BE%8B03%20%E5%B1%8F%E5%B9%95%E8%BE%B9%E7%BC%98%E6%BB%9A%E5%8A%A8%E8%B0%83%E8%8A%82%E4%BA%AE%E5%BA%A6%E3%80%81%E5%A3%B0%E9%9F%B3%E3%80%81%E6%B5%8F%E8%A7%88%E5%99%A8%E6%A0%87%E7%AD%BE%E9%A1%B5%E5%88%87%E6%8D%A2%E3%80%81%E7%A8%8B%E5%BA%8F%E5%88%87%E6%8D%A2)<br>
04 最小化到托盘、最小化指定窗口到托盘（指定窗口设置老板键）<br>
05 定时执行动作/启动程序<br>
06 监控设备接入<br>
07 监控程序启动/退出<br>
08 全局手势中指定不同程序<br>
09 指定软件设置快捷键<br> 
10 手势作用在浏览器特定的页面<br>
11 双击鼠标左键/右键/中键<br>
12 双击Ctrl/Alt<br>
13 请求HTTPS<br>
14 当前时间格式<br>
15 桌面/文件夹所有文件数文件名、文件文件夹数量、选中桌面/文件夹文件<br>
16 内置函数信息<br>
17 调整窗口尺寸位置<br>
18 忽略软件/区域、全屏禁用手势<br>
19 更换触发鼠标键<br> 
20 窗口、图片放大缩小<br>
21 窗口置前、置顶<br>
22 手势对应热键识别窗口<br>

**第三部分设置**

01 统计手势次数<br>
02 应用程序定义<br>
03 切换语言
