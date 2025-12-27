import { Component, inject, input } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, NgOptimizedImage, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  id = input.required<string>(); // From route param

  product = toSignal(
    this.productService
      .getProducts()
      .pipe(map((products) => products.find((p) => p.id === this.id())))
  );

  addToCart(): void {
    const p = this.product();
    if (p) {
      this.cartService.addToCart(p);
    }
  }
}
