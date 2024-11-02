import { Product } from "./product";
export interface shippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
interface Cart {
  orderItems: Product[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAddress?: shippingAddress;
  paymentMethod?: string;
}

export default Cart;
