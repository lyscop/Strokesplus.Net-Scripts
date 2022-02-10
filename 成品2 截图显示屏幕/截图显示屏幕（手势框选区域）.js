// Copies the area within the square gesture area to the clipboard, like a screenshot

//Delay to ensure S+ has cleared the gesture and hint
sp.Sleep(100); 
//Create a new Bitmap in memory
var memoryImage = new drawing.System.Drawing.Bitmap(action.Bounds.Width, action.Bounds.Height);
//Create a graphics object associated with the bitmap
var memoryGraphics = drawing.System.Drawing.Graphics.FromImage(memoryImage);
//Copy the screen within the bounding rectangle of the drawn gesture area
//I used a square gesture since that seems more intuitive, but it's not neccessary
memoryGraphics.CopyFromScreen(action.Bounds.X, action.Bounds.Y, 0, 0, action.Bounds.Size);
//Copy the image to the clipboard
clip.SetImage(memoryImage);
memoryGraphics.Dispose();
memoryImage.Dispose();

//sp.DisplayImage(clip.GetImage(), true);
ShowImage(clip.GetImage(), action.End,1);
//ImageWithMenu.Show(clip.GetImage(), action.Start, 1);

function ShowImage(img, pt, border) {
    if (img == null) return;

    var Forms = forms.System.Windows.Forms;
    if (border == null) border = 0;
    if (border != 0) { pt = new Point(pt.X - border, pt.Y - border); }

    var form = new Forms.Form;
    form.StartPosition = Forms.FormStartPosition.Manual;
    form.FormBorderStyle = (border != 0) ? //border != 0白框
        Forms.FormBorderStyle.None :
        Forms.FormBorderStyle.SizableToolWindow ;
    form.TopMost = true;
    form.ControlBox = false;
    form.ShowInTaskbar = false;
    form.Margin = new Forms.Padding(0);
    if (border != 0) { form.Padding = new Forms.Padding(border); }
    form.MinimumSize = new Size(10, 10);
    form.Size = new Size(10, 10);
    form.Location = pt;
    form.AutoSize = true;
    form.GetType().GetProperty("DoubleBuffered",
        host.flags(clr.System.Reflection.BindingFlags.NonPublic,
        clr.System.Reflection.BindingFlags.Instance))
        .SetValue(form, true);
    form.BackColor = drawing.System.Drawing.SystemColors.HotTrack;

    var pic = new Forms.PictureBox;
    pic.Name = 'pic';
    pic.SizeMode = Forms.PictureBoxSizeMode.Zoom;
    pic.Size = new Size(img.Width, img.Height);
    pic.BackColor = drawing.System.Drawing.SystemColors.Control;
    if (border != 0) { pic.Location = new Point(border, border); }
    pic.Image = img;

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
        form.TopMost = true;
        form.Activate();
        if(sp.IsKeyToggled(vk.CAPITAL)){
            sp.SendVKey(vk.CAPITAL);
        }
    });

    var pic_doubleClick = 
    pic.DoubleClick.connect(
    function (sender, args) {
        form.Close();
    });

    menuBlind = ShowImageBindAllMenu(form, pic);
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
function ShowImageBindAllMenu(form, pic) {
    var Forms = forms.System.Windows.Forms;

    var contextMenu1 = new Forms.ContextMenu();
    var menu1 = contextMenu1.MenuItems.Add("Save File");

    // item 1
    var saveFileDialog1  = new Forms.SaveFileDialog();
    saveFileDialog1.Filter = "png files (*.png)|*.png" ;
    saveFileDialog1.RestoreDirectory = true ;
    //saveFileDialog1.FileName = clr.System.DateTime.Now.ToString().replace(/[/\*?":<>| ]/g, '_');
    
    var d = new Date();
    saveFileDialog1.FileName = "StrokesPlus.net-"+d.getFullYear()
                     + "-"
                     + ("0" + (d.getMonth()+1)).slice(-2)
                     + "-"
                     + ("0" + d.getDate()).slice(-2)
                     + "-"
                     + ("0" + d.getHours()).slice(-2) 
                     +  "" 
                     + ("0" + d.getMinutes()).slice(-2)
                     +  "" 
                     + ("0" + d.getSeconds()).slice(-2);


    var menu1_click  = menu1.Click.connect(function (sender, e) {
        if (saveFileDialog1.ShowDialog() == Forms.DialogResult.OK) {
            pic.Image.Save(saveFileDialog1.FileName, drawing.System.Drawing.Imaging.ImageFormat.Png);
        }
    });

    pic.ContextMenu = contextMenu1;

    return [menu1_click];
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
