var result;
var selectedFiles;
var fullPath = ""; 
var isDesktop = false;
var success = false;
var path = "";
var fileNameNoExt;
var allFile = "";
var filepath = "";
var filespath = "";
var archivename;
var onlyNames = true; //Only include the name, not the full path and name
var includeFolders = true; //Include folders as well as files
var includeLinks = true; //Include links (shortcuts)
var n = 0;
var m = "";
var str = "C:\\Users\\Administrator\\Desktop";
var foldinfo = new System.IO.DirectoryInfo(str);
var desktopfilescount = foldinfo.EnumerateFileSystemInfos().Count();

if(action.Control.HWnd.ToInt32() == sp.DesktopWindowListView().HWnd.ToInt32()) {
    //Desktop
    selectedFiles = sp.GetSelectedFilesOnDesktop();
    isDesktop = true;
} else {
    //Not Desktop
    selectedFiles = sp.GetSelectedFilesInExplorer(action.Window.HWnd);
}

fullPath = selectedFiles[0]; //选中文件路径
path = sp.GetActiveExplorerPath(action.Window.HWnd); //窗口路径
fileNameNoExt = System.IO.Path.GetFileNameWithoutExtension(fullPath);
allFile = sp.GetItemsInExplorer(action.Window.HWnd, onlyNames, includeFolders, includeLinks); //资源管理器文件名

if(isDesktop) {
    fullPath = System.Environment.GetFolderPath(System.Environment.SpecialFolder.Desktop) + "\\" + fullPath;
    path = System.Environment.GetFolderPath(System.Environment.SpecialFolder.Desktop);
    fileNameNoExt = System.IO.Path.GetFileNameWithoutExtension(fullPath);

    for(i = 0; i < desktopfilescount; i++) 
    {
        if(System.IO.File.Exists(path + "\\新建压缩文件" + m + ".zip") || 
            System.IO.File.Exists(path + "\\" + fileNameNoExt + m + ".zip")) {
            n = n + 1;
            m = " (" + n + ")";
            //m = "_" + n;
        }
    }
} else {
    for(i = 0; i < allFile.Length; i++)
    {
        if(("新建压缩文件" + m + ".zip") == allFile[i] || 
            (fileNameNoExt + m + ".zip") == allFile[i]) {
            n = n + 1;
            m = " (" + n + ")";
            //m = "_" + n;
        }
    }
}

if(selectedFiles.Length == 1) {
    filepath = fullPath;
    archivename = path + "\\" + fileNameNoExt + m + ".zip";
    result = sp.RunProgram('C:\\Program Files\\7-Zip\\7z.exe', 
                                       `a "${archivename}" "${filepath}"`,
                                       'open', 'hidden', false, true, true);
} else if(selectedFiles.Length > 1) {
    for(i = 0; i < selectedFiles.Length; i++)
    {
        fullPath = selectedFiles[i];

        if(isDesktop) {
            fullPath = System.Environment.GetFolderPath(System.Environment.SpecialFolder.Desktop) + "\\" + fullPath;
        }
        filespath = filespath + " " + "\"" + fullPath + "\"";
    }
    archivename = path + "\\新建压缩文件" + m + ".zip";
    StrokesPlus.Console.Log(filespath);
    sp.RunProgram('C:\\Program Files\\7-Zip\\7z.exe', 
                                       `a "${archivename}" ${filespath}`,
                                       'open', 'hidden', false, true, true);

    var p = new System.Diagnostics.Process();
    p.StartInfo.UseShellExecute = false;
    p.StartInfo.RedirectStandardOutput = true;
    p.StartInfo.FileName = "C:\\Program Files\\7-Zip\\7z.exe";
    p.StartInfo.CreateNoWindow = true;
    p.StartInfo.Arguments = "l \"" + archivename + "\""
    p.Start();
    var output = p.StandardOutput.ReadToEnd();
    p.WaitForExit();

    var lines = output.split(/\r\n|\n\r|\n|\r/);

    // skipping last line to ignore the summary line
    // but yeah,  tweak as needed
    for(var i = 0; i < lines.length - 2; i++) {
        if(/^[0-9]{4}-/.test(lines[i])) {
            var zipfilepath = lines[i].slice(53);
            var temzipfilepath = "新建文件夹\\" + zipfilepath;
            result = sp.RunProgram('C:\\Program Files\\7-Zip\\7z.exe', 
                                       `rn ${archivename} "${zipfilepath}" "${temzipfilepath}"`,
                                       'open', 'hidden', false, true, true); 

        }
    }
}


if(result == 0) { 
    success = true;
    sp.ShowBalloonTip("ZIP Extract", "Success", "info", 1000);
} 
if(!success) {
    sp.ShowBalloonTip("ZIP", "Failed", "error", 1000);
}
