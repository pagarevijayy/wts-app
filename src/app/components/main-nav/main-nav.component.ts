import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services';
import { SourceOfTruth } from 'src/assets/data/in-browser-data';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  @ViewChild('drawer') navigationDrawer: MatSidenav;

  isHandset$: Observable<boolean> = this._utilService.isHandset$;
  toolbarTitle: string = SourceOfTruth.projectData.projectMainToolBarTitle;

  constructor(
    private _utilService: UtilsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  shareClicked() {
    const message = "Share insta posts until i unlock this for youuu. 😉";
    this._snackBar.open(message, "", {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

  navigationItemClicked() {
    let isMobileDvice: boolean;
    this.isHandset$.subscribe(data => isMobileDvice = data);

    if (isMobileDvice) {
      this.navigationDrawer.close();
    }
  }

  poweredByEragapTech() {
    window.open(`https://eragap.co.in`, "_blank");
  }

}
