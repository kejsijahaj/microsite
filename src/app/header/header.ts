import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  inject,
  signal
} from '@angular/core';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';
import { CartUiService } from '../services/cart-ui.service';
import { ThemeService } from '../services/theme.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  @Input() selectedProducts: any[] = [];
  @Output() goBack = new EventEmitter<void>();

  cart = inject(CartService);
  ui = inject(CartUiService);
  theme = inject(ThemeService);
  loading = signal(false);

  logo = '';
  businessName = '';

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    this.loading.set(true);
    try {
      const data = await this.apiService.getData();

      if (data) {
        this.logo = 'data:image/jpeg;base64,' + data.logo;
        this.businessName = data.businessName;
      } else {
        console.error('Data received in HeaderComponent is undefined or null');
      }
    } catch (error) {
      console.error('Error fetching data in HeaderComponent:', error);
    } finally {
      this.loading.set(false);
    }
  }

  onReturnClick() {
    this.goBack.emit();
  }

  openCart() {
    this.ui.openDialog();
  }

  toggleTheme() {
    this.theme.toggle();
  }

  isDark(): boolean {
    return this.theme.isDark();
  }

  get badgeAmount(): number {
    return this.cart.getTotalQuantity();
  }
}
