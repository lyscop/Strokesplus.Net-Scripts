sp.CreateTimer("LangWatch",
               250,
               250,
               `var info = new DisplayTextInfo();
                
                 
               info.TitleFont = new Font('Segoe UI', 12, host.flags(FontStyle.Bold));
               info.MessageFont = new Font("Segoe UI Semibold", 12);
               info.BackColor = "15,179,98";  //绿
               info.ForeColor = "255,255,255";
               info.Duration = 1000;
               info.Opacity = 0.5;
               //info.Location = "679,765";
               info.Location = "190,809";
               //info.Location = "0,0";
               //info.Location = "bottom";
               info.FadeSteps = 10;
               info.Padding = 10;
               info.Message = "";

                if(sp.IsKeyToggled(vk.CAPITAL)) {//大写键监控
                    info.Message = "CAPS Lock is ON";

                }

                //开始
              var currentMouseLocation = sp.GetCurrentMousePoint();
              if(sp.GetStoredBool("Trans")) {
                        info.Opacity = 0.6;
                        info.Padding = 5;   
                        info.MessageAlignment = 'Left';
                        info.MessageFont = new Font("Segoe UI Semibold", 8);
                        //info.Location = (currpt.X + 10) + ',' + (currpt.Y + 35); //鼠标点击位置
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
