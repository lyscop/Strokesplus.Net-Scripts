var ht = sp.ForegroundWindow().Screen.Bounds.Height;
var wd = sp.ForegroundWindow().Screen.Bounds.Width;

var input = "";

var Forms = forms.System.Windows.Forms;
var form = new Forms.Form;

form.StartPosition = Forms.FormStartPosition.Manual;
form.FormBorderStyle = Forms.FormBorderStyle.FixedToolWindow;
form.TopMost = true;
form.ControlBox = false;
form.ShowInTaskbar = false;
form.Margin = new Forms.Padding(0);
form.Padding = new Forms.Padding(1); 
form.MinimumSize = new Size(100, 10);
//form.Size = new Size(300, 26);
form.Size = new Size(300, 34);
//form.Location = currentMouseLocation;
form.Location = new Point(wd/2 - 150, ht/2 - 60);
form.AutoSize = true;
form.GetType().GetProperty("DoubleBuffered",
        host.flags(clr.System.Reflection.BindingFlags.NonPublic,
        clr.System.Reflection.BindingFlags.Instance))
        .SetValue(form, true);
form.BackColor = Color.WhiteSmoke;

var textBox = new Forms.TextBox;
textBox.Size = new Size(150, 20);
textBox.Location = new Point(50, 5);
//textBox.Font = new System.Drawing.Font("Microsoft YaHei", 8, FontStyle.Regular);
textBox.Font = new System.Drawing.Font("Microsoft YaHei", 13, FontStyle.Regular);
textBox.Text = "";
textBox.Dock = System.Windows.Forms.DockStyle.Fill;
form.Controls.Add(textBox);

dragMoveBlind = ShowImageBindDragMove(form, form);
dragMoveBlind = ShowImageBindDragMove(form, textBox);

var form_shown = 
form.Shown.connect(
function (sender, args) {
    form.TopMost = true;
    form.Activate();
});

var textBox_KeyPress = 
textBox.KeyPress.connect(
function (sender, e) {
    // The keypressed method uses the KeyChar property to check 
    // whether the ENTER key is pressed. 
    // then, do action and close the Form
    if (e.KeyChar == 13)
    {
        input = textBox.Text;
        form.Close();
    // The keypressed method uses the KeyChar property to check 
    // whether the ESCAPE key is pressed. 
    // then close the Form
    } else if(e.KeyChar == 27) {
        form.Close();
    }
});

var textBox_KeyDown = 
textBox.KeyDown.connect(
function (sender, e) {
    // The keydown method uses the KeyChar property to check 
    // whether the Ctrl+SHIFT+J key is pressed. 
    // then, close the Form
    var hk = e.KeyCode
    if((e.Control) && (e.KeyCode==System.Windows.Forms.Keys.J) && (e.Shift)) {
        form.Close();
        StrokesPlus.Console.Log('OK');
    }
});

// Enable to double click the mouse right button to 
// drag the From
var textBox_doubleClick = 
textBox.DoubleClick.connect(
function (sender, args) {
  dragMoveBlind = ShowImageBindDragMove(form, textBox);
});

var form_doubleClick = 
form.DoubleClick.connect(
function (sender, args) {
  dragMoveBlind = ShowImageBindDragMove(form, form);
});

Forms.Application.Run(form);

function ShowImageBindDragMove(form, item) {
    var Cursors = forms.System.Windows.Forms.Cursors;
    var ReleaseCapture = sp_config.GetType().Assembly.GetType("API").GetMethod("ReleaseCapture");

    var item_mouseMove = 
    item.MouseMove.connect(
    function (sender, e) {
        var hitResize = form.Height + form.Width - (e.X + e.Y) < 30;
        var cursor = hitResize ? Cursors.SizeNWSE : Cursors.IBeam;
        if (item.Cursor != cursor) item.Cursor = cursor;
        if (e.Button == MouseButtons.Left) {
            ReleaseCapture.Invoke(null, null);
            sp.WindowFromHandle(form.Handle).SendMessageObj(0x0112,
                hitResize ? 0xF008 : 0xF012, 0);
        }
    });

    return [item_mouseMove];
}


if((input !== '')) {
    var kwd = '';
    var str = '';

    if(input.slice(0, 2) == 'b ') {
        str = 'https://www.baidu.com/s?wd=';
        kwd = input.slice(2);
    } else if(input.slice(0, 3) == 'bi ') {
        str = 'https://cn.bing.com/search?q=';
        kwd = input.slice(3);
    } else if(input.slice(0, 2) == 'd ') {
        str = 'https://duckduckgo.com/?q=';
        kwd = input.slice(2);
    } else if(input.slice(0, 2) == 'g ') {
        str = 'https://www.google.com/search?q=';
        kwd = input.slice(2);
    } else if(input.slice(0, 2) == 'w ') {
        str = 'https://zh.wikipedia.org/w/index.php?search=';
        kwd = input.slice(2);
    } else if(input.slice(0, 2) == 'y ') {
        str = 'https://www.youtube.com/results?search_query=';
        kwd = input.slice(2);
    }
    if(str !== '') {
        sp.RunProgram(str + kwd, '', 'open', 'normal', true, false, false);
    }
}
