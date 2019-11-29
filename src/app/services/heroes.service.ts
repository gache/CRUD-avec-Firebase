import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../pages/models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private Url = 'https://crud-c050d.firebaseio.com';

  constructor(private http: HttpClient) { 

  }
  creerHero(hero: HeroeModel) {
    return this.http.post(`${this.Url}/Heroes.json`, hero)
    .pipe(
      map( (resp: any) => {
      hero.id = resp.name;
      return hero;
      })
    );
  }

  actualisation(hero: HeroeModel) {

    const herotemp = {
    ...hero
    };

    delete herotemp.id;
    return this.http.put(`${this.Url}/Heroes/${hero.id}.json`, herotemp);
  }
}
