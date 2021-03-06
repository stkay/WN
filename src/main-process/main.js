import { app, BrowserWindow } from 'electron'
import { autoUpdater } from "electron-updater"
import path from 'path'
import url from 'url'
// import * as mysql from 'mysql2/promise'

//ウィンドウをグローバルに置くとGCされない
let win

const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1185,
    height: 800,
    useContentSize: true,
    resizable: false
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  autoUpdater.checkForUpdatesAndNotify()

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
