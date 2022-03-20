var mouseLocation = sp.GetCurrentMousePoint();
var currentScreen = Screen.FromPoint(mouseLocation);
if(mouseLocation.Y >= currentScreen.Bounds.Bottom - 40) {
    //Mouse is at edge of screen
    if(wheel.Delta > 0) {
        sp.SendVKey(vk.VOLUME_UP);
    } else {
        sp.SendVKey(vk.VOLUME_DOWN);
    }
} else if(mouseLocation.Y <= currentScreen.Bounds.Top + 35) {
   if(wheel.Window.Process.MainModule.ModuleName == "chrome.exe" || wheel.Window.Process.MainModule.ModuleName == "msedge.exe" ||
        wheel.Window.Process.MainModule.ModuleName == "MicrosoftEdge.exe" || wheel.Window.Process.MainModule.ModuleName == "Firefox.exe") {
       if(wheel.Delta > 0) {
            //mouse wheel scrolled up
            sp.SendModifiedVKeys([vk.LCONTROL,vk.LSHIFT], [vk.TAB]);
        } else {
            //mouse wheel scrolled down
            sp.SendModifiedVKeys([vk.LCONTROL], [vk.TAB]);
        }
    } else {
        sp.MouseWheel(wheel.Point, false, wheel.Delta); 
    }
} else if(mouseLocation.X <= currentScreen.Bounds.Left + 20) {
    if(wheel.Delta > 0){
        //scroll up, send 
        ScreenBrightness.ScreenBrightness.Adjust("10+");
    } else {
        //scroll down, send 
        ScreenBrightness.ScreenBrightness.Adjust("10-");
    }
} else if(mouseLocation.X >= currentScreen.Bounds.Right - 25) {
    if(wheel.Delta > 0) {
        //If Alt is down
        try { 
            if(sp.GetStoredBool("AltDown")) {
                sp.SendModifiedVKeys([vk.LSHIFT], [vk.TAB]);
            } else {
                sp.StoreBool("AltDown", true); 
                sp.SendAltDown();
                sp.Sleep(50);
                sp.SendModifiedVKeys([vk.LSHIFT], [vk.TAB]);
            }

            sp.CreateTimer("TimerAltDown", 800, 0, `sp.SendAltUp(); sp.DeleteTimer("TimerAltDown");`);
            sp.DeleteStoredBool("AltDown");

        } catch {}
    } else {
    //If Alt is down
        try { 
           if(sp.GetStoredBool("AltDown")) {
                sp.SendVKeyDown(vk.TAB);
                sp.Sleep(50);
                sp.SendVKeyUp(vk.TAB);

            } else {
            //First stroll, send Alt down
                sp.StoreBool("AltDown", true); 
                sp.SendAltDown();
                sp.Sleep(50);
                sp.SendVKeyDown(vk.TAB);
                sp.Sleep(50);
                sp.SendVKeyUp(vk.TAB);
            }

            sp.CreateTimer("TimerAltDown", 800, 0, `sp.SendAltUp(); sp.DeleteTimer("TimerAltDown");`);
            sp.DeleteStoredBool("AltDown");
        } catch {}
    }
} else {
    //Default, pass mouse wheel message onto the original control
    sp.MouseWheel(wheel.Point, false, wheel.Delta); 
}
