import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../pages/models/heroe.model'; // importation du model
import { map } from 'rxjs/operators';
import { Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  // propriété de l'url où je vais stoker l'information.
  private Url = 'https://crud-c050d.firebaseio.com';

  // j'injecte le module HttpClient à mon contructor pour y acceder aux propriétés et methodes du module
  constructor(private http: HttpClient) { }

  // Methode pour ajouter un hero
  creerHero(hero: HeroeModel) {
    //  cette function reçoit comme parametre un hero et le nouveau hero est de type HeroeModel
    //  la petition post reçoit comme arguments(url, et body que dans mon cas est hero)
    return this.http.post(`${this.Url}/Heroes.json`, hero) // quand je fais cette petition j'ai un id sur firebase
      .pipe(map((resp: any) => {
        hero.id = resp.name; // le parametre hero avec son id est égal à la response et dans la resp viens le name de firebase
        return hero; // cette return du hero, returne toute l'instance de l'hero avec toute l'information et son id
        // pour utiliser operator map j'utilise un pipe avec l'operator map pour transfomer cette response
      })
      );
  }
  //  methode put pour actualiser mon hero
  actualiserHero(hero: HeroeModel) {
    // cette function reçoit comme parametre un hero et le nouveau hero est de type HeroeModel

    // pour eviter que firebase crée une propriété Id et pour casse la referece avec javascript
    const herotemp = {
      ...hero // je l'envoie mon objet hero
    };

    delete herotemp.id; // je supprime la propriété Id crée par firebase

    //  la petition post reçoit comme arguments(url, et body que dans mon cas est herotemp que l'interieur contient mon hero )

    return this.http.put(`${this.Url}/Heroes/${hero.id}.json`, herotemp);
    // comme chaque hero a déjà une id, j'envoie à ma methode put l'url et mon objet hero, car l'Id est à l'interieur de celle-ci .
    // j'envoie ma constante que c'est l'objet à actualiser
  }

  // methode pour avoir l'hero avec son id

  getHeroId(id: string) {
    return this.http.get(`${this.Url}/Heroes/${id}.json`);
  }



  // methode pour avoirla liste des heros
  getHero() {
    return this.http.get(`${this.Url}/Heroes.json`).pipe(map(this.creerArray));
  }

  private creerArray(heroesObje: object) {
    const heroes: HeroeModel[] = [];

    Object.keys(heroesObje).forEach(Key => {
      const heros2: HeroeModel = heroesObje[Key];
      heros2.id = Key;
      heroes.push(heros2);
    });

    if (heroesObje === null) {
      return [];
    }
    return heroes;
  }


  effacerHero(id: string) {
    return this.http.delete(`${this.Url}/Heroes/${id}.json`);
  }
}
