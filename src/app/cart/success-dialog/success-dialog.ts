import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { SuccessUiService } from '../../services/success-ui.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-dialog',
  imports: [MatIconModule],
  templateUrl: './success-dialog.html',
  styleUrl: './success-dialog.scss',
})
export class SuccessDialog implements OnInit, OnDestroy {
  success = inject(SuccessUiService);

  @ViewChild('closeBtn') closeBtn!: ElementRef<HTMLButtonElement>;
  private previouslyFocused?: HTMLElement;

  ngOnInit() {
    this.previouslyFocused =
      (document.activeElement as HTMLElement) || undefined;
    setTimeout(() => this.closeBtn?.nativeElement.focus(), 0);
    document.addEventListener('keydown', this.onKey);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.onKey);
  }

  onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.close();
  };
  close() {
    this.success.closeDialog();
  }
}
