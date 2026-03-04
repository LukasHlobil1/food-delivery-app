import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Food, Restaurant } from '../../models/food.model';
import { FoodCardComponent } from '../../components/food-card/food-card.component';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { CartIconComponent } from '../../components/cart-icon/cart-icon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    FormsModule,
    FoodCardComponent,
    RestaurantCardComponent,
    CartIconComponent
  ]
})
export class HomePage implements OnInit {
  loading = true;
  promotedRestaurants: Restaurant[] = [];
  popularFoods: Food[] = [];

  categories = [
    { id: 'pizza', name: 'Pizza', icon: 'pizza-outline', gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)' },
    { id: 'burger', name: 'Burgery', icon: 'burger-outline', gradient: 'linear-gradient(135deg, #4ECDC4, #6FD9D1)' },
    { id: 'sushi', name: 'Sushi', icon: 'fish-outline', gradient: 'linear-gradient(135deg, #FFE66D, #FFD93D)' },
    { id: 'asian', name: 'Asijská', icon: 'restaurant-outline', gradient: 'linear-gradient(135deg, #95E1D3, #76C893)' },
    { id: 'dessert', name: 'Dezerty', icon: 'ice-cream-outline', gradient: 'linear-gradient(135deg, #FF9A9E, #FAD0C4)' },
    { id: 'drinks', name: 'Nápoje', icon: 'cafe-outline', gradient: 'linear-gradient(135deg, #A18CD1, #FBC2EB)' },
    { id: 'salad', name: 'Saláty', icon: 'leaf-outline', gradient: 'linear-gradient(135deg, #96E6B3, #56AB2F)' },
    { id: 'pasta', name: 'Těstoviny', icon: 'restaurant-outline', gradient: 'linear-gradient(135deg, #FDC830, #F37335)' }
  ];

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.foodService.getPromotedRestaurants().subscribe(restaurants => {
      this.promotedRestaurants = restaurants;
    });

    this.foodService.getPopularFoods().subscribe(foods => {
      this.popularFoods = foods;
      this.loading = false;
    });
  }

  search(event: any) {
    const query = event.target.value;
    if (query && query.trim() !== '') {
      // Implement search
    }
  }

  onSearchFocus() {
    // Handle search focus
  }

  goToRestaurant(restaurantId: string) {
    // Navigate to restaurant detail
  }

  addToCart(food: Food) {
    this.foodService.addToCart(food);
  }
}
