import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Input, Textarea } from "@heroui/input";
import { InvoiceItemsList } from "./components/items-list";
import { DatePicker } from "@heroui/date-picker";
import { Button } from "@heroui/button"

export default function InvoiceGenerator() {
    return (
        <Card className="w-2/3 p-8">
            <CardHeader className="flex gap-3 justify-end text-right">
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold">Invoice</p>
                    <Input type="text" size="sm" startContent="#" />
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
                                    <Input type="text" defaultValue="Bill to" variant="bordered" size="sm" />
                                    <Input type="text" placeholder="Who is this bill to?" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Input type="text" defaultValue="Ship to" variant="bordered" size="sm" />
                                    <Input type="text" placeholder="Ship to?" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1"></div>
                        <div className="col-span-2 flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Input type="text" defaultValue="Date" variant="bordered" size="sm" />
                                <DatePicker />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Input type="text" defaultValue="Payment Terms" variant="bordered" size="sm" />
                                <Input type="text"/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Input type="text" defaultValue="Due Date" variant="bordered" size="sm" />
                                <DatePicker />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Input type="text" defaultValue="PO Number" variant="bordered" size="sm" />
                                <Input type="text" />
                            </div>
                        </div>
                    </div>

                    <InvoiceItemsList />

                    <div className="flex justify-between w-full">
                        <div className="flex flex-col gap-2 w-1/2">
                            <div className="flex flex-col gap-1">
                                <Input type="text" defaultValue="Notes" variant="bordered" size="sm" />
                                <Textarea type="text" size="lg" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Input type="text" defaultValue="Terms" variant="bordered" size="sm" />
                                <Textarea type="text" size="lg" />
                            </div>
                        </div>
                        <div className="text-sm flex flex-col gap-2 text-foreground-600">
                            <p>Subtotal: $0</p>
                            <p>Tax: $0</p>
                            <p>Total: $0</p>
                            <p>Paid: $0</p>
                            <p>Balance Due: $0</p>
                        </div>

                    </div>
                    <Button variant="flat" color="secondary" size="lg">Generate</Button>
                </div>

            </CardBody>

        </Card>
    );
}
