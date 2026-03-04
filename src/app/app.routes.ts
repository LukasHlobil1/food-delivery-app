import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'restaurants',
    loadComponent: () => import('./pages/restaurants/restaurants.page').then(m => m.RestaurantsPage)
  },
  {
    path: 'restaurant/:id',
    loadComponent: () => import('./pages/restaurant-detail/restaurant-detail.page').then(m => m.RestaurantDetailPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.page').then(m => m.CartPage)
  },
];
