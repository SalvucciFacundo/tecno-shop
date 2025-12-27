import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-wrapper">
      @for (toast of toastService.toasts(); track toast.id) {
      <div class="toast-item" [class]="toast.type" (click)="toastService.remove(toast.id)">
        <div class="toast-prefix">[ SYSTEM ]</div>
        <div class="toast-content">{{ toast.message }}</div>
        <div class="toast-progress" [style.animation-duration.ms]="toast.duration"></div>
        <div class="toast-glitch"></div>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .toast-wrapper {
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        z-index: 30000;
        pointer-events: none;
      }

      .toast-item {
        pointer-events: auto;
        position: relative;
        background: rgba(10, 11, 14, 0.95);
        border-left: 4px solid var(--cyber-cyan, #00f3ff);
        color: #fff;
        padding: 1rem 1.5rem;
        min-width: 280px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        clip-path: polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%);
        cursor: crosshair;
        overflow: hidden;
        animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);

        &.success {
          border-color: #00ff00;
        }
        &.warning {
          border-color: #fcee0a;
        }
        &.error {
          border-color: #ff0055;
        }

        .toast-prefix {
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 0.3rem;
          letter-spacing: 1px;
        }

        .toast-content {
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .toast-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: currentColor;
          width: 100%;
          transform-origin: left;
          animation: shrink linear forwards;
          opacity: 0.5;
        }
      }

      @keyframes slide-in {
        from {
          transform: translateX(-100%) skewX(-10deg);
          opacity: 0;
        }
        to {
          transform: translateX(0) skewX(0);
          opacity: 1;
        }
      }

      @keyframes shrink {
        from {
          transform: scaleX(1);
        }
        to {
          transform: scaleX(0);
        }
      }
    `,
  ],
})
export class ToastContainerComponent {
  protected toastService = inject(ToastService);
}
