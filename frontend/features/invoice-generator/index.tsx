import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input, Textarea } from "@heroui/input";
import { InvoiceItemsList } from "./components/items-list";
import { DatePicker } from "@heroui/date-picker";
import { Button } from "@heroui/button";

export default function InvoiceGenerator() {
  return (
    <Card className="w-2/3 p-8">
      <CardHeader className="flex gap-3 justify-end text-right">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">Invoice</p>
          <Input type="text" startContent="#" />
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-7">
            <div className="col-span-4 flex flex-col gap-8">
              <Textarea type="text" placeholder="Who is this from?" />
              <div className="flex gap-2 justify-between">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-foreground-600">Bill to</label>
                  <Input type="text" placeholder="Who is this bill to?" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-foreground-600">Ship to</label>
                  <Input type="text" placeholder="Ship to?" />
                </div>
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-2 flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground-600">Date</label>
                <DatePicker />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground-600">
                  Payment Terms
                </label>
                <Input type="text" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground-600">Due Date</label>
                <DatePicker />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground-600">PO Number</label>
                <Input type="text" />
              </div>
            </div>
          </div>

          <InvoiceItemsList />

          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-2 w-1/2">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground-600">Notes</label>
                <Textarea type="text" size="lg" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground-600">Terms</label>
                <Textarea type="text" size="lg" />
              </div>
            </div>
            <div className="text-sm flex w-1/3 flex-col gap-2 text-foreground-600">
              <div className="grid grid-cols-2 gap-1">
                <label className="flex items-center">Subtotal</label>
                <Input type="text" defaultValue="$0" />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <label className="flex items-center">Tax</label>
                <Input type="text" defaultValue="$0" />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <label className="flex items-center">Total</label>
                <Input type="text" defaultValue="$0" />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <label className="flex items-center">Paid</label>
                <Input type="text" defaultValue="$0" />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <label className="flex items-center">Balance Due</label>
                <Input type="text" defaultValue="$0" />
              </div>
            </div>
          </div>

          <Button color="secondary" size="lg">
            Generate
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
