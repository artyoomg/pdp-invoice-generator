"use client";

import { Button } from "@heroui/button";
import { InvoiceItem } from "./item";
import { InvoiceItem as InvoiceItemType } from "../../../shared/types/invoice";

interface InvoiceItemsListProps {
  items: InvoiceItemType[];
  onChange: (items: InvoiceItemType[]) => void;
}

export const InvoiceItemsList = ({ items, onChange }: InvoiceItemsListProps) => {
  const handleAddItem = () => {
    const newItem: InvoiceItemType = { name: "", quantity: 1, rate: 0, amount: 0 };
    onChange([...items, newItem]);
  };

  const handleDeleteItem = (index: number) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      onChange(newItems);
    }
  };

  const handleItemChange = (index: number, updatedItem: InvoiceItemType) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    onChange(newItems);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold">Items</p>
      {items.map((item, i) => (
        <InvoiceItem 
          key={i} 
          item={item}
          onChange={(updatedItem: InvoiceItemType) => handleItemChange(i, updatedItem)}
          onDelete={() => handleDeleteItem(i)} 
        />
      ))}
      <Button color="default" variant="ghost" onPress={handleAddItem}>
        +
      </Button>
    </div>
  );
};
