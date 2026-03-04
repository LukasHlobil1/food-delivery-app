import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Food, Restaurant, CartItem, Order } from '../models/food.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private restaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Pizza Napoli',
      description: 'Autentická italská pizza pečená v kamenné peci',
      imageUrl: 'assets/images/restaurants/pizza-napoli.jpg',
      coverImageUrl: 'assets/images/restaurants/pizza-napoli-cover.jpg',
      cuisine: ['Italská', 'Pizza'],
      rating: 4.8,
      totalRatings: 1250,
      deliveryTime: 25,
      deliveryFee: 49,
      minOrderAmount: 200,
      isOpen: true,
      isPromoted: true,
      distance: 1.2,
      address: 'Hlavní 123, Praha',
      phone: '+420 123 456 789',
      openingHours: {
        monday: '10:00 - 22:00',
        tuesday: '10:00 - 22:00',
        wednesday: '10:00 - 22:00',
        thursday: '10:00 - 22:00',
        friday: '10:00 - 23:00',
        saturday: '11:00 - 23:00',
        sunday: '11:00 - 22:00'
      }
    },
    {
      id: '2',
      name: 'Sushi Master',
      description: 'Čerstvé sushi a japonské speciality',
      imageUrl: 'assets/images/restaurants/sushi-master.jpg',
      coverImageUrl: 'assets/images/restaurants/sushi-master-cover.jpg',
      cuisine: ['Japonská', 'Sushi'],
      rating: 4.9,
      totalRatings: 890,
      deliveryTime: 35,
      deliveryFee: 59,
      minOrderAmount: 300,
      isOpen: true,
      isPromoted: true,
      distance: 2.5,
      address: 'Náměstí 45, Praha',
      phone: '+420 987 654 321',
      openingHours: {
        monday: '11:00 - 21:00',
        tuesday: '11:00 - 21:00',
        wednesday: '11:00 - 21:00',
        thursday: '11:00 - 21:00',
        friday: '11:00 - 22:00',
        saturday: '12:00 - 22:00',
        sunday: '12:00 - 21:00'
      }
    },
    {
      id: '3',
      name: 'Burger House',
      description: 'Gurmánské burgery z čerstvých surovin',
      imageUrl: 'assets/images/restaurants/burger-house.jpg',
      coverImageUrl: 'assets/images/restaurants/burger-house-cover.jpg',
      cuisine: ['Americká', 'Burgery'],
      rating: 4.6,
      totalRatings: 2100,
      deliveryTime: 20,
      deliveryFee: 39,
      minOrderAmount: 150,
      isOpen: true,
      isPromoted: false,
      distance: 0.8,
      address: 'Masarykova 67, Praha',
      phone: '+420 555 123 456',
      openingHours: {
        monday: '09:00 - 23:00',
        tuesday: '09:00 - 23:00',
        wednesday: '09:00 - 23:00',
        thursday: '09:00 - 23:00',
        friday: '09:00 - 00:00',
        saturday: '10:00 - 00:00',
        sunday: '10:00 - 22:00'
      }
    }
  ];

  private foods: Food[] = [
    {
      id: '1',
      name: 'Margherita',
      description: 'Rajčatová omáčka, mozzarella, bazalka',
      price: 179,
      imageUrl: 'assets/images/foods/margherita.jpg',
      restaurantId: '1',
      category: 'Pizza',
      ingredients: ['rajčata', 'mozzarella', 'bazalka'],
      isVegetarian: true,
      isSpicy: false,
      isPopular: true,
      rating: 4.7,
      totalRatings: 890,
      preparationTime: 15,
      allergens: ['lepek', 'mléko']
    },
    {
      id: '2',
      name: 'California Roll',
      description: 'Krabí maso, avokádo, okurka',
      price: 249,
      discountPrice: 199,
      imageUrl: 'assets/images/foods/california-roll.jpg',
      restaurantId: '2',
      category: 'Sushi',
      ingredients: ['rýže', 'krab', 'avokádo', 'okurka'],
      isVegetarian: false,
      isSpicy: false,
      isPopular: true,
      rating: 4.9,
      totalRatings: 567,
      preparationTime: 20,
      allergens: ['ryby', 'soja']
    },
    {
      id: '3',
      name: 'Double Cheese Burger',
      description: 'Dvě hovězí placky, čedar, salát',
      price: 199,
      imageUrl: 'assets/images/foods/double-cheese.jpg',
      restaurantId: '3',
      category: 'Burgery',
      ingredients: ['hovězí maso', 'čedar', 'salát'],
      isVegetarian: false,
      isSpicy: false,
      isPopular: true,
      rating: 4.8,
      totalRatings: 1234,
      preparationTime: 12,
      allergens: ['lepek', 'mléko']
    }
  ];

  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private orders = new BehaviorSubject<Order[]>([]);

  constructor() {
    this.loadCart();
  }

  getRestaurants(): Observable<Restaurant[]> {
    return of(this.restaurants).pipe(delay(500));
  }

  getPromotedRestaurants(): Observable<Restaurant[]> {
    const promoted = this.restaurants.filter(r => r.isPromoted);
    return of(promoted).pipe(delay(500));
  }

  getRestaurantById(id: string): Observable<Restaurant | undefined> {
    const restaurant = this.restaurants.find(r => r.id === id);
    return of(restaurant).pipe(delay(300));
  }

  getFoodsByRestaurant(restaurantId: string): Observable<Food[]> {
    const foods = this.foods.filter(f => f.restaurantId === restaurantId);
    return of(foods).pipe(delay(500));
  }

  getPopularFoods(): Observable<Food[]> {
    const popular = this.foods.filter(f => f.isPopular);
    return of(popular).pipe(delay(500));
  }

  searchFoods(query: string): Observable<Food[]> {
    const filtered = this.foods.filter(f =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.description.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }

  getCart(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(food: Food, quantity: number = 1): void {
    const currentCart = this.cartItems.value;
    const existingItem = currentCart.find(item => item.food.id === food.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({ food, quantity });
    }

    this.cartItems.next([...currentCart]);
    this.saveCart();
  }

  removeFromCart(foodId: string): void {
    const currentCart = this.cartItems.value.filter(item => item.food.id !== foodId);
    this.cartItems.next(currentCart);
    this.saveCart();
  }

  updateQuantity(foodId: string, quantity: number): void {
    const currentCart = this.cartItems.value;
    const item = currentCart.find(item => item.food.id === foodId);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(foodId);
      } else {
        item.quantity = quantity;
        this.cartItems.next([...currentCart]);
        this.saveCart();
      }
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.saveCart();
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce((total, item) =>
      total + (item.food.discountPrice || item.food.price) * item.quantity, 0
    );
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((count, item) => count + item.quantity, 0);
  }

  createOrder(orderData: any): Observable<Order> {
    const newOrder: Order = {
      id: Date.now().toString(),
      userId: 'user1',
      restaurantId: orderData.restaurantId,
      restaurantName: orderData.restaurantName,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      deliveryFee: orderData.deliveryFee || 0,
      discountAmount: orderData.discountAmount || 0,
      status: OrderStatus.PENDING,
      paymentMethod: orderData.paymentMethod,
      deliveryAddress: orderData.deliveryAddress,
      estimatedDeliveryTime: new Date(Date.now() + 45 * 60000),
      createdAt: new Date(),
      specialInstructions: orderData.specialInstructions
    };

    const currentOrders = this.orders.value;
    currentOrders.push(newOrder);
    this.orders.next(currentOrders);
    this.clearCart();

    return of(newOrder).pipe(delay(1000));
  }

  getOrders(): Observable<Order[]> {
    return this.orders.asObservable();
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }
}
