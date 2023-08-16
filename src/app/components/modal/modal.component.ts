import { Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {

  isOpen: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
    this.el.nativeElement.addEventListener('click', (e:any) => {
      if(e.target.className === 'modal') this.close();
    })
  }

  ngOnDestroy(): void {
    this.el.nativeElement.remove();
  }

  open() {
    this.el.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
    this.isOpen = true;
  }

  close() {
    this.el.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.isOpen = false;
  }

}
