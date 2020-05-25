import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // Propriété
  heros: HeroeModel[] = [];
  loading = true;

  // Injection du service dans le constructeur
  constructor(private heroesServices: HeroesService) { }

  ngOnInit() {

    this.loading = true;
    // j'appelle la methode pour avoir l'information de es hero
    this.heroesServices.getHero()
      .subscribe(resp => {
        console.log(resp);
        this.heros = resp;
        this.loading = false;  // ma propriété hero est egal à la response

      });
  }

  eliminerHero(hero: HeroeModel, i: number) {

    Swal.fire({
      title: `êtes-vous sûr d'effacer votre hero?`,
      text: `Souhaitez-vous effacer à ${hero.Prenom}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if (resp.value) {
        this.heros.splice(i, 1);
        this.heroesServices.effacerHero(hero.id).subscribe();
      }
    });
  }

}
