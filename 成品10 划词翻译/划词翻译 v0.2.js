sp.Sleep(400);
sp.SendModifiedVKeys([vk.LCONTROL], [vk.VK_C]);
sp.Sleep(100);
var text = clip.GetText();
text = text.replace('\r\n', '');
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
var json;

if(r.cn > 0) {
    client.BaseAddress = new Uri("https://translate.googleapis.com/translate_a/");
    response = client.GetAsync("single?client=gtx&sl=zh-CN&tl=en&dt=t&q=" + text).Result;
    result = response.Content.ReadAsStringAsync().Result;
    json = JSON.parse(result);
    for (var i = 0; i < json[0].length; i++) {
        strTrans += json[0][i][0];
    }

    clip.SetText(strTrans);
    strTrans = strTrans.replace(/(\S+\s*){1,10}/g, "$&\n").trim();
} else if(r.nwd > 1) {
    client.BaseAddress = new Uri("https://translate.googleapis.com/translate_a/");
    response = client.GetAsync("single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=" + text).Result;
    result = response.Content.ReadAsStringAsync().Result;
    json = JSON.parse(result);
    for (var i = 0; i < json[0].length; i++) {
        strTrans += json[0][i][0];
    }
    clip.SetText(strTrans);
    if(strTrans.length < 25) {
        strTrans = strTrans;
    } else if(strTrans.length > 25 && strTrans.length <= 50) {
        strTrans = strTrans.slice(0, 25) + '\r\n' +
                                strTrans.slice(25, 50);
    } else if(strTrans.length > 50 && strTrans.length <= 75) {
        strTrans = strTrans.slice(0, 25) + '\r\n' +
                                strTrans.slice(25, 50) + '\r\n' +
                                strTrans.slice(50, 75);
    } else if(strTrans.length > 75 && strTrans.length <= 100) {
        strTrans = strTrans.slice(0, 25) + '\r\n' +
                                strTrans.slice(25, 50) + '\r\n' +
                                strTrans.slice(50, 75) + '\r\n' +
                                strTrans.slice(75, 100);
    } else if(strTrans.length > 100 && strTrans.length <= 125) {
        strTrans = strTrans.slice(0, 25) + '\r\n' +
                                strTrans.slice(25, 50) + '\r\n' +
                                strTrans.slice(50, 75) + '\r\n' +
                                strTrans.slice(75, 100) + '\r\n' +
                                strTrans.slice(100, 125);
    } else if(strTrans.length > 125 && strTrans.length <= 150) {
        strTrans = strTrans.slice(0, 25) + '\r\n' +
                                strTrans.slice(25, 50) + '\r\n' +
                                strTrans.slice(50, 75) + '\r\n' +
                                strTrans.slice(75, 100) + '\r\n' +
                                strTrans.slice(100, 125) + '\r\n' +
                                strTrans.slice(125, 150);
    } else if(strTrans.length > 150) {
        strTrans = strTrans.slice(0, 25) + '\r\n' +
                                strTrans.slice(25, 50) + '\r\n' +
                                strTrans.slice(50, 75) + '\r\n' +
                                strTrans.slice(75, 100) + '\r\n' +
                                strTrans.slice(100, 125) + '\r\n' +
                                strTrans.slice(125, 150) + '\r\n' +
                                strTrans.slice(150, 175);
    }


} else if(r.nwd = 1) {
    client.BaseAddress = new Uri("https://dict.youdao.com/");
    response = client.GetAsync("jsonapi?xmlVersion=5.1&jsonversion=2&q=" + text).Result;
    result = response.Content.ReadAsStringAsync().Result;
    json = JSON.parse(result);

    var arr = json.ec.word[0].trs
    for(i = 0; i < arr.length; i++) {
        if(i < arr.length -1) {
            if(arr[i].tr[0].l.i[0].length < 25) {
                strTrans = strTrans + arr[i].tr[0].l.i[0].slice(0, 25) + '\r\n';
            } else if(arr[i].tr[0].l.i[0].length > 25 && arr[i].tr[0].l.i[0].length < 50) {
                strTrans = strTrans + arr[i].tr[0].l.i[0].slice(0, 25) + '\r\n' +
                                        arr[i].tr[0].l.i[0].slice(25, 50) + '\r\n';
            } else if(arr[i].tr[0].l.i[0].length > 50 && arr[i].tr[0].l.i[0].length < 75) {
                strTrans = strTrans + arr[i].tr[0].l.i[0].slice(0, 25) + '\r\n' +
                                        arr[i].tr[0].l.i[0].slice(25, 50) + '\r\n' +
                                        arr[i].tr[0].l.i[0].slice(50, 75) + '\r\n';
            } else if(arr[i].tr[0].l.i[0].length > 75) {
                strTrans = strTrans + arr[i].tr[0].l.i[0].slice(0, 25) + '\r\n' +
                                        arr[i].tr[0].l.i[0].slice(25, 50) + '\r\n' +
                                        arr[i].tr[0].l.i[0].slice(50, 75) + '\r\n' +
                                        arr[i].tr[0].l.i[0].slice(75, 100) + '\r\n';
            }
        } else {
            if(arr[i].tr[0].l.i[0].length < 25) {
                strTrans = strTrans + arr[i].tr[0].l.i[0].slice(0, 25);
            } else if(arr[i].tr[0].l.i[0].length > 25 && arr[i].tr[0].l.i[0].length < 50) {
                strTrans = strTrans + arr[i].tr[0].l.i[0].slice(0, 25) + '\r\n' +
                                        arr[i].tr[0].l.i[0].slice(25, 50);
            } else if(arr[i].tr[0].l.i[0].length > 50 && arr[i].tr[0].l.i[0].length < 75) {
                strTrans = strTrans + arr[i].tr[0].l.i[0].slice(0, 25) + '\r\n' +
                                        arr[i].tr[0].l.i[0].slice(25, 50) + '\r\n' +
                                        arr[i].tr[0].l.i[0].slice(50, 75);
            } else if(arr[i].tr[0].l.i[0].length > 75) {
                strTrans = strTrans + arr[i].tr[0].l.i[0].slice(0, 25) + '\r\n' +
                                        arr[i].tr[0].l.i[0].slice(25, 50) + '\r\n' +
                                        arr[i].tr[0].l.i[0].slice(50, 75) + '\r\n' +
                                        arr[i].tr[0].l.i[0].slice(75, 100);
            }
        }
    }
}

//StrokesPlus.Console.Log(strTrans);
if(strTrans != null) {
    sp.StoreString('strTrans', strTrans);
}

sp.StoreBool("Trans", true);
sp.CreateTimer('Trans', 6000, -1, String.raw`sp.StoreBool("Trans", false);sp.DeleteTimer('Trans');`);      

httpHandler.Dispose();
client.Dispose();
response.Dispose();
