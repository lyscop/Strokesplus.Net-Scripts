划词翻译 v0.2

划词后，中文Google翻译，英文句子Google翻译，英文单词有道翻译，结果保存剪切板，同时显示在鼠标处

自动6秒关闭结果显示，鼠标点击和滚动关闭显示需要在鼠标事件中设置

当前长句中英、英中翻译结果换行是根据长度截取，效果不好，暂时没有更好的显示办法

### 第一部分<br>
划词翻译New.js

添加到动作

### 第二部分<br>
append.js

添加到**全局动作-启动/退出**

**重要：如果已经添加过DisplayTextInfo计时器，直接复制添加** if(sp.GetStoredBool("Trans")) { 和} **之间的代码**（即开始结束之间）


左键点击关闭

添加到**鼠标事件-左键单击** `sp.DeleteStoredString('strTrans');`

鼠标滚轮关闭

添加到**鼠标事件-鼠标滚轮**最下方else里面`sp.DeleteStoredString('strTrans');`
