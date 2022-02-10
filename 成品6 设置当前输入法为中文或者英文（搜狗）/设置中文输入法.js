const WM_IME_CONTROL_a = 0x283;
const IMC_GETOPENSTATUS_a = 0x006;
sp.WindowFromHandle(imeWnd).SendMessageObj(WM_IME_CONTROL_a, IMC_GETOPENSTATUS_a, 0x1);
