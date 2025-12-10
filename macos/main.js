const { app, BrowserWindow } = require('electron');
const path = require('path');

// -----------------------------
//   ANGLE BACKEND FIX
// -----------------------------
if (process.platform === 'win32') {
  // Windows нормально работает на DirectX
  app.commandLine.appendSwitch('use-angle', 'd3d11');
} else {
  // macOS / Linux — как в Edge через flags, ставим OpenGL
  app.commandLine.appendSwitch('use-angle', 'gl');
}

// Разрешаем WebGL
app.commandLine.appendSwitch('ignore-gpu-blocklist');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    useContentSize: true,

    frame: true,
    resizable: true,
    fullscreenable: true,

    webPreferences: {
      contextIsolation: false,
      nodeIntegration: false,
      webSecurity: false,
      backgroundThrottling: false
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  win.removeMenu();
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
