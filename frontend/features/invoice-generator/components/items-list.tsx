"use client";

import { Button } from "@heroui/button";
import { InvoiceItem } from "./item";
import { useState } from "react";

export const InvoiceItemsList = () => {
  const [items, setItems] = useState(1);

  const handleAddItem = () => {
    setItems(items + 1);
  };

  const handleDeleteItem = () => {
    setItems(items - 1);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold">Items</p>
      {[...Array(items)].map((v, i) => (
        <InvoiceItem key={i} onDelete={handleDeleteItem} />
      ))}
      <Button color="default" variant="ghost" onClick={handleAddItem}>
        +
      </Button>
    </div>
  );
};
