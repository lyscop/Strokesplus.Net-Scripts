var result;
var fullPath = "";
var outdir = "";
var selectedFiles;
var isDesktop = false;
var success = false;

if(action.Control.HWnd.ToInt32() == sp.DesktopWindowListView().HWnd.ToInt32()) {
    //Desktop
    selectedFiles = sp.GetSelectedFilesOnDesktop();
    isDesktop = true;
} else {
    //Not Desktop
    selectedFiles = sp.GetSelectedFilesInExplorer(action.Window.HWnd);
}

fullPath = selectedFiles[0];

if(isDesktop) {
    fullPath = System.Environment.GetFolderPath(System.Environment.SpecialFolder.Desktop) + "\\" + fullPath;
}

var fileNameNoExt = System.IO.Path.GetFileNameWithoutExtension(fullPath);
var folderName = System.IO.Path.GetDirectoryName(fullPath);

outdir = folderName + "\\" + fileNameNoExt;

//用于l 路径
var path = fullPath.replaceAll("\\","\\\\")
var p = new System.Diagnostics.Process();
p.StartInfo.UseShellExecute = false;
p.StartInfo.RedirectStandardOutput = true;
p.StartInfo.FileName = "C:\\Program Files\\7-Zip\\7z.exe";
p.StartInfo.CreateNoWindow = true;
p.StartInfo.Arguments = "l \"" + path + "\" -x!*\\*";
p.Start();
var output = p.StandardOutput.ReadToEnd();
p.WaitForExit();

var lines = output.split(/\r\n|\n\r|\n|\r/);
var filenum = 0;
var foldnum = 0;
var filepath = "";
var str = "";


// skipping last line to ignore the summary line
// but yeah,  tweak as needed
//第一层文件 文件夹数量
for(var i = 0; i < lines.length - 1; i++) {
    if(/^[0-9]{4}-/.test(lines[i])) {
        if(i = lines.length - 2) {
            if(lines[lines.length - 2].indexOf("folders") > -1) {
                foldnum = lines[lines.length - 2].split(', ')[1].split(' folders')[0];
            }
            if(lines[lines.length - 2].indexOf("files") > -1) {
                filenum = lines[lines.length - 2].slice(53).split(' files')[0];
            }
        } 

    }
}


if(selectedFiles.Length == 1) {
    if((filenum == 1 && foldnum == 0) || (filenum == 0 && foldnum == 1)) { //当前文件夹 文件数1 文件夹0 或 文件数0 文件夹1
        result = sp.RunProgram('C:\\Program Files\\7-Zip\\7z.exe', 
                                           `x "${fullPath}" -o"${folderName}" -aou`, 
                                           'open', 'hidden', false, true, true); 
    } else if((filenum > 1 && foldnum == 0) || (filenum == 0 && foldnum > 1) || (filenum > 0 && foldnum > 0)) { //同名文件夹 文件数>1 文件夹0 或 文件数0 文件夹>1 或 文件数>0 文件夹>0
        result = sp.RunProgram('C:\\Program Files\\7-Zip\\7z.exe', 
                                   `x "${fullPath}" -o"${outdir}" -aou`, 
                                   'open', 'hidden', false, true, true);
    }
} else if(selectedFiles.Length > 1) { //批量解压缩
    for(i = 0; i < selectedFiles.Length; i++)
    {
        tempfullPath = selectedFiles[i];

        if(isDesktop) {
            tempfullPath = System.Environment.GetFolderPath(System.Environment.SpecialFolder.Desktop) + "\\" + tempfullPath;
        }
        var tempfolderName = System.IO.Path.GetDirectoryName(tempfullPath);
        //直接解压到当前路径
        result = sp.RunProgram('C:\\Program Files\\7-Zip\\7z.exe', 
                                           `x "${tempfullPath}" -o"${tempfolderName}" -aou`, 
                                           'open', 'hidden', false, true, true); 
    }
} else {

}

if(result == 0) { 
    success = true;
    sp.ShowBalloonTip("ZIP Extract", "Success", "info", 1000);
    
} 
if(!success) {
    sp.ShowBalloonTip("ZIP Extract", "Failed", "error", 1000);
}
