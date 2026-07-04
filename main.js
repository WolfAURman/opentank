const { app, BrowserWindow, Menu, Notification } = require('electron');

const chromiumFlags = [
  // --- Графика и производительность ---
  ['ignore-gpu-blocklist'],                          // Разрешает аппаратное ускорение на старых драйверах
  ['force_high_performance_gpu'],                    // Принудительно использует дискретную видеокарту
  ['enable-gpu-rasterization'],                      // Переносит растеризацию на GPU
  ['enable-zero-copy'],                              // Прямой доступ к памяти (без копирования)
  ['enable-hardware-overlays', 'single-fullscreen'], // Оптимизация полноэкранного режима
  ['disable-gpu-vsync'],                             // (Выключено) Отключает вертикальную синхронизацию
  // ['disable-frame-rate-limit'],                   // (Выключено) Снимает лок FPS

  // --- Сеть и пинг ---
  ['no-proxy-server'],                               // Отключает поиск прокси (убирает микрофризы сети)
  ['enable-quic'],                                   // Включает быстрый протокол передачи (HTTP/3)
  ['enable-async-dns'],                              // Асинхронный поиск IP-адресов
  ['disable-background-networking'],                 // Отключает фоновую сетевую активность Chromium
  ['disable-client-side-phishing-detection']         // Отключает проверку безопасности сайтов в фоне
];

chromiumFlags.forEach(flag => app.commandLine.appendSwitch(...flag));

// Принудительный выбор дискретной видеокарты (если их две)
app.commandLine.appendSwitch('force_high_performance_gpu');

// Оптимизация памяти для 32-битных систем
if (process.arch === 'ia32') {
  app.commandLine.appendSwitch('js-flags', '--max-old-space-size=3072');
}

Menu.setApplicationMenu(null);

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      // nodeIntegration
      // Игре он не нужен, но его включение создает огромную дыру в безопасности
      // и заставляет движок тратить ресурсы на проброс Node.js API в окно браузера
      nodeIntegration: false,
      contextIsolation: true,

      // backgroundThrottling. Игра не будет резать FPS,
      // При клике на второй монитор или при свёрнутом окне
      backgroundThrottling: false,

      // Отключение проверки орфографии (экономит немного RAM)
      spellcheck: false,

      // Разрешаем автоплей (иногда браузер блокирует звуки до первого клика)
      autoplayPolicy: 'no-user-gesture-required'
    }
  });

  win.loadURL('https://tankionline.com/play');

  win.on('page-title-updated', (event) => {
    event.preventDefault();
    win.setTitle('Open Tank');
  });

  // Перехват уведомлений
  win.webContents.on('did-receive-notification', (event, title, body) => {
    new Notification({ title, body }).show();
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
