import { app, BrowserWindow } from 'electron';
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
  });
  mainWindow.loadURL('http://localhost:3001');
}
// wait the express initialize
setTimeout(() => createWindow(), 5000);