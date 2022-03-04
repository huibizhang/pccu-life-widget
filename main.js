// main.js

const fs = require("fs");

// 控制應用生命周期和創建原生瀏覽器窗口的模組
const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

function createWindow() {
  // 創建瀏覽器窗口
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 390,
    frame: false,
    skipTaskbar: true,
    transparent: true,
    
    // resizable: false,
    maximizable: false,
    
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      experimentalFeatures: true,
    },
    titleBarStyle: "hidden",
    // titleBarOverlay: {
    //   color: 'rgba(0,0,0,0)',
    //   symbolColor: 'white'
    // }
  });

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  
  var initPath = path.join(app.getAppPath(), "setting.json");
  var data;
  try {
    data = JSON.parse(fs.readFileSync(initPath, "utf8"));
  } catch (e) {
    data = {
      position: {
        x: width - mainWindow.getSize()[0] - 5,
        y: 5,
      },
    };
    fs.writeFileSync(initPath, JSON.stringify(data));
  }

  // Create a window that fills the screen's available work area.
  
  mainWindow.setPosition(
    (data.position.x + mainWindow.getSize()[0] > width)? width - mainWindow.getSize()[0] - 5 :  data.position.x,
    (data.position.y < 0) ? 0 : data.position.y,
    true
  );

  mainWindow.on("moved", () => {
    data.position.x = mainWindow.getPosition()[0];
    data.position.y = mainWindow.getPosition()[1];

    if(data.position.x + mainWindow.getSize()[0] > width){
      data.position.x = width - mainWindow.getSize()[0] - 5
    }

    if(data.position.y < 0) {
      data.position.y = 5
    }

    mainWindow.setPosition(data.position.x, data.position.y , true)

    fs.writeFileSync(initPath, JSON.stringify(data));
  });

  // Require the module
  // var electronVibrancy = require('electron-vibrancy');
  // electronVibrancy.SetVibrancy(true,browserWindowInstance.getNativeWindowHandle());

  // mainWindow.setAlwaysOnTop(true)
  // mainWindow.setSkipTaskbar(true)

  if(process.env.NODE_ENV === "production"){
    // mainWindow.loadURL("https://pccu-life-widget.vercel.app/");
    mainWindow.loadURL("http://127.0.0.1:3000");
  } else {
    // 加載 index.html
    mainWindow.loadFile("./dist/index.html"); // 此處跟electron官網路徑不同，需要註意
  }

  // 打開開發工具
  // mainWindow.webContents.openDevTools()
}

// 這段程序將會在 Electron 結束初始化
// 和創建瀏覽器窗口的時候調用
// 部分 API 在 ready 事件觸發後才能使用。
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // 通常在 macOS 上，當點擊 dock 中的應用程序圖標時，如果沒有其他
    // 打開的窗口，那麼程序會重新創建一個窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除瞭 macOS 外，當所有窗口都被關閉的時候退出程序。 因此，通常對程序和它們在
// 任務欄上的圖標來說，應當保持活躍狀態，直到用戶使用 Cmd + Q 退出。
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// 在這個文件中，你可以包含應用程序剩餘的所有部分的代碼，
// 也可以拆分成幾個文件，然後用 require 導入。
