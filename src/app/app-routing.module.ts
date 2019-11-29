import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent} from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';




const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroe/:id', component: HeroeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'heroes'} // il me redirectione vers la page  heroes
];
@NgModule({
  imports: [
    RouterModule.forRoot( routes)
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
