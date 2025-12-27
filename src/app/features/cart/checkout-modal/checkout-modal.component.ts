import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-modal.component.html',
  styleUrl: './checkout-modal.component.scss',
})
export class CheckoutModalComponent {
  private cartService = inject(CartService);
  private uiService = inject(UiService);

  isOpen = this.uiService.isCheckoutOpen;

  // Form states
  targetId = signal('');
  dropCoords = signal('');
  creditChip = signal('');

  // Transaction states
  isProcessing = signal(false);
  isSuccess = signal(false);

  close(): void {
    if (this.isProcessing()) return;
    this.uiService.closeCheckout();
    // Reset state after closure
    setTimeout(() => {
      this.isSuccess.set(false);
      this.targetId.set('');
      this.dropCoords.set('');
      this.creditChip.set('');
    }, 400);
  }

  confirmTransfer(): void {
    if (!this.targetId() || !this.dropCoords() || !this.creditChip()) return;

    this.isProcessing.set(true);

    // Simulate secure transfer protocol
    setTimeout(() => {
      this.isProcessing.set(false);
      this.isSuccess.set(true);
      this.cartService.clearCart();
    }, 2500);
  }
}
