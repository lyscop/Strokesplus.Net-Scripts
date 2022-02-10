var clientId = "1UVb6fiUzC1hyzwT2zvsOcwi";
var clientSecret = "de1XdmFwNKx32NWw3b4LHsPh0AvyyALT";

var startimage = clip.GetImage();

sp.SendModifiedVKeys([vk.LSHIFT,vk.LWIN], [vk.VK_S]);

//sp.Sleep(100);
for(i=0; i< 6000; i++) {
//ScreenClippingHost
    
    sp.Sleep(1000);
    var wnd = sp.WindowsFromTitlePartial("屏幕截图");
    var currimage = clip.GetImage();
    if(i > 0 && wnd.Count() === 0 && clip.ContainsImage()) {

            sp.Sleep(100); 

            var ms = new clr.System.IO.MemoryStream();
            currimage.Save(ms, drawing.System.Drawing.Imaging.ImageFormat.Png);
            ms.Position = 0;
            var base64Img = clr.System.Convert.ToBase64String(ms.GetBuffer());
            var imgHTML = "<img alt='Clipped Image' src='" + "data:image/png;base64," + base64Img + "' />";
            clip.SetText(imgHTML);
            ms.Close();

            var authHost = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret;
            var client = new http.System.Net.Http.HttpClient();
            var json = client.GetStringAsync(authHost);
            var obj = JSON.parse(json.Result);
            client.Dispose();

            if (obj.access_token) {
                var token = obj.access_token;
                var ocrHost = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=" + token;
                var request = clr.System.Net.WebRequest.Create(ocrHost);
                request.Method = "post";
                var encoding = clr.System.Text.Encoding.Default;
                var paraString = "image=" + clr.System.Net.WebUtility.UrlEncode(base64Img);
                var buffer =  encoding.GetBytes(paraString);
                request.ContentLength = buffer.Length;
                request.GetRequestStream().Write(buffer, 0, buffer.Length);

                var response = request.GetResponse();
                var reader = new clr.System.IO.StreamReader(response.GetResponseStream(), clr.System.Text.Encoding.UTF8);
                var result = reader.ReadToEnd();

                var json = JSON.parse(result);
                var jsonArray = json.words_result;
                if (jsonArray) {
                    var OCRText = "";
                    for(var i=0; i<jsonArray.length; i++) {
                        OCRText += jsonArray[i].words
                    }
                    if (OCRText.length) {
                        clip.SetText(OCRText);
                        //clr.System.Media.SystemSounds.Asterisk.Play();
                    }
                }
                else {
                    clip.SetText(result);
                }
                
                response.Dispose();
                reader.Dispose();
            }

        //以下break前的注释代码内容为屏幕左下角显示OCR结果，根据需要选用

        /*var info = new DisplayTextInfo();
        //info.Title = 'Test';
        info.TitleAlignment = 'Center';
        info.Message = clip.GetText();
        info.MessageAlignment = 'Left';
        info.Duration = 2000;
        //弹出窗口的透明度,有效范围：0.05  -  1.0(1.0不透明)
        info.Opacity = 0.5;
        //位置也支持位置,使用此格式指定类型：'100,200'
        //类型：topleft,top,topright,right,bottomright,bottom,bottomleft,left
        info.Location = 'bottom'; 
        info.TitleFont = new Font('Segoe UI', 12, host.flags(FontStyle.Bold));
        info.MessageFont = new Font('Segoe UI Semibold', 12);
        //info.BackColor = '56,169,255';//'56,169,255'; //也支持 RGBinfo.ForeColor = 'white';
        info.BackColor = "105,105,105";             
        info.Padding = 10;//大小
        //如果为true,则始终显示在主屏幕上(除非Location是点类型),
        //否则会在手势开始的屏幕上显示
        info.UsePrimaryScreen = true; 
        sp.DisplayText(info);*/

        break;
    }
}
