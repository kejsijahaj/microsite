import { Injectable, Input } from '@angular/core';
import { CartItem } from '../cart/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  items: CartItem[] = [];

  addItem(product: { name: string; unitPrice: number }) {
    const existing = this.items.find((i) => i.name === product.name);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  setQuantityByName(name: string, qty: number) {
    const line = this.items.find((i) => i.name === name);
    if (!line) return;

    if (!Number.isFinite(qty)) return;
    const q = Math.floor(qty);
    if (q < 1) return;
    line.quantity = q;
  }

  removeLine(name: string) {
    this.items = this.items.filter((i) => i.name !== name);
  }

  removeItem(productName: string) {
    const existing = this.items.find((i) => i.name === productName);
    if (!existing) return;

    existing.quantity--;
    if (existing.quantity === 0) {
      this.items = this.items.filter((i) => i.name !== productName);
    }
  }

  isInCart(productName: string): boolean {
    return this.items.some((i) => i.name === productName);
  }

  getCount(): number {
    return this.items.length;
  }
  getTotalQuantity() {
    return this.items.reduce((s, i) => s + i.quantity, 0);
  }
  getTotalAmount() {
    return this.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  }

  getQuantityByName(name: string): number {
    return this.items.find((i) => i.name === name)?.quantity ?? 0;
  }

  clearCart() {
    this.items = [];
  }
}
