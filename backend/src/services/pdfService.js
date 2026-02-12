import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const exportDir = path.resolve('attendance-exports');
if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

export const exportAttendancePdf = (records, label = 'attendance') => {
  const file = path.join(exportDir, `${label}-${Date.now()}.pdf`);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });
    const stream = fs.createWriteStream(file);

    doc.pipe(stream);
    doc.fontSize(18).text('Attendance Report', { underline: true });
    doc.moveDown();

    records.forEach((record, index) => {
      doc
        .fontSize(11)
        .text(
          `${index + 1}. Worker: ${record.workerId?.name || record.workerId} | Date: ${new Date(
            record.date
          ).toDateString()} | Slot: ${record.slot} | Location: ${record.location} | Status: ${
            record.status || 'present'
          }`
        );
      doc.moveDown(0.3);
    });

    doc.end();
    stream.on('finish', () => resolve(file));
    stream.on('error', reject);
  });
};
