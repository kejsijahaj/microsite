import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { CategoriesComponent } from "./categories/categories";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CategoriesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  selectedProducts: any[] = [];

  onProductsChanged(products: any[]) {
    this.selectedProducts = products;
  }

  clearSelection() {
    this.selectedProducts = [];
  }
}
