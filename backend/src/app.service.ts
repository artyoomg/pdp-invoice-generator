import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { InvoiceData, GeneratePdfResponse } from './types/invoice.types';

@Injectable()
export class AppService {
  async generateInvoicePdf(
    invoiceData: InvoiceData,
  ): Promise<GeneratePdfResponse> {
    try {
      const doc = new PDFDocument({ margin: 20 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));

      this.addHeader(doc);
      this.addInvoiceInfo(doc, invoiceData);
      this.addBillingInfo(doc, invoiceData);
      this.addItemsTable(doc, invoiceData);
      this.addTotals(doc, invoiceData);
      this.addFooter(doc, invoiceData);

      doc.end();

      return new Promise((resolve) => {
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve({
            pdfBuffer,
          });
        });
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private addHeader(doc: typeof PDFDocument): void {
    doc.fontSize(20).text('INVOICE', 450, 50).fontSize(12);
  }

  private addInvoiceInfo(doc: typeof PDFDocument, data: InvoiceData): void {
    const startY = 100;

    // Invoice number and date info (right side)
    doc
      .text(`Invoice #: ${data.invoiceNumber}`, 450, startY)
      .text(`Date: ${data.date}`, 450, startY + 15)
      .text(`Payment Terms: ${data.paymentTerms}`, 450, startY + 30)
      .text(`Due Date: ${data.dueDate}`, 450, startY + 45);

    if (data.poNumber) {
      doc.text(`PO Number: ${data.poNumber}`, 450, startY + 60);
    }
  }

  private addBillingInfo(doc: typeof PDFDocument, data: InvoiceData): void {
    const startY = 100;

    if (data.from) {
      doc
        .text('From:', 50, startY)
        .text(data.from, 50, startY + 15, { width: 200 });
    }

    if (data.billTo) {
      doc
        .text('Bill To:', 50, startY + 80)
        .text(data.billTo, 50, startY + 95, { width: 200 });
    }

    if (data.shipTo) {
      doc
        .text('Ship To:', 50, startY + 160)
        .text(data.shipTo, 50, startY + 175, { width: 200 });
    }
  }

  private addItemsTable(doc: typeof PDFDocument, data: InvoiceData): void {
    const tableTop = 325;
    const itemCodeX = 50;
    const descriptionX = 150;
    const quantityX = 350;
    const rateX = 430;
    const amountX = 510;

    // Table header
    doc
      .fontSize(10)
      .text('Item', itemCodeX, tableTop)
      .text('Description', descriptionX, tableTop)
      .text('Qty', quantityX, tableTop)
      .text('Rate', rateX, tableTop)
      .text('Amount', amountX, tableTop);

    doc
      .strokeColor('#aaaaaa')
      .lineWidth(1)
      .moveTo(50, tableTop + 15)
      .lineTo(550, tableTop + 15)
      .stroke();

    let currentY = tableTop + 25;

    data.items.forEach((item, index) => {
      doc
        .fontSize(9)
        .text((index + 1).toString(), itemCodeX, currentY)
        .text(item.name, descriptionX, currentY, { width: 180 })
        .text(item.quantity.toString(), quantityX, currentY)
        .text(`$${item.rate.toFixed(2)}`, rateX, currentY)
        .text(`$${item.amount.toFixed(2)}`, amountX, currentY);

      currentY += 20;
    });

    doc
      .strokeColor('#aaaaaa')
      .lineWidth(1)
      .moveTo(50, currentY)
      .lineTo(550, currentY)
      .stroke();
  }

  private addTotals(doc: typeof PDFDocument, data: InvoiceData): void {
    const totalsX = 400;
    let currentY = 480;

    doc
      .fontSize(10)
      .text('Subtotal:', totalsX, currentY)
      .text(`$${data.subtotal.toFixed(2)}`, totalsX + 100, currentY)
      .text('Tax:', totalsX, currentY + 15)
      .text(`$${data.tax.toFixed(2)}`, totalsX + 100, currentY + 15)
      .text('Total:', totalsX, currentY + 30)
      .text(`$${data.total.toFixed(2)}`, totalsX + 100, currentY + 30)
      .text('Paid:', totalsX, currentY + 45)
      .text(`$${data.paid.toFixed(2)}`, totalsX + 100, currentY + 45);

    doc
      .fontSize(12)
      .text('Balance Due:', totalsX, currentY + 65)
      .text(`$${data.balanceDue.toFixed(2)}`, totalsX + 100, currentY + 65);
  }

  private addFooter(doc: typeof PDFDocument, data: InvoiceData): void {
    let currentY = 600;

    if (data.notes) {
      doc
        .fontSize(10)
        .text('Notes:', 50, currentY)
        .text(data.notes, 50, currentY + 15, { width: 500 });
      currentY += 60;
    }

    if (data.terms) {
      doc
        .fontSize(10)
        .text('Terms:', 50, currentY)
        .text(data.terms, 50, currentY + 15, { width: 500 });
    }
  }
}
