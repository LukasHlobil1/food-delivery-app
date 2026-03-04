import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FoodCardComponent {
  @Input() food!: Food;
  @Output() addToCart = new EventEmitter<Food>();
  @Output() viewDetails = new EventEmitter<Food>();

  isHovered = false;

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.food);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.food);
  }

  getPrice(): number {
    return this.food.discountPrice || this.food.price;
  }

  getOriginalPrice(): number | null {
    return this.food.discountPrice ? this.food.price : null;
  }

  getDiscountPercentage(): number {
    if (!this.food.discountPrice) return 0;
    return Math.round(((this.food.price - this.food.discountPrice) / this.food.price) * 100);
  }
}
