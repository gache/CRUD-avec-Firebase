import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// imporation pour travailler avec le formulaire
import { FormsModule } from '@angular/forms';

// Importation pour faire petitions Http
import { HttpClientModule } from '@angular/common/http';

// Importation de la route
import { AppRoutingModule } from './app-routing.module';

// Composannts
import { AppComponent } from './app.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
