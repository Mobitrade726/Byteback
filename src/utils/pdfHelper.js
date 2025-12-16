
import RNFS from 'react-native-fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import Share from 'react-native-share';
import { Platform } from 'react-native';
import { Buffer } from 'buffer';

export const createAndSharePDF = async (order_id) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const page = pdfDoc.addPage([600, 400]);
    const { height } = page.getSize();

    page.drawText(`Invoice for Order ID: ${order_id}`, {
      x: 50,
      y: height - 100,
      size: 24,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    const path = `${RNFS.CachesDirectoryPath}/invoice_${order_id}.pdf`;

    await RNFS.writeFile(path, pdfBase64, 'base64');

    await Share.open({
      url: Platform.OS === 'android' ? `file://${path}` : path,
      type: 'application/pdf',
      title: 'Share Invoice',
    });
  } catch (error) {
  }
};
