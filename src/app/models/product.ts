export interface Product {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  description: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
  ingredients: string;
}
