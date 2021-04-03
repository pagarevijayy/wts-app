import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services';
import { SourceOfTruth} from 'src/assets/data/in-browser-data';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this._utilService.isHandset$;
  toolbarTitle: string = SourceOfTruth.projectData.projectMainToolBarTitle ;

  constructor(
    private _utilService: UtilsService,
  ) { }

  ngOnInit(): void {
  }

  poweredByEragapTech(){
    window.open(`https://eragap.co.in`, "_blank");
  }

}
