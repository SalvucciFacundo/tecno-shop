export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  specs: {
    [key: string]: string;
  };
}
