if(__spEngineWrapper.Engine.Name == sp.EngineList().Last().Engine.Name) {
     var keyboardEventObj = sp.GetStoredObject("keyboardEvent");
     if(!keyboardEventObj.GetType().FullName.includes('EventConnection')) {
         //Bind to the synchronous event
         var keyboardEvent = KeyboardHook.OnKeyboardHookEventAsync.connect(
             function (sender, keyboardHookEvent) {
                 //Wrap all code in try/catch, exceptions will crash S+, such as calling clip.SetText with a null value
                 try {
                     if(keyboardHookEvent.Key == vk.CAPITAL) {
                        if(keyboardHookEvent.KeyState == KeyState.Up) {
                            if(!sp.GetStoredBool("CAPSOn")) {
                                sp.StoreBool("CAPSOn", true); 
                                sp.CreateTimer('Capsclose', 6000,  0, `sp.SendVKey(vk.CAPITAL); sp.DeleteTimer('Capsclose');  `);//6秒自动关闭Caps
                            } else {
                                sp.StoreBool("CAPSOn", false); 
                                sp.DeleteTimer('Capsclose');
                            }
                        }
                    }
                }
                catch {}
            });
        sp.StoreObject("keyboardEvent", keyboardEvent);
    }
}
