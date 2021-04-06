import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
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
export class MainNavComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') navigationDrawer: MatSidenav;
  @ViewChild('menuButton') navMenuButton: MatButton;

  isHandset$: Observable<boolean> = this._utilService.isHandset$;
  toolbarTitle: string = SourceOfTruth.projectData.projectMainToolBarTitle;

  constructor(
    private _utilService: UtilsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // remove the focus effect from menu button after clicking it.
    console.log(this.navMenuButton);
    (<any>this.navMenuButton)._focusMonitor.stopMonitoring(this.navMenuButton._getHostElement());
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
