// Reemplaza los imports por require
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    obtenerImpresoras: () => ipcRenderer.invoke("obtener-impresoras"),
    imprimirTicket: (printerName) => ipcRenderer.invoke("imprimir-ticket", printerName),
});