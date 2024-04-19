export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface Invoice {
  id: number;
  invoice: string;
  billFrom: {
    name: string;
    email: string;
    address: string;
  };
  billTo: {
    name: string;
    email: string;
    imageUrl: string;
    address: string;
  };
  products: Product[];
  totalAmount: number;
  status: string;
  dueDate: string;
  issuedDate: string;
}
