"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input, Textarea } from "@heroui/input";
import { InvoiceItemsList } from "./components/items-list";
import { DatePicker } from "@heroui/date-picker";
import { Button } from "@heroui/button";
import { useState } from "react";
import { InvoiceData, InvoiceItem } from "../../shared/types/invoice";
import { generateInvoicePDF, downloadPDF } from "../../shared/api/invoice";
import { addToast } from "@heroui/toast";

export default function InvoiceGenerator() {
  const [formData, setFormData] = useState<Partial<InvoiceData>>({
    invoiceNumber: "",
    from: "",
    billTo: "",
    shipTo: "",
    date: "",
    paymentTerms: "",
    dueDate: "",
    poNumber: "",
    items: [{ name: "", quantity: 1, rate: 0, amount: 0 }],
    notes: "",
    terms: "",
    subtotal: 0,
    tax: 0,
    total: 0,
    paid: 0,
    balanceDue: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof InvoiceData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemsChange = (items: InvoiceItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal + (formData.tax || 0);
    const balanceDue = total - (formData.paid || 0);

    setFormData(prev => ({
      ...prev,
      items,
      subtotal,
      total,
      balanceDue
    }));
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);

      // Validate required fields
      if (!formData.invoiceNumber || !formData.from || !formData.billTo || !formData.date || !formData.paymentTerms || !formData.dueDate) {
        addToast({
          description: "Please fill in all required fields",
          shouldShowTimeoutProgress: true,
          color: "danger"
        });
        return;
      }

      const invoiceData = formData as InvoiceData;
      const pdfBlob = await generateInvoicePDF(invoiceData);
      const filename = `invoice-${invoiceData.invoiceNumber}.pdf`;
      downloadPDF(pdfBlob, filename);
      addToast({
        description: "Successfully generated PDF invoice. Downloading will start automatically",
        shouldShowTimeoutProgress: true,
        color: "success"
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      addToast({
        description: "Failed to generate PDF. Please try again.",
        shouldShowTimeoutProgress: true,
        color: "danger"
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white/7 rounded-2xl w-2/3">
      <Card className="w-full p-8" isBlurred>
        <CardHeader className="flex gap-3 justify-end text-right">
          <div className="flex flex-col gap-2">
            <Input
              label="Invoice"
              labelPlacement="inside"
              type="text"
              startContent="#"
              isRequired
              value={formData.invoiceNumber}
              onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
            />
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-7">
              <div className="col-span-4 flex flex-col gap-8">
                <Textarea
                  label="Who is this from?"
                  type="text"
                  labelPlacement="inside"
                  value={formData.from}
                  isRequired
                  onChange={(e) => handleInputChange('from', e.target.value)}
                />
                <div className="flex gap-2 justify-between">
                  <div className="flex flex-col gap-1">
                    <Input
                      label="Who is this bill to?"
                      type="text"
                      labelPlacement="inside"
                      value={formData.billTo}
                      isRequired
                      onChange={(e) => handleInputChange('billTo', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Input
                      type="text"
                      label="Ship to?"
                      labelPlacement="inside"
                      value={formData.shipTo}
                      onChange={(e) => handleInputChange('shipTo', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-2 flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <DatePicker
                    label="Date"
                    labelPlacement="inside"
                    isRequired
                    onChange={(date) => {
                      if (date) {
                        handleInputChange('date', date.toString());
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    type="text"
                    label="Payment Terms"
                    labelPlacement="inside"
                    value={formData.paymentTerms}
                    isRequired
                    onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <DatePicker
                    label="Due Date"
                    labelPlacement="inside"
                    isRequired
                    onChange={(date) => {
                      if (date) {
                        handleInputChange('dueDate', date.toString());
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    label="PO Number"
                    labelPlacement="inside"
                    type="text"
                    value={formData.poNumber}
                    onChange={(e) => handleInputChange('poNumber', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <InvoiceItemsList
              items={formData.items || []}
              onChange={handleItemsChange}
            />

            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-2 w-1/2">
                <div className="flex flex-col gap-1">
                  <Textarea
                    label="Notes"
                    labelPlacement="inside"
                    type="text"
                    size="lg"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Textarea
                    label="Terms"
                    labelPlacement="inside"
                    type="text"
                    size="lg"
                    value={formData.terms}
                    onChange={(e) => handleInputChange('terms', e.target.value)}
                  />
                </div>
              </div>
              <div className="text-sm flex w-1/3 flex-col gap-2 text-foreground-600">
                <div>
                  <Input
                    label="Subtotal"
                    startContent="$"
                    labelPlacement="inside"
                    type="number"
                    value={formData.subtotal?.toString() || "0"}
                    readOnly
                    isDisabled
                  />
                </div>
                <div>
                  <Input
                    label="Tax"
                    labelPlacement="inside"
                    startContent="$"
                    type="number"
                    value={formData.tax?.toString() || "0"}
                    onChange={(e) => {
                      const tax = parseFloat(e.target.value) || 0;
                      const total = (formData.subtotal || 0) + tax;
                      const balanceDue = total - (formData.paid || 0);
                      setFormData(prev => ({ ...prev, tax, total, balanceDue }));
                    }}
                  />
                </div>
                <div>
                  <Input
                    label="Total"
                    labelPlacement="inside"
                    startContent="$"
                    type="number"
                    value={formData.total?.toString() || "0"}
                    readOnly
                    isDisabled
                  />
                </div>
                <div>
                  <Input
                    label="Paid"
                    labelPlacement="inside"
                    startContent="$"
                    type="number"
                    fullWidth
                    value={formData.paid?.toString() || "0"}
                    onChange={(e) => {
                      const paid = parseFloat(e.target.value) || 0;
                      const balanceDue = (formData.total || 0) - paid;
                      setFormData(prev => ({ ...prev, paid, balanceDue }));
                    }}
                  />
                </div>
                <div>
                  <Input
                    label="Balance Due"
                    labelPlacement="inside"
                    startContent="$"
                    type="number"
                    value={formData.balanceDue?.toString() || "0"}
                    readOnly
                    isDisabled
                  />
                </div>
              </div>
            </div>

            <Button
              color="primary"
              size="lg"
              onPress={handleGenerate}
              isLoading={loading}
            >
              Generate PDF
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
