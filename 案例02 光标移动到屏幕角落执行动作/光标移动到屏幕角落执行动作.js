sp.CreateTimer("CornerCheck", 0, 200, `
                               var mousePos = sp.GetCurrentMousePoint();
                               var mouseScreen = Screen.FromPoint(mousePos);
                               if(mousePos.X == mouseScreen.Bounds.Right - 1 && mousePos.Y == mouseScreen.Bounds.Top) {
                                    //右上角动作
                                    //sp.MessageBox("In upper right corner!", "Hi");
                                    if(!sp.GetStoredBool("CornerCheckActive")) {
                                        sp.SendModifiedVKeys([vk.LMENU], [vk.F4]);//关闭窗口
                                        sp.StoreBool("CornerCheckActive", true);
                                    } 
                               } else if(mousePos.X == mouseScreen.Bounds.Right - 1 && mousePos.Y == mouseScreen.Bounds.Bottom - 1) {
                                    //右下角动作
                                    //sp.MessageBox("In lower right corner!", "Hi");
                                    if(!sp.GetStoredBool("CornerCheckActive")) {
                                        sp.SendModifiedVKeys([vk.LWIN], [vk.VK_D]);//显示桌面
                                        sp.StoreBool("CornerCheckActive", true);
                                    } 
                               } else if(mousePos.X == mouseScreen.Bounds.Left && mousePos.Y == mouseScreen.Bounds.Top) {
                                    //左上角动作
                                    //sp.MessageBox("In upper left corner!", "Hi");
                                    if(!sp.GetStoredBool("CornerCheckActive")) {
                                        //添加代码到此处，然后注释或删除下方的sp.MessageBox
                                        sp.StoreBool("CornerCheckActive", true);
                                        sp.MessageBox("In upper left corner!", "Hi");
                                    } 
                               } else if(mousePos.X == mouseScreen.Bounds.Left && mousePos.Y == mouseScreen.Bounds.Bottom - 1) {
                                    //左下角动作
                                    //sp.MessageBox("In lower left corner!", "Hi");
                                    if(!sp.GetStoredBool("CornerCheckActive")) {
                                        sp.SendVKey(vk.LWIN);
                                        sp.StoreBool("CornerCheckActive", true);
                                    } 
                               }  else {
                                    sp.StoreBool("CornerCheckActive", false);
                               }`
);
