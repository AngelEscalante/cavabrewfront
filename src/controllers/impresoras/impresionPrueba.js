const printerModule = await import('node-printer');
const printer = printerModule.default; // Acceso al módulo en Type Module

const cutCommand = "\x1D\x56\x00"; // Comando ESC/POS para cortar papel

const text = "Prueba de impresión en impresora térmica de 80mm\n\nCavabrew.\n\n";

export async function printReceipt(printerName) {
  try {
    printer.printDirect({
      printer: printerName,
      text: text + cutCommand, // Agregamos el comando de corte
      type: "RAW",
      success: function (jobID) {
        console.log(`✅ Impresión enviada con éxito. ID del trabajo: ${jobID}`);
      },
      error: function (err) {
        console.error("❌ Error al imprimir:", err);
      }
    });
  } catch (error) {
    console.error("❌ Error en la impresión:", error);
  }
}
