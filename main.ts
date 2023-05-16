const {app, BrowserWindow} = require("electron");
const electronPath = require('path');
const application = require(__dirname + "\\src\\server.ts");
require(__dirname + '\\src\\server.ts');
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: electronPath.join(__dirname, "preload.js"),
    },
    width: 800,
  });
  mainWindow.loadURL('http://localhost:3000');
}
// wait the express initialize
setTimeout(() => createWindow(), 5000);