if(!NativeModules.User32)
{
    var IntPtrT = host.typeOf(clr.System.IntPtr);
    var Int32T = host.typeOf(clr.System.Int32);
    var BooleanT = host.typeOf(clr.System.Boolean);

    //--------------------------------------------------------------------
    // Define the type which will contain the PInvokes
    // Type can still be modified until .Create() is called
    //--------------------------------------------------------------------
	
    var user32TB = sp.NativeModule().DefineType("User32", "Class,Public,SequentialLayout,Serializable");
	
	// Define PInvoke method for GetDpiForWindow (Windows 10 1607 or greater)
	
	user32TB.DefinePInvokeMethod("ShowWindow",
								 "user32.dll",
								 [IntPtrT,Int32T], 
								 BooleanT, 
								 "PreserveSig");	

    user32TB.DefinePInvokeMethod("SetWindowPos",
								 "user32.dll",
								 [IntPtrT,Int32T,Int32T,Int32T,Int32T,Int32T,Int32T], 
								 BooleanT, 
								 "PreserveSig");


    //--------------------------------------------------------------------
    // Creates the type (which cannot be changed after) and refreshes the 
    // NativeModules assembly in the script engine
    //--------------------------------------------------------------------
	user32TB.Create();
}

sp.CreateTimer("imagepreview", 
               0, 
               800, 
                `var currentMouseLocation = sp.GetCurrentMousePoint();
                var wndHandle = sp.ForegroundWindow().HWnd;
                var desktopHandle = sp.DesktopWindowListView().HWnd;

                var fullPath = "";
                var files;
                var isDesktop = false;
                var mouseScreen = Screen.FromPoint(currentMouseLocation);

                var oldFormHWD = sp.GetStoredHandle('formHWD');
                var oldSelFileName = sp.GetStoredString('selFileName');

                if(wndHandle.ToInt32() == desktopHandle.ToInt32() || sp.LastFocusControl().HWnd.ToInt32() == desktopHandle.ToInt32()) {
                    //Desktop
                    files = sp.GetSelectedFilesOnDesktop();
                    isDesktop = true;
                } else {
                    //Not Desktop
                    if(!sp.GetStoredBool('explorer')) {
                        files = sp.GetSelectedFilesInExplorer(wndHandle);
                    }
                }
                    
                if(files.Length == 1 && (files[0].endsWith("png") || files[0].endsWith("PNG") ||
                        files[0].endsWith("jpg") || files[0].endsWith("JPG") || 
                        files[0].endsWith("jpeg") || files[0].endsWith("JPEG") || 
                        files[0].endsWith("bmp") || files[0].endsWith("BMP") ||  
                        files[0].endsWith("ico") || files[0].endsWith("ICO") ||
                        files[0].endsWith("gif") || files[0].endsWith("GIF"))) {
                    
                    fullPath = files[0];
                    
                    if(isDesktop) {
                        fullPath = System.Environment.GetFolderPath(System.Environment.SpecialFolder.Desktop) + "\\\\" + fullPath;
                    }

                    var fileNameNoExt = System.IO.Path.GetFileNameWithoutExtension(fullPath);
                    sp.StoreString('selFileName', fileNameNoExt);

                    if(sp.GetStoredString('selFileName') != oldSelFileName) {
                        sp.StoreBool('shown', false);
                    }

                    if(!sp.GetStoredBool('shown') && !sp.GetStoredBool('explorer')) {
                        //ShowImage(fullPath, currentMouseLocation, 1);

                        var fs = new clr.System.IO.FileStream(fullPath, clr.System.IO.FileMode.Open, clr.System.IO.FileAccess.Read, clr.System.IO.FileShare.ReadWrite);
                        var fileBytes = host.newArr(System.Byte, fs.Length); 
                        fs.Read(fileBytes, 0, fs.Length);

                        fs.Close();
                        ShowImage(System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes)), currentMouseLocation, 1);
                        //sp.DisplayImage(System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes)), true);
                        //ImageWithMenu.Show(System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes)), currentMouseLocation, 1);
                    }
                } else if(files.Length == 0) {
                    sp.WindowFromHandle(sp.GetStoredHandle('formHWD')).SendClose();
                    sp.StoreBool('shown', false);
                    sp.DeleteStoredHandle('formHWD');
                }

                function ShowImage(img, pt, border) {

                    if (img == null) return;

                    sp.WindowFromHandle(oldFormHWD).SendClose();
                    
                    var Forms = forms.System.Windows.Forms;
                    if (border == null) border = 0;
                    if (border != 0) { pt = new Point(pt.X - border, pt.Y - border); }

                    var foreWidth = System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes)).Width;
                    var foreHeight = System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes)).Height;
                    var afterHeight = parseInt(System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes)).Height*420/System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes)).Width);

                    var form = new Forms.Form;
                    form.StartPosition = Forms.FormStartPosition.Manual;
                    form.FormBorderStyle = (border != 0) ? 
                        Forms.FormBorderStyle.None :
                        Forms.FormBorderStyle.SizableToolWindow ;
                    form.TopMost = true;
                    form.ControlBox = false;
                    form.ShowInTaskbar = false;
                    form.Margin = new Forms.Padding(0);
                    if (border != 0) { form.Padding = new Forms.Padding(border); }
                    form.MinimumSize = new Size(10, 10);
                    form.Size = new Size(10, 10);
                    if(foreWidth > 450) {
                        if(currentMouseLocation.X < mouseScreen.Bounds.Right - 1 - 450 && currentMouseLocation.Y > mouseScreen.Bounds.Bottom - 1 - afterHeight) {
                            form.Location = new Point(currentMouseLocation.X, mouseScreen.Bounds.Bottom - 41 - afterHeight);
                        } else if(currentMouseLocation.X > mouseScreen.Bounds.Right - 1 - 450 && currentMouseLocation.Y < mouseScreen.Bounds.Bottom - 1 - afterHeight){
                            form.Location = new Point(mouseScreen.Bounds.Right - 1 - 450, currentMouseLocation.Y);
                        } else if(currentMouseLocation.X > mouseScreen.Bounds.Right - 1 - 450 && currentMouseLocation.Y > mouseScreen.Bounds.Bottom - 1 - afterHeight){
                            form.Location = new Point(mouseScreen.Bounds.Right - 1 - 450, mouseScreen.Bounds.Bottom - 41 - afterHeight);
                        } else {               
                            form.Location = pt;
                        }
                    } else {
                        if(currentMouseLocation.X < mouseScreen.Bounds.Right - 1 - foreWidth && currentMouseLocation.Y > mouseScreen.Bounds.Bottom - 1 - foreHeight) {
                            form.Location = new Point(currentMouseLocation.X, mouseScreen.Bounds.Bottom - 41 - foreHeight);
                        } else if(currentMouseLocation.X > mouseScreen.Bounds.Right - 1 - foreWidth && currentMouseLocation.Y < mouseScreen.Bounds.Bottom - 1 - foreHeight) {
                            form.Location = new Point(mouseScreen.Bounds.Right - 1 - foreWidth, currentMouseLocation.Y);
                        } else if(currentMouseLocation.X > mouseScreen.Bounds.Right - 1 - foreWidth && currentMouseLocation.Y > mouseScreen.Bounds.Bottom - 1 - foreHeight) {
                            form.Location = new Point(mouseScreen.Bounds.Right - 1 - foreWidth, mouseScreen.Bounds.Bottom - 41 - foreHeight);
                        } else {               
                            form.Location = pt;
                        }
                    }
                    form.AutoSize = true;
                    form.GetType().GetProperty("DoubleBuffered",
                        host.flags(clr.System.Reflection.BindingFlags.NonPublic,
                        clr.System.Reflection.BindingFlags.Instance))
                        .SetValue(form, true);

                    //透明边框
                    form.BackColor = Color.LimeGreen;
                    form.TransparencyKey = Color.LimeGreen;

                    var pic = new Forms.PictureBox;
                    pic.Name = 'pic';
                    pic.SizeMode = Forms.PictureBoxSizeMode.Zoom;
                    if(System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes)).Width > 450) {
                        pic.Size = new Size(450, parseInt(System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes)).Height*420/System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes)).Width));
                    } else {
                        pic.Size = new Size(System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes)).Width, System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes)).Height);
                    }
                    pic.BackColor = Color.Transparent;//背景透明
                    if (border != 0) { pic.Location = new Point(border, border); }
                    pic.Image = img;
                    
                    //pic.Image = System.Drawing.Image.FromStream(new clr.System.IO.MemoryStream(fileBytes));

                    form.Controls.Add(pic);
                    var autoSize = form.Size;
                    var t = (form.ClientSize.Width - pic.Width - form.Padding.Horizontal);
                    autoSize.Width -= t;
                    autoSize.Height -= t;
                    form.AutoSize = false;
                    form.Size = autoSize;
                    pic.Dock = Forms.DockStyle.Fill;

                    var form_shown = 
                    form.Shown.connect(
                    function (sender, args) {
                        //form.TopMost = true;

                        var HWND_TOPMOST = -1;
                        var SWP_NOACTIVATE = 0x0010;
                        var SW_SHOWNOACTIVATE = 4;

                        NativeModules.User32.ShowWindow(form.Handle, SW_SHOWNOACTIVATE);
                        NativeModules.User32.SetWindowPos(form.Handle, HWND_TOPMOST,form.Left, form.Top, form.Width, form.Height,SWP_NOACTIVATE);
                        form.TopMost = false;
                        //form.Activate();
                        sp.StoreBool('shown', true);
                        sp.StoreHandle('formHWD', form.Handle);

                    });


                    var pic_doubleClick = 
                    pic.DoubleClick.connect(
                    function (sender, args) {
                        sp.StoreBool('shown', false);
                        sp.DeleteStoredHandle('formHWD');
                        form.Close();
                    });

                    var form_doubleClick = 
                    form.DoubleClick.connect(
                    function (sender, args) {
                        sp.StoreBool('shown', false);
                        sp.DeleteStoredHandle('formHWD');
                        form.Close();
                    });

                    var form_lostFocus = 
                    form.LostFocus.connect(
                    function (sender, args) {
                        //form.Close(); 
                        //sp.StoreBool('shown', false);
                    });

                    var form_KeyDown = 
                    form.KeyDown.connect(
                    function (sender, e) {
                        // The keypressed method uses the KeyChar property to check 
                        // whether the ENTER key is pressed. 
                        if((e.Control) && (e.KeyCode==System.Windows.Forms.Keys.F7) && (e.Alt)) {
                            form.Close();
                            sp.StoreBool('shown', false);
                        }
                    });

                    dragMoveBlind = ShowImageBindDragMove(form, pic);
                    wheelResizeBlind = ShowImageBindWheelResize(form, pic);

                    Forms.Application.Run(form);

                }

                function ShowImageBindWheelResize(form, pic) {
                    var form_mouseWheel = 
                    form.MouseWheel.connect(
                    function (sender, e) {
                        var factor = e.Delta / 1000;
                        var ampt = forms.System.Windows.Forms.Control.MousePosition;
                        var rmpt = new Point();
                        rmpt.X = ampt.X - form.Left;
                        rmpt.Y = ampt.Y - form.Top;
                        var intFunc = Math.floor;
                        rmpt.X +=  intFunc(rmpt.X * factor);
                        rmpt.Y +=  intFunc(rmpt.Y * factor);
                        form.SetBounds(ampt.X - rmpt.X, ampt.Y - rmpt.Y, 
                        form.Width + intFunc(form.Width *  factor), 
                        form.Height + intFunc(form.Height *  factor));
                    });
                    return [form_mouseWheel];
                }

                function ShowImageBindDragMove(form, pic) {
                    var Cursors = forms.System.Windows.Forms.Cursors;
                    var ReleaseCapture = sp_config.GetType().Assembly.GetType("API").GetMethod("ReleaseCapture");

                    var pic_mouseMove = 
                    pic.MouseMove.connect(
                    function (sender, e) {
                        var hitResize = form.Height + form.Width - (e.X + e.Y) < 30;
                        var cursor = hitResize ? Cursors.SizeNWSE : Cursors.Default;
                        if (pic.Cursor != cursor) pic.Cursor = cursor;
                        if (e.Button == MouseButtons.Left) {
                            ReleaseCapture.Invoke(null, null);
                            sp.WindowFromHandle(form.Handle).SendMessageObj(0x0112,
                                hitResize ? 0xF008 : 0xF012, 0);
                        }
                    });

                    return [pic_mouseMove];
                }
                `
);
