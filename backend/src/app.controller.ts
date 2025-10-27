import {
  Controller,
  Post,
  Body,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { InvoiceData } from './types/invoice.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate-invoice')
  async generateInvoice(
    @Body() invoiceData: InvoiceData,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const result = await this.appService.generateInvoicePdf(invoiceData);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="invoice-${invoiceData.invoiceNumber || 'unknown'}.pdf"`,
      'Content-Length': result.pdfBuffer.length.toString(),
    });

    return new StreamableFile(result.pdfBuffer);
  }
}
