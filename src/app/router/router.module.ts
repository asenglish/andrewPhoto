import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PhotoListComponent} from "../photo-list/photo-list.component";
import {AboutComponent} from "../about/about.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'photo-list', component: PhotoListComponent},
      { path: 'about', component: AboutComponent},
      { path: '**', redirectTo: 'photo-list' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
