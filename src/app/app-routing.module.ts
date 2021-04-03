import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityComponent } from './components/community/community.component';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { OtherComponent } from './components/other/other.component';
import { RecommendedBooksComponent } from './components/recommended-books/recommended-books.component';
import { TheScrollComponent } from './components/the-scroll/the-scroll.component';

const routes: Routes = [
  { path: 'scroll', component: TheScrollComponent },
  { path: 'discipline', component: DisciplineComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'recommended-books', component: RecommendedBooksComponent },
  { path: 'other', component: OtherComponent },

  // error cases [streamline later]
  { path: '', redirectTo: '/scroll', pathMatch: 'full' }, // redirect to `home-component`
  { path: '**', component: TheScrollComponent },  // Wildcard route ideally for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
