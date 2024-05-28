import { Injectable } from '@angular/core';

export interface Product{
  id: number;
  name: string;
  details: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  category: string;
  favorite: boolean;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  // Furniture Products
  furnitureProducts: Product[] = [
    {
      id: 1,
      name: 'Chair',
      details: 'Lorem ipsum dolor sit amet consectetur.',
      description: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur',
      price: 200,
      imageUrl: 'assets/ecommerce/furniture/chair.webp',
      rating: 5,
      category: 'living-room',
      favorite: false,
      status: 'INSTOCK'
    },
    {
      id: 2,
      name: 'Flowerpot',
      details: 'Lorem ipsum dolor sit amet consectetur.',
      description: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur',
      price: 15,
      imageUrl: 'assets/ecommerce/furniture/flowerpot.webp',
      rating: 3,
      category: 'living-room',
      favorite: false,
      status: 'LOWSTOCK'
    },
    {
      id: 3,
      name: 'Table',
      details: 'Lorem ipsum dolor sit amet consectetur.',
      description: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur',
      price: 300,
      imageUrl: 'assets/ecommerce/furniture/table.webp',
      rating: 4,
      category: 'living-room',
      favorite: false,
      status: 'INSTOCK'
    },
    {
      id: 4,
      name: 'Nightstand',
      details: 'Lorem ipsum dolor sit amet consectetur.',
      description: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur',
      price: 150,
      imageUrl: 'assets/ecommerce/furniture/nightstand.webp',
      rating: 4,
      category: 'bedroom',
      favorite: false,
      status: 'LOWSTOCK'
    },
    {
      id: 5,
      name: 'Sofa',
      details: 'Lorem ipsum dolor sit amet consectetur.',
      description: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur',
      price: 500,
      imageUrl: 'assets/ecommerce/furniture/sofa.webp',
      rating: 5,
      category: 'living-room',
      favorite: false,
      status: 'OUTOFSTOCK'
    },
    {
      id: 5,
      name: 'Easel',
      details: 'Lorem ipsum dolor sit amet consectetur.',
      description: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur',
      price: 80,
      imageUrl: 'assets/ecommerce/furniture/easel.webp',
      rating: 4,
      category: 'workspace',
      favorite: false,
      status: 'INSTOCK'
    },
    {
      id: 6,
      name: 'Table',
      details: 'Lorem ipsum dolor sit amet consectetur.',
      description: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur',
      price: 200,
      imageUrl: 'assets/ecommerce/furniture/kitchen_table.webp',
      rating: 5,
      category: 'kitchen',
      favorite: false,
      status: 'OUTOFSTOCK'
    },
    {
      id: 7,
      name: 'Desk',
      details: 'Lorem ipsum dolor sit amet consectetur.',
      description: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur',
      price: 100,
      imageUrl: 'assets/ecommerce/furniture/desk.webp',
      rating: 4,
      category: 'workspace',
      favorite: false,
      status: 'LOWSTOCK'
    }
  ];

  getProducts(){
    return this.furnitureProducts;
  }

  getLatestsProducts(){
    return this.furnitureProducts.slice(0, 4);
  }

  addProduct(product: Product){
    this.furnitureProducts.push(product);
  }

  deleteProduct(product: Product){
    const index = this.furnitureProducts.indexOf(product);
    this.furnitureProducts.splice(index, 1);
  }

}
