import RNFS from "react-native-fs";
import { PDFDocument, StandardFonts } from "pdf-lib";
import Share from "react-native-share";
import { Buffer } from "buffer";

export const createAndSharePDF = async (invoiceData) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const page = pdfDoc.addPage([600, 900]);
    const { height } = page.getSize();

    // Header
    page.drawText("Byteback Invoice", {
      x: 200,
      y: height - 50,
      size: 18,
      font: fontBold,
    });

    // Example dynamic fields
    page.drawText(`Invoice No: ${invoiceData?.invoice_no}`, {
      x: 50,
      y: height - 100,
      size: 12,
      font,
    });

    // ----- FIX: Convert PDF to base64 -----
    const pdfBytes = await pdfDoc.save(); // Uint8Array
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    const filePath = `${RNFS.CachesDirectoryPath}/Invoice_${invoiceData?.invoice_no}.pdf`;

    // ----- FIX: Write base64 string -----
    await RNFS.writeFile(filePath, pdfBase64, "base64");

    await Share.open({
      url: `file://${filePath}`,
      type: "application/pdf",
      title: "Download Invoice",
    });

  } catch (error) {
  }
};
