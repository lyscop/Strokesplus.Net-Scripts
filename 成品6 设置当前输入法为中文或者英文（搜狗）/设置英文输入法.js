const WM_IME_CONTROL_b = 0x283;
const IMC_GETOPENSTATUS_b = 0x006;
sp.WindowFromHandle(imeWnd).SendMessageObj(WM_IME_CONTROL_b, IMC_GETOPENSTATUS_b, 0x0);
