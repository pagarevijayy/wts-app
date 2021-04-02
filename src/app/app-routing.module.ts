import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TheScrollComponent } from './components/the-scroll/the-scroll.component';

const routes: Routes = [
  { path: 'scroll', component: TheScrollComponent },

    // error cases [streamline later]
    { path: '', redirectTo: '/scroll', pathMatch: 'full' }, // redirect to `home-component`
    { path: '**', component: TheScrollComponent },  // Wildcard route ideally for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
