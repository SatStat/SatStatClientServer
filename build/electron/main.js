"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        width: 800,
    });
    mainWindow.loadURL('http://localhost:3001');
}
// wait the express initialize
setTimeout(function () { return createWindow(); }, 5000);
//# sourceMappingURL=main.js.map