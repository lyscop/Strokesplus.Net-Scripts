sp.CreateTimer("LangWatch",
               250,
               250,
               `var info = new DisplayTextInfo();
                
                 
               info.TitleFont = new Font('Segoe UI', 12, host.flags(FontStyle.Bold));
               info.MessageFont = new Font("Segoe UI Semibold", 12);
               info.BackColor = "15,179,98";  //绿
               info.ForeColor = "255,255,255";
               info.Duration = 1000;
               info.Opacity = 0.5; //透明度
               info.Location = "190,809"; //翻译结果显示坐标，相对于屏幕分辨率，当前是屏幕左下角
               info.FadeSteps = 10;
               info.Padding = 10;
               info.Message = "";

                if(sp.IsKeyToggled(vk.CAPITAL)) {//大写键监控
                    info.Message = "CAPS Lock is ON";

                }

                //开始
              var currentMouseLocation = sp.GetCurrentMousePoint();
              var currpt = sp.GetStoredPoint("mouseClick"); 
              if(sp.GetStoredBool("Trans")) {
                        info.Opacity = 0.6;
                        info.Padding = 5;   
                        info.MessageAlignment = 'Left';
                        info.MessageFont = new Font("Segoe UI Semibold", 8); //结果字体大小，13寸屏幕检验8/10，大于13寸建议12/14
                        //info.Location = (currpt.X + 10) + ',' + (currpt.Y + 35); //鼠标点击位置，需要在鼠标左键点击脚本中添加 var currentMouseLocation = sp.GetCurrentMousePoint(); sp.StorePoint("mouseClick", currentMouseLocation);
                        info.Location = (currentMouseLocation.X + 10) + ',' + (currentMouseLocation.Y + 35); //鼠标位置
                        info.BackColor = "245,245,245"; 
                        info.ForeColor = 'black';
                        //info.Duration = 3000;
                        //info.Message = clip.GetText();
                        //info.Message = sp.GetSavedString('strTrans');
                        info.Message = sp.GetStoredString('strTrans');
                   }
                //结束

                if(info.Message.length > 0) {
                    if(sp.GetStoredBool("LangShown")) {
                        sp.DisplayTextUpdate(info);
                    } else {
                        sp.DisplayText(info);
                        sp.StoreBool("LangShown", true);
                    }
                } else {
                    //sp.DisplayTextClose();
                    sp.StoreBool("LangShown", false);
                }
               `
);
