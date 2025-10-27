import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InvoiceItem {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  rate: number;

  @IsNumber()
  amount: number;
}

export class InvoiceData {
  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  billTo: string;

  @IsString()
  @IsOptional()
  shipTo: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  paymentTerms: string;

  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @IsString()
  @IsOptional()
  poNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItem)
  items: InvoiceItem[];

  @IsString()
  @IsOptional()
  notes: string;

  @IsString()
  @IsOptional()
  terms: string;

  @IsNumber()
  subtotal: number;

  @IsNumber()
  tax: number;

  @IsNumber()
  total: number;

  @IsNumber()
  paid: number;

  @IsNumber()
  balanceDue: number;
}

export class GeneratePdfResponse {
  pdfBuffer: Buffer;
}
