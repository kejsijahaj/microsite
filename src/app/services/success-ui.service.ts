import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SuccessUiService {
  private open = false;
  message = 'Success';

  isOpen() {
    return this.open;
  }

  openDialog(msg = 'Success') {
    this.message = msg;
    this.open = true;
    document.body.classList.add('no-scroll');
  }

  closeDialog() {
    this.open = false;
    document.body.classList.remove('no-scroll');
  }
}
