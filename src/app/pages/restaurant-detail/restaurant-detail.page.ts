import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Restaurant, Food } from '../../models/food.model';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class RestaurantDetailPage implements OnInit {
  restaurant: Restaurant | undefined;
  foods: Food[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService
  ) {}

  ngOnInit() {
    const restaurantId = this.route.snapshot.paramMap.get('id');
    if (restaurantId) {
      this.loadRestaurant(restaurantId);
    }
  }

  loadRestaurant(id: string) {
    this.foodService.getRestaurantById(id).subscribe(restaurant => {
      this.restaurant = restaurant;
    });

    this.foodService.getFoodsByRestaurant(id).subscribe(foods => {
      this.foods = foods;
      this.loading = false;
    });
  }

  addToCart(food: Food) {
    this.foodService.addToCart(food);
  }
}
