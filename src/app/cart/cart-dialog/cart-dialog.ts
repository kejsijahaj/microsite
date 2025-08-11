import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartUiService } from '../../services/cart-ui.service';

@Component({
  selector: 'app-cart-dialog',
  imports: [],
  templateUrl: './cart-dialog.html',
  styleUrl: './cart-dialog.scss'
})
export class CartDialog {
  cart = inject(CartService);
  ui = inject(CartUiService);

  @ViewChild('closeBtn') closeBtn!: ElementRef<HTMLButtonElement>;
  private previouslyFocused?: HTMLElement;

  ngOnInit() {
    this.previouslyFocused = document.activeElement as HTMLElement | null || undefined;
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

}
