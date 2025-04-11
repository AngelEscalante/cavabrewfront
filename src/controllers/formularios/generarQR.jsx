// QRGenerator.js (Backend)
import QRCode from 'qrcode';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const QRGenerator = async (text, logoUrl, nombreArchivo) => {
  try {
    // Generar QR
    const qrBuffer = await QRCode.toBuffer(text, { errorCorrectionLevel: 'H', type: 'png' });

    // Cargar el logo
    const logoBuffer = await fetch(logoUrl)
      .then(res => res.arrayBuffer())
      .then(buffer => Buffer.from(buffer));

    // Superponer el logo sobre el QR
    const qrWithLogo = await sharp(qrBuffer)
      .composite([{ input: logoBuffer, gravity: 'center', top: -20, left: -20, blend: 'over' }])
      .png()
      .toBuffer();

    // Definir la ruta para guardar la imagen
    const folderPath = path.join(__dirname, 'QR_Images');
    
    // Crear la carpeta QR_Images si no existe
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // Definir el nombre del archivo (usando nombreArchivo para evitar espacios)
    const filePath = path.join(folderPath, `${nombreArchivo.replace(/\s/g, '_')}.png`);

    // Guardar la imagen generada
    fs.writeFileSync(filePath, qrWithLogo);
    console.log(`QR guardado como ${filePath}`);
  } catch (error) {
    console.error("Error generando el QR: ", error);
  }
};

export default QRGenerator;
