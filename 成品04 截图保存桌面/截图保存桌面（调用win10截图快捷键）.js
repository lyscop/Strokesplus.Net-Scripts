var startimage = clip.GetImage();

sp.SendModifiedVKeys([vk.LSHIFT,vk.LWIN], [vk.VK_S]);

sp.Sleep(10);//延时进入截图界面时间
for(i=0; i< 6000; i++) {
//ScreenClippingHost

    sp.Sleep(1000);
    var wnd = sp.WindowsFromTitlePartial("屏幕截图");
    sp.Sleep(200);
    var currimage = clip.GetImage();

    if(i > 0 && wnd.Count() === 0 && clip.ContainsImage()) {

                var env = clr.System.Environment;
                var desktop = env.GetFolderPath(env.SpecialFolder.DesktopDirectory);
                var d = new Date();
                var dateString = "image-"+d.getFullYear()
                                 + "-"
                                 + ("0" + (d.getMonth()+1)).slice(-2)
                                 + "-"
                                 + ("0" + d.getDate()).slice(-2)
                                 + " "
                                 + ("0" + d.getHours()).slice(-2) 
                                 +  "" 
                                 + ("0" + d.getMinutes()).slice(-2)
                                 +  "" 
                                 + ("0" + d.getSeconds()).slice(-2);

                sp.Sleep(100);
                currimage.Save(
                    `${desktop}\\${dateString}.png`, 
                    drawing.System.Drawing.Imaging.ImageFormat.Png)
                sp.Sleep(100);
                sp.StoreBool("store", true);
                sp.CreateTimer('store', 700, -1, String.raw`sp.StoreBool("store", false);sp.DeleteTimer('store');`);
            break;


    }
}
