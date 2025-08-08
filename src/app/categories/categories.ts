import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() selectedProducts: any[] = [];

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

  onCategoryClick(category: {products: any[]}) {
    this.selectedProducts = category.products
    this.productsChange.emit(category.products);
  }
}

