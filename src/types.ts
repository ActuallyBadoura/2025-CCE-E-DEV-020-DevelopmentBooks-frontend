export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

export interface BasketRequest {
  basket: number[];
}

export interface BasketResponse {
  totalPrice: number;
  currency: string;
}

export interface BooksResponse {
  books: Book[]; // list of Book items
}