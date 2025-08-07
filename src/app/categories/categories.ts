import { Component } from '@angular/core';
import { ApiService, ApiResponse } from '../services/api.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
  categories: any[] = [];

  constructor(private apiService: ApiService) {}


  async ngOnInit(): Promise<void> {
    try {
      const data = await this.apiService.getData();
      if (data && data.categories) {
        this.categories = data.categories.map((category) => ({
          id: category.id,
          name: category.name,
          products: category.products || []
        }));

      } else {
        console.error('No categories found in the data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
