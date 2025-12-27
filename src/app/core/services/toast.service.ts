import { Injectable, signal } from '@angular/core';
import { Toast } from '../interfaces/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();
  private counter = 0;

  show(message: string, type: Toast['type'] = 'info', duration: number = 3000): void {
    const id = this.counter++;
    const toast: Toast = { id, message, type, duration };

    this.toastsSignal.update((toasts) => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  remove(id: number): void {
    this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
  }
}
