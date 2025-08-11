import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { CategoriesComponent } from "./categories/categories";
import { CartUiService } from './services/cart-ui.service';
import { CartDialog } from './cart/cart-dialog/cart-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CategoriesComponent, CartDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  selectedProducts: any[] = [];
  ui = inject(CartUiService);

  onProductsChanged(products: any[]) {
    this.selectedProducts = products;
  }

  clearSelection() {
    this.selectedProducts = [];
  }
}
