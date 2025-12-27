import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { UiService } from '../../core/services/ui.service';
import { Product } from '../../core/interfaces/product.interface';

import { ProductCardComponent } from '../products/product-card/product-card.component';
import { CartWidgetComponent } from '../cart/cart-widget/cart-widget.component';
import { CheckoutModalComponent } from '../cart/checkout-modal/checkout-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, CartWidgetComponent, CheckoutModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('gridAnimation', [
      transition(':enter', [
        query(
          '.product-card-host',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger('100ms', [
              animate(
                '400ms cubic-bezier(0.4, 0, 0.2, 1)',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
      transition('* => *', [
        query(
          '.product-card-host:enter',
          [
            style({ opacity: 0, transform: 'scale(0.8)' }),
            stagger('50ms', [
              animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class HomeComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private uiService = inject(UiService);

  // Signals
  selectedCategory = signal<string>('ALL');
  maxPrice = signal<number>(5000);
  cartCount = this.cartService.count;
  products = toSignal(this.productService.getProducts(), { initialValue: [] });

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const priceLimit = this.maxPrice();
    const allProducts = this.products();

    return allProducts.filter((p) => {
      const categoryMatch =
        category === 'ALL' || p.category.toUpperCase() === category.toUpperCase();
      const priceMatch = p.price <= priceLimit;
      return categoryMatch && priceMatch;
    });
  });

  categories = ['ALL', 'GPU', 'CPU', 'RAM', 'STORAGE', 'POWER'];

  onAddToCart(product: Product): void {
    // La card ya maneja el CartService directamente ahora, pero mantenemos el output si se requiere lógica extra.
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  updatePrice(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.maxPrice.set(Number(value));
  }

  toggleCart(): void {
    this.uiService.toggleCart();
  }
}
