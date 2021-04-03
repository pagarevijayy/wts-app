import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-the-scroll',
  templateUrl: './the-scroll.component.html',
  styleUrls: ['./the-scroll.component.scss']
})
export class TheScrollComponent implements OnInit {
  @ViewChild('leftChevron', { read: ElementRef }) previousView: ElementRef;
  @ViewChild('rightChevron', { read: ElementRef }) nextView: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  changePageView(action: string) {

    switch (action) {
      case "gotoPreviousView":
        console.log('goto previous view clicked!');
        break;

      case "gotoNextView":
        console.log('goto next view clicked!');
        break;

      default:
        break;
    }
  }

  simulateClickEffect(element: ElementRef) {
    element.nativeElement.classList.add('click-effect');
    setTimeout(() => {
      element.nativeElement.classList.remove('click-effect');
    }, 300);

  }


  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const keyPressed = event.key;
    console.log(keyPressed);

    switch (keyPressed) {
      case 'ArrowLeft':
        this.simulateClickEffect(this.previousView);
        this.previousView.nativeElement.click();

        break;

      case 'ArrowRight':
        this.simulateClickEffect(this.nextView);
        this.nextView.nativeElement.click();

        break;

      default:
        break;
    }

  }

}
