import { NgModule } from '@angular/core'; // ce module qui va s'occuper de ma route
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';




const routes: Routes = [

  { path: 'heroes', component: HeroesComponent },
  { path: 'heroe/:id', component: HeroeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'heroes' } // il m'envoie vers la page heroes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  // je veux utiliser cette route dans autre module  je fais l'exportation
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
