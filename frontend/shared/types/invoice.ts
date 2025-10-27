export interface InvoiceItem {
  name: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber?: string;
  from?: string;
  billTo?: string;
  shipTo?: string;
  date?: string;
  paymentTerms?: string;
  dueDate?: string;
  poNumber?: string;
  items: InvoiceItem[];
  notes?: string;
  terms?: string;
  subtotal: number;
  tax?: number;
  total?: number;
  paid?: number;
  balanceDue?: number;
}
