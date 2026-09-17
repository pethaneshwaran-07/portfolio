const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateResumePDF() {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  const outputPath = path.join(__dirname, '../public/resume.pdf');
  
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Header
  doc.font('Helvetica-Bold').fontSize(22).text('HARISH MURUGAN P', { align: 'center' });
  doc.moveDown(0.2);
  doc.font('Helvetica').fontSize(10).text('harishpethanesh@gmail.com | +91 9345530058 | Coimbatore, Tamil Nadu', { align: 'center' });
  
  doc.moveDown(0.6);
  doc.lineWidth(1).strokeColor('#cccccc').moveTo(40, doc.y).lineTo(555, doc.y).stroke();
  doc.moveDown(0.6);

  // Section Heading Helper
  const addSectionHeading = (title) => {
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#000000').text(title);
    doc.moveDown(0.2);
  };

  // PROFESSIONAL SUMMARY
  addSectionHeading('PROFESSIONAL SUMMARY');
  doc.font('Helvetica').fontSize(9.5).fillColor('#333333').text(
    'Entry-level SAP FI / SAP FICO candidate with a B.Com in Accounts, pursuing an MBA in Finance, and practical exposure to SAP FI through training and a financial accounting mini project. Knowledge of General Ledger (GL), Accounts Payable (AP), Accounts Receivable (AR), Asset Accounting, Bank Accounting, journal entries, invoice processing, payments, reconciliation, master data, and financial reporting. Also experienced in stock audit, inventory reconciliation, accounting records, spreadsheets, and ITR process exposure.',
    { align: 'justify', lineGap: 2 }
  );
  doc.moveDown(0.8);

  // TECHNICAL SKILLS
  addSectionHeading('TECHNICAL SKILLS');
  
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000').text('SAP FI / FICO: ', { continued: true });
  doc.font('Helvetica').fontSize(9.5).fillColor('#333333').text('General Ledger (GL), Accounts Payable (AP), Accounts Receivable (AR), Asset Accounting, Bank Accounting, Vendor Master Data, Customer Master Data, Journal Entries, Invoice Processing, Payment Processing, Account Reconciliation, Financial Reporting, Financial Transactions');
  doc.moveDown(0.3);

  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000').text('SAP S/4HANA: ', { continued: true });
  doc.font('Helvetica').fontSize(9.5).fillColor('#333333').text('Company Code, Chart of Accounts, Posting Periods, Document Types, Basic SAP FI Configuration Concepts, SAP FI Integration Exposure with SAP MM and SD');
  doc.moveDown(0.3);

  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000').text('Accounting & Tools: ', { continued: true });
  doc.font('Helvetica').fontSize(9.5).fillColor('#333333').text('Financial Accounting, Inventory Reconciliation, Stock Audit, MS Excel, Tally, Income Tax Return (ITR) Process Exposure');
  doc.moveDown(0.8);

  // SAP TRAINING & CERTIFICATION
  addSectionHeading('SAP TRAINING & CERTIFICATION');
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000').text('SAP FI Training | Techmaax Academy, Coimbatore ', { continued: true });
  doc.font('Helvetica').fontSize(9.5).fillColor('#666666').text('| Jul 2026 – Present');
  doc.moveDown(0.2);
  doc.font('Helvetica').fontSize(9.5).fillColor('#333333').text(
    'Completed training covering GL, AP, AR, Asset Accounting, and Bank Accounting, with practical exposure to financial transactions and SAP FI mini-project activities.'
  );
  doc.moveDown(0.8);

  // PROJECT
  addSectionHeading('PROJECT');
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000').text('SAP S/4HANA FI Implementation for Titan Company Limited – Financial Accounting Mini Project ', { continued: true });
  doc.font('Helvetica').fontSize(9.5).fillColor('#666666').text('| Sep 2026 – Present');
  doc.moveDown(0.3);

  const projectBullets = [
    'Worked on end-to-end SAP FI financial accounting transaction processing across GL, AP, AR, Asset Accounting, and Bank Accounting.',
    'Practiced vendor and customer master data, journal entries, invoice processing, payment processing, account reconciliation, and financial reporting.',
    'Practiced basic SAP FI configuration concepts including company code, chart of accounts, posting periods, and document types.',
    'Analyzed accounting entries and supported accurate financial data recording and reporting.',
    'Developed practical understanding of SAP FI business processes and integration exposure with SAP MM and SD.'
  ];

  projectBullets.forEach(b => {
    doc.font('Helvetica').fontSize(9.5).fillColor('#333333').text('•  ' + b, { indent: 10, lineGap: 1.5 });
  });
  doc.moveDown(0.8);

  // PROFESSIONAL EXPERIENCE
  addSectionHeading('PROFESSIONAL EXPERIENCE');

  // Job 1
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000').text('Stock Audit Intern | Pradeep Associates, Madurai ', { continued: true });
  doc.font('Helvetica').fontSize(9.5).fillColor('#666666').text('| Mar 2026 – Jun 2026');
  doc.moveDown(0.2);
  const exp1Bullets = [
    'Performed physical stock verification and maintained accurate inventory records.',
    'Reconciled physical stock with system records and identified inventory variances.',
    'Assisted with inventory management, data entry, and reporting to support timely and accurate stock updates.'
  ];
  exp1Bullets.forEach(b => {
    doc.font('Helvetica').fontSize(9.5).fillColor('#333333').text('•  ' + b, { indent: 10, lineGap: 1.5 });
  });
  doc.moveDown(0.5);

  // Job 2
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000').text('Financial Accounting & Tax Intern | Anandha Kumar Associates, Theni ', { continued: true });
  doc.font('Helvetica').fontSize(9.5).fillColor('#666666').text('| Nov 2023');
  doc.moveDown(0.2);
  const exp2Bullets = [
    'Assisted in managing, organizing, and maintaining client financial records, data sheets, and spreadsheets.',
    'Gained practical exposure to Income Tax Return (ITR) filing processes and portal record maintenance.',
    'Communicated with clients by phone, email, and in person to collect financial documentation.'
  ];
  exp2Bullets.forEach(b => {
    doc.font('Helvetica').fontSize(9.5).fillColor('#333333').text('•  ' + b, { indent: 10, lineGap: 1.5 });
  });
  doc.moveDown(0.8);

  // EDUCATION
  addSectionHeading('EDUCATION');
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000').text('MBA (Distance) – Finance | Bharathidasan University ', { continued: true });
  doc.font('Helvetica').fontSize(9.5).fillColor('#666666').text('| 2025 – 2027');
  doc.moveDown(0.2);
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000').text('B.Com – Accounts | Sri Ramakrishna College of Arts and Science ', { continued: true });
  doc.font('Helvetica').fontSize(9.5).fillColor('#666666').text('| 2021 – 2024');
  doc.moveDown(0.8);

  // PORTFOLIO
  addSectionHeading('PORTFOLIO');
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000').text('GitHub: ', { continued: true });
  doc.font('Helvetica').fontSize(9.5).fillColor('#333333').text('Project link to be added');

  doc.end();

  stream.on('finish', () => {
    console.log('Successfully generated public/resume.pdf from client resume!');
  });
}

generateResumePDF();
