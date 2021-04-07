import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services';
import { IdeaQuotes } from 'src/assets/data/in-browser-data';

@Component({
  selector: 'app-the-scroll',
  templateUrl: './the-scroll.component.html',
  styleUrls: ['./the-scroll.component.scss']
})
export class TheScrollComponent implements OnInit {
  @ViewChild('leftChevron', { read: ElementRef }) previousView: ElementRef;
  @ViewChild('rightChevron', { read: ElementRef }) nextView: ElementRef;

  isHandset$: Observable<boolean> = this._utilService.isHandset$;

  // constant for swipe action: left or right
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  gestureInstruction: string = "Swipe or use Arrow Keys";

  // our list of avatars
  viewContent: Array<any> = IdeaQuotes.ideaQuotesData;

  constructor(
    private _utilService: UtilsService,
  ) { }

  ngOnInit(): void {
    // shuffle viewContent array for dynamism
    this.viewContent = this._utilService.shuffleArrayRandomly(this.viewContent);

    //make first element visible
    if (this.viewContent?.length > 0) {
      this.viewContent[0].visible = true;
    }

    // gesture instruction
    this.isHandset$.subscribe(isMobileDvice => {
      if (isMobileDvice) {
        this.gestureInstruction = "Swipe"
      } else {
        this.gestureInstruction = "Use Arrow keys"
      }
    });

    // hide gesture message
    setTimeout(function () {
      document.getElementById('gestureMessage').classList.add('fadeout');
    }, 10000);
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
      case "gotoNextView":
        // console.log('goto next view clicked!');
        this.swipe(indexOfCurrenView, this.SWIPE_ACTION.LEFT)
        break;

      case "gotoPreviousView":
        // console.log('goto previous view clicked!');
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
      case 'ArrowRight':
        this.nextView.nativeElement.click();

        break;

      case 'ArrowLeft':
        this.previousView.nativeElement.click();

        break;

      default:
        break;
    }

  }

}
