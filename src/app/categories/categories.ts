import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss'],
})
export class CategoriesComponent {
  categories: Array<{ id: string; name: string; products: any[] }> = [];
  loading = signal(false);

  @Input() selectedProducts: any[] = [];

  @Output() productsChange = new EventEmitter<any[]>();

  constructor(private apiService: ApiService, public cart: CartService) {}

  async ngOnInit(): Promise<void> {
    this.loading.set(true);
    try {
      const data = await this.apiService.getData();
      if (data?.categories) {
        this.categories = data.categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          products: (cat.products || []).map((p: any) => ({
            name: p.name,
            unitPrice: p.unitPrice,
          })),
        }));
      }
    } catch (err) {
      console.error('Error loading categories', err);
    } finally {
      this.loading.set(false);
    }
  }

  onCategoryClick(category: { products: any[] }) {
    this.selectedProducts = category.products;
    this.productsChange.emit(category.products);
  }

  onAdd(prod: any) {
    this.cart.addItem(prod);
  }

  onRemove(prodName: string) {
    this.cart.removeItem(prodName);
  }
}
