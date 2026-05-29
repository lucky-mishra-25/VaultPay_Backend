const PDFDocument = require("pdfkit");
const fs = require("fs");

const generatePDF = (invoice) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();

    const path = `uploads/${invoice._id}.pdf`;

    doc.pipe(fs.createWriteStream(path));

    doc.fontSize(25).text("Nexus Corporate Services");

    doc.moveDown();

    doc.text("PAYMENT RECEIPT");

    doc.moveDown();

    doc.text(`Client: ${invoice.client.name}`);
    doc.text(`Amount: $${invoice.amount}`);
    doc.text(`Status: PAID`);

    doc.end();

    resolve(path);
  });
};

module.exports = generatePDF;