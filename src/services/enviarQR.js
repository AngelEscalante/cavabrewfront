const sendQRCodeToBackend = async (qrImageBuffer) => {
    const formData = new FormData();
    formData.append('qr_image', qrImageBuffer, 'qr_with_logo.png');
  
    try {
      const response = await fetch('http://localhost/cavabrew/api.php?resource=qr', {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json();
      if (data.success) {
        console.log('QR enviado correctamente');
      } else {
        console.error('Error al enviar el QR');
      }
    } catch (error) {
      console.error('Error al contactar al servidor: ', error);
    }
  };
  