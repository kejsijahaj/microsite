import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ ],
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss']
})
export class CategoriesComponent {
  categories: Array<{ id: string; name: string; products: any[] }> = [];
  selectedProducts: any[] = [];

  @Output() productsChange = new EventEmitter<any[]>();

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.apiService.getData();
      if (data?.categories) {
        this.categories = data.categories.map(cat => ({
          id: cat.id,
          name: cat.name,
          products: (cat.products || []).map((p:any) => ({
            name: p.name,
            unitPrice: p.unitPrice
          }))
        }));
      }
    } catch (err) {
      console.error('Error loading categories', err);
    }
  }

  onCategoryClick(category: { id: string; products: any[] }) {
    this.selectedProducts = category.products;
  }

  trackById(_: number, item: { id: string }) {
    return item.id;
  }
}

