import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private cartOpenSignal = signal<boolean>(false);
  private checkoutOpenSignal = signal<boolean>(false);

  readonly isCartOpen = this.cartOpenSignal.asReadonly();
  readonly isCheckoutOpen = this.checkoutOpenSignal.asReadonly();

  toggleCart(): void {
    this.cartOpenSignal.update((state) => !state);
  }

  openCart(): void {
    this.cartOpenSignal.set(true);
  }

  closeCart(): void {
    this.cartOpenSignal.set(false);
  }

  openCheckout(): void {
    this.cartOpenSignal.set(false); // Cerramos el carrito al abrir checkout
    this.checkoutOpenSignal.set(true);
  }

  closeCheckout(): void {
    this.checkoutOpenSignal.set(false);
  }
}
