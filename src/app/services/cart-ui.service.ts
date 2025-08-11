import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CartUiService {
    private open = false;

    isOpen() { return this.open;}
    openDialog() { 
        this.open = true;
        this.lockScroll();
    }

    closeDialog() {
        this.open = false;
        this.unlockScroll();
    }

    private lockScroll() {document.body.classList.add('no-scroll');}
    private unlockScroll() { document.body.classList.remove('no-scroll');}
}