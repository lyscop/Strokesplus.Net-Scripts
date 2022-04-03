sp.Sleep(400);
sp.SendModifiedVKeys([vk.LCONTROL], [vk.VK_C]);
sp.Sleep(100);
var text = clip.GetText();
var currpt = sp.GetCurrentMousePoint();

var r={
    "wd":0,//中英文字数
    "nwd":0,//英数词数
    "nb":0,//数字词数
    "c":0,//字符数
    "cb":0,//非空格字符
    "r":0,//回车
    "en":0,//英文字母数
    "cn":0,//中文字数
    "bl":0//非回车空格
};
var words = text.match(/\w+([’\']\w+)?/g)||[];//含撇号（如I'm）的单词视为一个词
var cnwords = text.match(/[\u4e00-\u9fa5]/g)||[];//统一中文字范围
r.nwd = words.length;
r.cn = cnwords.length;

var httpHandler = new HttpClientHandler();
httpHandler.AutomaticDecompression = host.flags(DecompressionMethods.GZip, DecompressionMethods.Deflate);
var client = new HttpClient(httpHandler);

var response;
var result;
var strTrans = '';

if(r.cn > 0) {
    client.BaseAddress = new Uri("https://translate.googleapis.com/translate_a/");
    response = client.GetAsync("single?client=gtx&sl=zh-CN&tl=en&dt=t&q=" + clip.GetText()).Result;
    result = response.Content.ReadAsStringAsync().Result;

    strTrans = result.split('\"')[1].split('\"')[0];
    clip.SetText(strTrans);
} else if(r.nwd > 1) {
    client.BaseAddress = new Uri("https://translate.googleapis.com/translate_a/");
    response = client.GetAsync("single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=" + clip.GetText()).Result;
    result = response.Content.ReadAsStringAsync().Result;

    strTrans = result.split('\"')[1].split('\"')[0];
    
    clip.SetText(strTrans);
} else if(r.nwd = 1) {
    client.BaseAddress = new Uri("https://dict.youdao.com/");
    response = client.GetAsync("jsonapi?xmlVersion=5.1&jsonversion=2&q=" + clip.GetText()).Result;
    result = response.Content.ReadAsStringAsync().Result;

    var arr = result.split('{"i":["')
    for(i = 1; i < arr.length; i++) {
        if(i < arr.length -1) {
            if(arr[i].split('"]}}]}')[0].length < 25) {
                strTrans = strTrans + arr[i].split('"]}}]}')[0].slice(0, 25) + '\r\n';
            } else if(arr[i].split('"]}}]}')[0].length > 25 && arr[i].split('"]}}]}')[0].length < 50) {
                strTrans = strTrans + arr[i].split('"]}}]}')[0].slice(0, 25) + '\r\n' +
                                        arr[i].split('"]}}]}')[0].slice(25, 50) + '\r\n';
            } else if(arr[i].split('"]}}]}')[0].length > 50 && arr[i].split('"]}}]}')[0].length < 75) {
                strTrans = strTrans + arr[i].split('"]}}]}')[0].slice(0, 25) + '\r\n' +
                                        arr[i].split('"]}}]}')[0].slice(25, 50) + '\r\n' +
                                        arr[i].split('"]}}]}')[0].slice(50, 75) + '\r\n';
            } else if(arr[i].split('"]}}]}')[0].length > 75) {
                strTrans = strTrans + arr[i].split('"]}}]}')[0].slice(0, 25) + '\r\n' +
                                        arr[i].split('"]}}]}')[0].slice(25, 50) + '\r\n' +
                                        arr[i].split('"]}}]}')[0].slice(50, 75) + '\r\n' +
                                        arr[i].split('"]}}]}')[0].slice(75, 100) + '\r\n';
            }
        } else {
            //strTrans = strTrans + arr[i].split('"]}}]}')[0];
            if(arr[i].split('"]}}]}')[0].length < 25) {
                strTrans = strTrans + arr[i].split('"]}}]}')[0].slice(0, 25) + '\r\n';
            } else if(arr[i].split('"]}}]}')[0].length > 25 && arr[i].split('"]}}]}')[0].length < 50) {
                strTrans = strTrans + arr[i].split('"]}}]}')[0].slice(0, 25) + '\r\n' +
                                        arr[i].split('"]}}]}')[0].slice(25, 50) + '\r\n';
            } else if(arr[i].split('"]}}]}')[0].length > 50 && arr[i].split('"]}}]}')[0].length < 75) {
                strTrans = strTrans + arr[i].split('"]}}]}')[0].slice(0, 25) + '\r\n' +
                                        arr[i].split('"]}}]}')[0].slice(25, 50) + '\r\n' +
                                        arr[i].split('"]}}]}')[0].slice(50, 75) + '\r\n';
            } else if(arr[i].split('"]}}]}')[0].length > 75) {
                strTrans = strTrans + arr[i].split('"]}}]}')[0].slice(0, 25) + '\r\n' +
                                        arr[i].split('"]}}]}')[0].slice(25, 50) + '\r\n' +
                                        arr[i].split('"]}}]}')[0].slice(50, 75) + '\r\n' +
                                        arr[i].split('"]}}]}')[0].slice(75, 100) + '\r\n';
            }
        }
    }
}

if(strTrans != null) {

    var info = new DisplayTextInfo();
    info.Opacity = 0.8;
    info.Padding = 5;   
    info.MessageAlignment = 'Left';
    info.MessageFont = new Font("Segoe UI Semibold", 8);
    info.Location = (currpt.X + 10) + ',' + (currpt.Y + 35); //鼠标位置
    info.BackColor = "245,245,245"; 
    info.ForeColor = 'black';
    info.Duration = 3000;
    info.Message = strTrans.trim();
    info.UsePrimaryScreen = true; 
    sp.DisplayText(info);
}
httpHandler.Dispose();
client.Dispose();
