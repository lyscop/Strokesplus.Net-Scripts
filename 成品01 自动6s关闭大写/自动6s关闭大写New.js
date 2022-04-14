sp.DeleteTimer('Capsclose');
sp.DisplayTextClose();
var info = new DisplayTextInfo();
info.TitleFont = new Font('Segoe UI', 12, host.flags(FontStyle.Bold));
info.MessageFont = new Font("Segoe UI Semibold", 10);
info.ForeColor = "255,255,255";
info.Duration = 1000;
info.Location = "bottomleft";
info.Padding = 10;

if (sp.IsKeyToggled(vk.CAPITAL)) {
    info.BackColor = "37,146,52";
    info.Message = "CAPS Lock is ON";
    sp.DisplayText(info);

    //6秒后自动关闭Caps，不需要可以注释掉或者删除
    sp.CreateTimer('Capsclose', 6000, 0,
        `if (sp.IsKeyToggled(vk.CAPITAL)) {
            var info = new DisplayTextInfo();
            info.TitleFont = new Font('Segoe UI', 12, host.flags(FontStyle.Bold));
            info.MessageFont = new Font("Segoe UI Semibold", 10);
            info.BackColor = "37,146,52";
            info.BackColor = "200,56,70";
            info.Message = "CAPS Lock is OFF";
            info.Duration = 1000;
            info.Location = "bottomleft";
            info.Padding = 10;
            sp.DisplayText(info);
            sp.SendVKey(vk.CAPITAL);
        }`);

} else {
    info.BackColor = "200,56,70";
    info.Message = "CAPS Lock is OFF";

    sp.DisplayText(info);
}
