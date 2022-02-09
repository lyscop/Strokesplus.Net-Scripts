sp.CreateTimer("CAPSWatch", 
               250, 
               250, 
               `if(sp.IsKeyToggled(vk.CAPITAL)) {
                   if(sp.GetStoredBool("CAPSOn") === false) {
                       sp.StoreBool("CAPSOn", true); 
                       var info = new DisplayTextInfo();
                       info.TitleFont = new Font('Segoe UI', 12, host.flags(FontStyle.Bold));
                       info.MessageFont = new Font("Segoe UI Semibold", 10);
                       info.BackColor = "37,146,52";
                       info.ForeColor = "255,255,255";
                       info.Message = "CAPS Lock is ON";
                       info.Duration = 2000;
                       info.Location = "bottom"; 
                       info.Padding = 10;
                       sp.DisplayText(info);
                   }
               } else {
                   if(sp.GetStoredBool("CAPSOn") === true) {
                       sp.StoreBool("CAPSOn", false); 
                       var info = new DisplayTextInfo();
                       info.TitleFont = new Font('Segoe UI', 12, host.flags(FontStyle.Bold));
                       info.MessageFont = new Font("Segoe UI Semibold", 10);
                       info.BackColor = "200,56,70";
                       info.ForeColor = "255,255,255";
                       info.Message = "CAPS Lock is OFF";
                       info.Duration = 2000;
                       info.Location = "bottom"; 
                       info.Padding = 10;
                       sp.DisplayText(info);
                   }
               }`
);
