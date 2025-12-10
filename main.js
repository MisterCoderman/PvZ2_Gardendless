const { app, BrowserWindow } = require('electron');
const path = require('path');

// GPU / WebGL
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('use-angle', 'd3d11');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    useContentSize: true,

    //
    frame: true,          // можно вообще не писать, это дефолт, но пусть явно
    resizable: true,      // пользователь может растягивать
    fullscreenable: true, // можно разворачивать на полный экран

    webPreferences: {
      contextIsolation: false,
      nodeIntegration: false,
      webSecurity: false,
      backgroundThrottling: false
    }
  });

  // стартуем просто в окне, БЕЗ maximize()/fullscreen
  win.loadFile(path.join(__dirname, 'index.html'));

  // если не нужно меню Файл/Вид/…
  win.removeMenu();

  // на релизе лучше выключить
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
