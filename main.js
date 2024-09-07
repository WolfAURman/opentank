const { app, BrowserWindow, Menu } = require('electron');

// Убираем меню с выбором файла, отмены и прочее 
Menu.setApplicationMenu(null)


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true  

    },
    // Установка иконки приложения
    icon: 'assets/icons/512x512.png'
  });

  // Ссылка на веб сайт с которого берутся ресурсы
  win.loadURL('https://tankionline.com/play');

  // Принудительная установка названия окна
  win.on('page-title-updated', (event, title) => {
    event.preventDefault();
    win.setTitle('Open Tank');
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();  

  }
});