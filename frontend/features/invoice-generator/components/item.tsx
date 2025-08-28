import { Input } from "@heroui/input"
import { TrashIcon } from "../../../shared/components/icons"
import { Button } from "@heroui/button"

type InvoiceItemProps = {
    onDelete?: () => void;
};

export const InvoiceItem = ({ onDelete }: InvoiceItemProps) => {
    const handleDeleteElement = () => {
        if (onDelete) onDelete();
    };


    return (<div className="flex gap-2 items-center">
        <Input type="text" placeholder="Name" />
        <Input className="max-w-24" type="number" placeholder="Quantity" />
        <Input className="max-w-24" type="number" placeholder="Rate" />
        <Input className="max-w-24" type="number" placeholder="Amount" />
        <Button variant="ghost" onClick={handleDeleteElement}>
            <TrashIcon width={48} />
        </Button>
    </div>)
}