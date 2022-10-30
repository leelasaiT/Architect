import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TriangleComponent } from './triangle/triangle.component';
import { RogersSupportComponent } from './rogerssupport/rogerssupport.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: 'Home component', component: HomeComponent },
  { path: 'triangle', title: 'Triangle component', component: TriangleComponent },
  { path: 'graphql', title: 'Graphql component', component: RogersSupportComponent },
  { path: '**', title: 'Page Not Found component', component: PagenotfoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
