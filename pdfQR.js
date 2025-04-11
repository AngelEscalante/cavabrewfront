import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';

const QRPdf = async (text, logoPath, cavabrewLogo, nombreArchivo, nombreCliente, empresa) => {
  try {
    // 1. Cargar las imágenes (logo, marca de agua y QR)
    const logo = await sharp(logoPath).toBuffer(); // Logo en la esquina superior izquierda
    const cavabrewLogoImage = await sharp(cavabrewLogo).toBuffer(); // Logo de Cavabrew
    const qrBuffer = await QRCode.toBuffer(text, { errorCorrectionLevel: 'H', type: 'png' }); // Generar el QR

    // 2. Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]); // Tamaño de la página (ancho x alto)

    // 3. Insertar el logo en la esquina superior izquierda
    const logoImage = await pdfDoc.embedPng(cavabrewLogoImage);
    page.drawImage(logoImage, {
      x: 50, // Posición X
      y: page.getHeight() - 150, // Posición Y (parte superior)
      width: 150, // Ancho del logo
      height: 150, // Alto del logo
    });

    // 4. Insertar el título "Cavabrew" en el centro
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    page.drawText('Cavabrew', {
      x: 250, // Centrado aproximadamente
      y: page.getHeight() - 120, // Posición Y
      size: 24, // Tamaño de la fuente
      font: font,
      color: rgb(0, 0, 0), // Color negro
    });

    // 5. Insertar el texto justificado
    const textContent = `Hola ${nombreCliente}!, gracias por adquirir tu cava con nosotros, espero disfrutes de nuestros servicios, te entregamos un QR que tiene un uso para que puedan identificar su cuenta como cliente así como también su cava para mantener el control de los productos con los que cuenta dentro de su cava, así mismo con qué porcentaje de las botellas tienen.
    \n \n Att: El equipo de Cavabrew y ${empresa}`;

    const textWidth = 500; // Ancho del texto
    const textX = 50; // Posición X del texto
    const textY = page.getHeight() - 250; // Posición Y del texto

    page.drawText(textContent, {
      x: textX,
      y: textY,
      size: 12,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
      maxWidth: textWidth,
      lineHeight: 15,
    });

    // 6. Insertar el QR en el PDF
    const qrImage = await pdfDoc.embedPng(qrBuffer);
    page.drawImage(qrImage, {
      x: 180, // Posición X del QR
      y: textY - 400, // Posición Y del QR (debajo del texto)
      width: 250, // Ancho del QR
      height: 250, // Alto del QR
    });

    // 7. Insertar la marca de agua (logoPath como fondo)
    const watermarkImage = await pdfDoc.embedPng(logo);
    page.drawImage(watermarkImage, {
      x: 50,
      y: 50,
      width: page.getWidth() - 100, // Ancho de la marca de agua
      height: page.getHeight() - 100, // Alto de la marca de agua
      opacity: 0.2, // Transparencia de la marca de agua
    });

    // 8. Guardar el PDF
    const pdfBytes = await pdfDoc.save();
    const pdfPath = path.join(getDirname(import.meta.url), 'PDFs', `${nombreArchivo}.pdf`);
    if (!fs.existsSync(path.dirname(pdfPath))) {
      fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
    }
    fs.writeFileSync(pdfPath, pdfBytes);

    console.log(`PDF generado y guardado en: ${pdfPath}`);
  } catch (error) {
    console.error('Error generando el PDF:', error);
  }
};

// Función para obtener el directorio actual
const getDirname = (importMetaUrl) => {
  const __filename = fileURLToPath(importMetaUrl);
  return path.dirname(__filename);
};

export default QRPdf;