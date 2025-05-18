
import React from 'react';
import ProductTable from '@/components/inventory/ProductTable';
import { productData } from '@/data/mockData';

const Inventory = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground">Manage your product inventory.</p>
      </div>
      
      <div className="animate-fade-in">
        <ProductTable products={productData} />
      </div>
    </div>
  );
};

export default Inventory;
