//Define IME constants
const WM_IME_CONTROL = 0x283;
const IMC_GETOPENSTATUS = 0x005;

//If the Imm32 module has not already been defined
if(!NativeModules.Imm32)
{
    var IntPtrT = host.typeOf(System.IntPtr);

    //Define imm32 type
    var imm32TB = sp.NativeModule().DefineType("Imm32", "Class,Public,SequentialLayout,Serializable");
         
        //Define the platform invoke call
        //From: https://docs.microsoft.com/en-us/windows/win32/api/imm/nf-imm-immgetdefaultimewnd
        imm32TB.DefinePInvokeMethod("ImmGetDefaultIMEWnd",
                                                                 "imm32.dll",
                                                                 [IntPtrT],
                                                                 IntPtrT,
                                                                 "PreserveSig");        

        //Create the type (finalize, now made an official C# class)                                         
    imm32TB.Create();                                                                 

    //Note: Changes cannot be made to a class once created. If you need to change or add
    //      anything, you must restart S+ to update the class.
}
