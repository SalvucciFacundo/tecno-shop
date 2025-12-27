import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-cart-widget',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart-widget.component.html',
  styleUrl: './cart-widget.component.scss',
})
export class CartWidgetComponent {
  protected readonly cartService = inject(CartService);
  protected readonly uiService = inject(UiService);

  // Alias para las signals del servicio
  items = this.cartService.cartItems;
  total = this.cartService.total;
  isOpen = this.uiService.isCartOpen;

  close(): void {
    this.uiService.closeCart();
  }

  removeItem(id: string): void {
    this.cartService.removeFromCart(id);
  }

  clear(): void {
    this.cartService.clearCart();
  }

  checkout(): void {
    this.uiService.openCheckout();
  }
}
