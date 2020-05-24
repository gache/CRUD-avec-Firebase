import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  // propriété, j'initisalise  avec HeroeModel
  heroe: HeroeModel = new HeroeModel();

 // j'injecte mon service au contructor pour y acceder à la petition post
  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
  }

  enregistrer(form: NgForm) {
    if (form.invalid) {
      console.log('Le formulaire non valide');
      return;
    }

    // utilisation Swal pour l'affiche de message a l'utilisateur
    Swal.fire({
      title: 'Attendez',
      text: 'Enregistrement information',
      icon: 'info',
      allowOutsideClick: false,
    });

    Swal.showLoading();

    let petition: Observable<any>; // je cree une variable

// ma condition si une hero existe j'actualise, s'il n'y a pas d'information d'un hero du coup je crée un nouveau hero
    if (this.heroe.id) {
      // actualisation du hero déjà existante
      petition = this.heroesService.actualiserHero(this.heroe);

      // .subscribe( resp => {
      // console.log(resp);
      // });

    } else {
      //  creation d'un nouveau hero
      petition = this.heroesService.creerHero(this.heroe);

      // .subscribe( resp => {
      // console.log(resp);
      // });

    }

    petition.subscribe(resp => {
      Swal.fire({
        title: this.heroe.Prenom,
        text: 'Actualisation  correctement',
        icon: 'success',
      });
    });


  }

}
