import { Component, ChangeDetectionStrategy, input, output, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '../../../core/interfaces/product.interface';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'product-card-host',
  },
})
export class ProductCardComponent {
  private cartService = inject(CartService);

  product = input.required<Product>();
  addToCart = output<Product>();

  // Estado local para el feedback del botón
  isProcessing = signal(false);

  onAddToCart(): void {
    if (this.isProcessing()) return;

    this.isProcessing.set(true);

    // Simular procesamiento del sistema futurista
    setTimeout(() => {
      this.cartService.addToCart(this.product());
      this.addToCart.emit(this.product());
      this.isProcessing.set(false);
    }, 800);
  }
}
