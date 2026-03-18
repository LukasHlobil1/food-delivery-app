import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { Restaurant } from '../../models/food.model';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule]
})
export class RestaurantsPage implements OnInit {
  restaurants: Restaurant[] = [];
  loading = true;

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.foodService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
      this.loading = false;
    });
  }
}
