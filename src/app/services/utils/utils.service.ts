import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  // check whether device is handset(mobile) or not
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _router: Router
  ) { }

  // shuffle an array
  shuffleArrayRandomly(array: Array<any>) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // encrypt and set data into session storage
  setDataIntoSessionStorage(data: any, keyLabel: string) {
    // @todo: edge case error handling
    const stringifiedData = JSON.stringify(data);

    const encryptedData = btoa(stringifiedData);

    sessionStorage.setItem(keyLabel, encryptedData);
  }

  // get data from session storage and decrypt
  getDataFromSessionStorage(keyLabel: string) {
    const encryptedData = sessionStorage.getItem(keyLabel);

    if (!!encryptedData) {
      const decryptedData = atob(encryptedData);
      const parsedOriginalData = JSON.parse(decryptedData);
      return parsedOriginalData;
    }

    return null;
  }

  // used for navigation
  navigationRoute(routeName: string) {
    // navigate to the specified route.
    this._router.navigate([`/${routeName}`]);
  }

}
