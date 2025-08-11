import { Component, OnInit, inject } from '@angular/core';
import { Header } from "./header/header";
import { CategoriesComponent } from "./categories/categories";
import { CartUiService } from './services/cart-ui.service';
import { CartDialog } from './cart/cart-dialog/cart-dialog';
import { SuccessUiService } from './services/success-ui.service';
import { SuccessDialog } from './cart/success-dialog/success-dialog';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [Header, CategoriesComponent, CartDialog, SuccessDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  selectedProducts: any[] = [];
  ui = inject(CartUiService);
  success = inject(SuccessUiService);
  private theme = inject(ThemeService);

  ngOnInit() {
    this.theme.init();
  }

  onProductsChanged(products: any[]) {
    this.selectedProducts = products;
  }

  clearSelection() {
    this.selectedProducts = [];
  }
}
