import { Injectable, computed, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../interfaces/product.interface';
import { CartItem } from '../interfaces/cart-item.interface';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'TECNO_SHOP_CART';
  private platformId = inject(PLATFORM_ID);
  private toastService = inject(ToastService);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Estado principal del carrito usando Signals, inicializado vacío para SSR
  private cartItemsSignal = signal<CartItem[]>([]);

  // Señales públicas (lectura)
  readonly cartItems = this.cartItemsSignal.asReadonly();

  constructor() {
    // Si estamos en el navegador, cargamos los datos iniciales
    if (this.isBrowser) {
      const saved = this.loadFromStorage();
      if (saved.length > 0) {
        this.cartItemsSignal.set(saved);
      }
    }

    // Sincronizar automáticamente con localStorage cada vez que la señal cambie (solo en el navegador)
    effect(() => {
      const items = this.cartItemsSignal();
      if (this.isBrowser) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      }
    });
  }

  private loadFromStorage(): CartItem[] {
    if (!this.isBrowser) return [];
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading cart from storage', e);
      return [];
    }
  }

  // Estado derivado (Computed)
  readonly count = computed(() =>
    this.cartItemsSignal().reduce((acc, item) => acc + item.quantity, 0)
  );

  readonly total = computed(() =>
    this.cartItemsSignal().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  addToCart(product: Product): void {
    this.cartItemsSignal.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...items, { product, quantity: 1 }];
    });

    this.toastService.show(`ITEM_ADDED_TO_QUEUE: ${product.name}`, 'info');
  }

  removeFromCart(productId: string): void {
    this.cartItemsSignal.update((items) => items.filter((item) => item.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItemsSignal.update((items) =>
      items.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
    this.toastService.show('CART_PURGED // SYSTEM_RESET', 'warning');
  }
}
