export interface Invoice {
  invoice: string;
  billFrom: {
    name: string;
    email: string;
    address: string;
  };
  billTo: { name: string; email: string; imageUrl: string; address: string };

  // products: [{
  //   name: string;
  //   price: number;
  //   quantity: number;
  // }];
  totalAmount: number;
  status: string;
  dueDate: string;
  issuedDate: string;
}
