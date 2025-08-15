import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartUiService } from '../../services/cart-ui.service';
import { SuccessUiService } from '../../services/success-ui.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-dialog',
  imports: [MatIconModule],
  templateUrl: './cart-dialog.html',
  styleUrl: './cart-dialog.scss',
})
export class CartDialog implements OnInit, OnDestroy {
  cart = inject(CartService);
  ui = inject(CartUiService);
  success = inject(SuccessUiService);

  private empty: Record<string, boolean> = {};
  private deleteTimers: Record<string, any> = {};

  @ViewChild('closeBtn') closeBtn!: ElementRef<HTMLButtonElement>;
  private previouslyFocused?: HTMLElement;

  ngOnInit() {
    this.previouslyFocused =
      (document.activeElement as HTMLElement | null) || undefined;
    setTimeout(() => this.closeBtn?.nativeElement.focus(), 0);
    document.addEventListener('keydown', this.onKey);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.onKey);
    this.previouslyFocused?.focus?.();
  }

  onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.close();
  };

  close() {
    this.ui.closeDialog();
  }

  checkout() {
    this.cart.clearCart();
    this.ui.closeDialog();
    this.success.openDialog('Thank you for your order!');
  }

  onQtyInput(name: string, ev: Event) {
    const v = (ev.target as HTMLInputElement).value.trim();
    this.empty[name] = v === '';
  }

  onQtyFocus(name: string) {
    this.empty[name] = false;
    if (this.deleteTimers[name]) {
      clearTimeout(this.deleteTimers[name]);
      delete this.deleteTimers[name];
    }
  }

  onQtyBlur(item: { name: string }, ev: FocusEvent) {
    const input = ev.target as HTMLInputElement;
    const raw = input.value.trim();

    if (raw === '') {
      this.empty[item.name] = true;
      this.deleteTimers[item.name] = setTimeout(() => {
        this.cart.removeLine(item.name);
        delete this.deleteTimers[item.name];
        delete this.empty[item.name];
      }, 300);
      return;
    }

    const n = Number.isFinite(input.valueAsNumber)
      ? input.valueAsNumber
      : Number(raw);
    if (Number.isFinite(n) && n >= 1) {
      this.cart.setQuantityByName(item.name, Math.floor(n));
      this.empty[item.name] = false;
    } else {
      input.value = String(this.cart.getQuantityByName(item.name));
      this.empty[item.name] = false;
    }
  }

  isEmpty(name: string) {
    return !!this.empty[name];
  }
}
