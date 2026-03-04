import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class CartIconComponent implements OnInit {
  itemCount = 0;

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.foodService.getCart().subscribe(cart => {
      this.itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }
}
