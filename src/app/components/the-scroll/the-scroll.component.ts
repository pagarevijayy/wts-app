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

  // constant for swipe action: left or right
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  // our list of avatars
  viewContent = [
    {
      viewAuthor: 'Michael Faraday',
      viewImage: 'https://pbs.twimg.com/media/ExGzBl_UUAA3qIS?format=jpg&name=medium',
      viewPrimaryContent: `"There’s nothing quite as frightening as someone who knows they are right."`,
      viewSecondaryContent: 'Michael Faraday FRS was an English scientist who contributed to the study of electromagnetism and electrochemistry.',
      visible: true
    },
    {
      viewAuthor: 'George Carlin',
      viewImage: 'https://pbs.twimg.com/media/EyCLlQfVEAARujy?format=jpg&name=small',
      viewPrimaryContent: `"Scratch any cynic and you will find a disappointed idealist." `,
      viewSecondaryContent: `Regarded as one of the most important and influential stand-up comics of all time, he was dubbed "the dean of counterculture comedians".`,
      visible: false
    },
    {
      viewAuthor: ' Thomas Edison',
      viewImage: 'https://pbs.twimg.com/media/Exq2Fk6UUAEDqCq?format=jpg&name=small',
      viewPrimaryContent: `"The chief function of the body is to carry the brain around."`,
      viewSecondaryContent: 'Thomas Edison, American inventor who, singly or jointly, held a world-record 1,093 patents and created the world’s first industrial research laboratory.',
      visible: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }


  // action triggered when user swipes
  swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
    // console.log('action', action);

    // out of range
    if (currentIndex > this.viewContent.length || currentIndex < 0) return;

    let nextIndex = 0;

    // swipe left, next view (counter-intuitive)
    if (action === this.SWIPE_ACTION.LEFT) {
      const isLast = currentIndex === this.viewContent.length - 1;
      nextIndex = isLast ? 0 : currentIndex + 1;
      this.simulateClickEffect(this.nextView);
    }

    // swipe right, previous view
    if (action === this.SWIPE_ACTION.RIGHT) {
      const isFirst = currentIndex === 0;
      nextIndex = isFirst ? this.viewContent.length - 1 : currentIndex - 1;
      this.simulateClickEffect(this.previousView);
    }

    // toggle visibility [make array item to be shown as visible]
    this.viewContent.forEach((arrayItem, arrayIndex) => arrayItem.visible = (arrayIndex === nextIndex));
  }

  changePageViewButtonClick(action: string) {
    const indexOfCurrenView = this.viewContent.findIndex(item => item.visible === true);
    // console.log('indexOfCurrenView', indexOfCurrenView);

    switch (action) {
      case "gotoPreviousView":
        // console.log('goto previous view clicked!');
        this.swipe(indexOfCurrenView, this.SWIPE_ACTION.LEFT)
        break;

      case "gotoNextView":
        // console.log('goto next view clicked!');
        this.swipe(indexOfCurrenView, this.SWIPE_ACTION.RIGHT)
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

    switch (keyPressed) {
      case 'ArrowLeft':
        this.previousView.nativeElement.click();

        break;

      case 'ArrowRight':
        this.nextView.nativeElement.click();

        break;

      default:
        break;
    }

  }

}
