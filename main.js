const path = require('path')
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

const projectRoot = path.resolve(__dirname, './')
var mainWindow = null

if (isDev) {
  require('electron-reload')(projectRoot)
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 600
  })

  mainWindow.loadURL(`file://${projectRoot}/dist/index.html`)

  mainWindow.on('closed', function () {
    if (isDev) {
      require('vue-devtools').uninstall()
    }
    mainWindow = null
  })

  if (isDev) {
    require('vue-devtools').install()
  }
})
