export interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  restaurantId: string;
  category: string;
  ingredients: string[];
  isVegetarian: boolean;
  isSpicy: boolean;
  isPopular: boolean;
  rating: number;
  totalRatings: number;
  preparationTime: number;
  allergens: string[];
}

export interface CartItem {
  food: Food;
  quantity: number;
  specialInstructions?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  coverImageUrl: string;
  cuisine: string[];
  rating: number;
  totalRatings: number;
  deliveryTime: number;
  deliveryFee: number;
  minOrderAmount: number;
  isOpen: boolean;
  isPromoted: boolean;
  distance: number;
  address: string;
  phone: string;
  openingHours: OpeningHours;
}

export interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  discountAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: Address;
  estimatedDeliveryTime: Date;
  createdAt: Date;
  specialInstructions?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  ONLINE = 'online'
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  label: string;
}
