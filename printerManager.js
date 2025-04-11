import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');

async function printManager (cliente,fecha,data,empresa,cava,ip) {
  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON, // 'star' or 'epson'
    interface: `tcp://${ip}`,  
    options: {
      timeout: 1000,
    },
    width: 48, // Number of characters in one line - default: 48
    characterSet: CharacterSet.SLOVENIA, // Character set - default: SLOVENIA
    breakLine: BreakLine.WORD, // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
    removeSpecialCharacters: false, // Removes special characters - default: false
    lineCharacter: '-', // Use custom character for drawing lines - default: -
  });

  const isConnected = await printer.isPrinterConnected();
  console.log('Printer connected:', isConnected);

  printer.alignCenter();
  await printer.printImage('./cavabrewlg2.png');

  printer.alignCenter();
  //printer.newLine();
  printer.bold(true);
  printer.println('CAVABREW');
  printer.println('WINE & BEER CELLAR SOFTWARE');
  printer.bold(true);
  printer.println(empresa);

  printer.alignCenter();
  printer.println('NOTA DE COSUMO DE CAVA');
  printer.newLine();
  printer.alignLeft();
  printer.println('CLIENTE: '+cliente);
  printer.println('FECHA: '+fecha);
  printer.drawLine('=');
  printer.tableCustom([
    { text: 'PRODUCTO', align: 'LEFT'},
    {
      text: 'INICIO | FIN', align: 'RIGHT',
    }
  ]);
  printer.drawLine('=');
  for (let i = 0; i < data.length; i++) {
    printer.tableCustom([
        { text: data[i].producto, align: 'LEFT'},
        {
          text: `${data[i].inicio}% | ${data[i].fin}%`, align: 'RIGHT',
        }
      ]);
  }
  printer.drawLine('=');
  printer.newLine();
  printer.newLine();
  printer.newLine();
  printer.newLine();
  printer.alignCenter();
  printer.drawLine();
  printer.println('FIRMA DEL CLIENTE');
  printer.newLine();
  printer.newLine();
  printer.printQR(cava);
  printer.newLine();
  printer.newLine();
  printer.println('ESTE DOCUMENTO ES UN COMPROBANTE ');
  printer.println('DE COMO SE ENTREGARON LOS PRODUCTOS');
  printer.println('CORRESPONDIENTES A SU CAVA');
  printer.println('ESTE NO ES UN COMPROBANTE FISCAL');
  printer.println('AGRADECEMOS SU VISITA');

  printer.cut();

  console.log(printer.getText());

  try {
    await printer.execute();
    console.log('Print success.');
  } catch (error) {
    console.error('Print error:', error);
  }
}
export default printManager;