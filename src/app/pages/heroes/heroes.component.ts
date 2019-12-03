import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heros: HeroeModel[] = [];
// Injection du service dans le constructeur
  constructor( private heroesServices: HeroesService) { }

  ngOnInit() {
    this.heroesServices.getHero()
    .subscribe( resp => {
      console.log(resp);
      this.heros = resp;

    });
  }

}
