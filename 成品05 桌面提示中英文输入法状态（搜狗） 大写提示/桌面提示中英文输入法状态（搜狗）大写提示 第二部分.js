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
                var imeWnd = NativeModules.Imm32.ImmGetDefaultIMEWnd(sp.ForegroundWindow().HWnd);

                //Send the message and store return value
                var ret = sp.WindowFromHandle(imeWnd).SendMessageObj(WM_IME_CONTROL, IMC_GETOPENSTATUS, 0x0);


                if(ret.ToInt32() === 0) {
                    if(info.Message.length > 0) {
                        info.Message += " - ";
                        info.BackColor = "255,105,180";//粉
                        info.Location = "190,809";
                    } else {
                        info.BackColor = "56,142,142";//墨绿
                        info.Location = "325,809";
                    }
                    info.Message += "En Keyboard ACTIVE";  
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
