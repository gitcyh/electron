// main.js
 
// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow,screen, ipcMain,dialog, Menu } = require('electron')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV

function createWindow () {
  //Menu.setApplicationMenu(null);
  let size = screen.getPrimaryDisplay().workAreaSize;
  let width = parseInt(size.width * 0.54);
  let height = parseInt(size.height * 0.72);
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation:false
    }
  })
  console.log("当前目录:"+__dirname);
  mainWindow.setMinimumSize(width, height);

  onFile(mainWindow)
  // 加载 index.html
  //mainWindow.loadFile('dist/index.html') // 此处跟electron官网路径不同，需要注意
  if(NODE_ENV == 'development'){
    mainWindow.loadURL('http://127.0.0.1:5173');
  }else{
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
 
 
  // 打开开发工具
  if (NODE_ENV === "development") {
    mainWindow.webContents.openDevTools()
  }
}
 
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()
 
  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
 
// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
 
// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。



//文件事件的监听
function onFile(win){
  ipcMain.on('open-directory-dialog', function (event, p) {
    dialog.showOpenDialog(win, {
      properties: p.type,
      filters: p.action == 'addFile' ? [{name:'Movies',extensions:['mkv','avi','mp4','qlv','qsv','flv','ifox']}] :[]
    }).then(result => {
      if(p.action == 'addFolder'){
        event.sender.send('selectedFolder', result.filePaths);
      }else if(p.action == 'addFile'){
        event.sender.send('selectedFile', result.filePaths);
      }else if(p.action == 'changePath'){
        event.sender.send('changeOutPath', result.filePaths);
      }
    }).catch(err => {
      console.log(err)
    })
  });
}
