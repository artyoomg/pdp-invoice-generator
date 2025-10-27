import { Input } from "@heroui/input";
import { TrashIcon } from "../../../shared/components/icons";
import { Button } from "@heroui/button";
import { InvoiceItem as InvoiceItemType } from "../../../shared/types/invoice";

type InvoiceItemProps = {
  item: InvoiceItemType;
  onChange: (item: InvoiceItemType) => void;
  onDelete?: () => void;
};

export const InvoiceItem = ({ item, onChange, onDelete }: InvoiceItemProps) => {
  const handleDeleteElement = () => {
    if (onDelete) onDelete();
  };

  const handleItemChange = (field: keyof InvoiceItemType, value: string) => {
    const numericValue = field === 'name' ? value : parseFloat(value) || 0;
    const updatedItem = { ...item, [field]: numericValue };

    // Calculate amount when quantity or rate changes
    if (field === 'quantity' || field === 'rate') {
      updatedItem.amount = updatedItem.quantity * updatedItem.rate;
    }

    onChange(updatedItem);
  };

  return (
    <div className="flex gap-2 items-center h-14">
      <Input
      className="w-4/12"
        type="text"
        label="Name"
        isRequired
        labelPlacement="inside"
        value={item.name}
        onChange={(e) => handleItemChange('name', e.target.value)}
      />
      <Input
        className="w-2/12"
        type="number"
        label="Quantity"
        labelPlacement="inside"
        value={item.quantity.toString()}
        onChange={(e) => handleItemChange('quantity', e.target.value)}
      />
      <Input
        className="w-2/12"
        type="number"
        label="Rate"
        startContent="$"
        labelPlacement="inside"
        value={item.rate.toString()}
        onChange={(e) => handleItemChange('rate', e.target.value)}
      />
      <Input
        className="w-2/12"
        type="number"
        label="Amount"
        labelPlacement="inside"
        startContent="$"
        value={item.amount.toString()}
        isDisabled
        isReadOnly
      />
      <Button variant="ghost" isIconOnly className="h-14 w-2/12" onPress={handleDeleteElement}>
        <TrashIcon size={24} width={32} />
      </Button>
    </div>
  );
};
