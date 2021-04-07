import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private _updates: SwUpdate
  ) {
    //check if the code has an update and force trigger the new one.
    this._updates.available.subscribe(event => {
      if (!!event) {
        this._updates.activateUpdate().then(() => window.location.assign(window.location.origin));
      }
    });
  }
}
