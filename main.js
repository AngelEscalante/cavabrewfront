import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const QRCode = require('qrcode');
import { fileURLToPath } from "url";
//import getPrinters from "./printerManager.js";
//import { event } from "grunt";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, "assets", "CavabrewLogo.png"),
    webPreferences: {
      nodeIntegration: false, // No usar Node.js en el renderizador
      contextIsolation: true, // Aislamiento entre el contexto de renderizado y el de Electron
      preload: path.join(__dirname, "preload.mjs"), // Preload seguro
      webSecurity: false,  // 🔹 Habilita la seguridad web en Electron
      contentSecurityPolicy: "default-src 'self'; script-src 'self'; img-src 'self' data:;"
    },
  });

  if (!isDev) {
    win.setMenu(null);
    win.webContents.on("before-input-event", (event, input) => {
      if (
        (input.control && input.shift && ["i", "j", "c"].includes(input.key.toLowerCase())) ||
        input.key === "F12"
      ) {
        event.preventDefault();
      }
    });
  }

  win.loadURL(isDev ? "http://localhost:5173" : `file://${__dirname}/index.html`);
}



// Manejo de la impresión del ticket usando node-thermal-printer
ipcMain.handle("imprimir-ticket", async (event, printerName) => {
  console.log("Aqui imprimimos")
});
ipcMain.handle("generar-qr",async(idcl)=>{
  try {
    const data = idcl || 'txtpruebatoqr';
    const qrCodeImage = await QRCode.toString(data);
    res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
  } catch (err) {
    console.error('Error generating QR code:', err);
    res.status(500).send('Internal Server Error');
  }
})
// Obtener las impresoras disponibles
ipcMain.handle("obtener-impresoras", async () => {
  /*try {
    const printers = await getPrinters(); // Esperamos la lista real de impresoras
    console.log("Impresoras disponibles:", printers);

    // Formateamos la respuesta para que tenga el formato esperado en el frontend
    return printers.map(name => ({ value: name, label: name }));
  } catch (error) {
    console.error("❌ Error al obtener las impresoras:", error);
    return [];
  }*/
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
