import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  // propriété, j'initisalise  avec HeroeModel
  heroe: HeroeModel = new HeroeModel();

  // j'injecte mon service au contructor pour y acceder à la petition post
  constructor(private heroesService: HeroesService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nouveau') {
      this.heroesService.getHeroId(id)
        .subscribe((resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        });
    }

  }

  enregistrer(form: NgForm) {
    if (form.invalid) {
      console.log('Le formulaire non valide');
      return;
    }

    // utilisation Sweetarlert2 affichage du message a l'utilisateur de patientez
    Swal.fire({
      title: 'Attendez',
      text: 'Enregistrement information',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading(); // Loading de Sweetarlert2

    let petition: Observable<any>; // je cree une variable de type observable

    // ma condition si un hero existe j'actualise, s'il n'y a pas d'information d'un hero du coup je crée un nouveau hero
    if (this.heroe.id) {
      // j'initialise ma variable petition et comme resultat  va faire une actualisation du hero déjà existante
      petition = this.heroesService.actualiserHero(this.heroe);
    } else {
      // j'initialise ma variable petition et comme resultat va créer un nouveau hero
      petition = this.heroesService.creerHero(this.heroe);

    }
    // n'importe si j'actualise ou je crée un hero toute l'information est dans la variable petition
    //  du coup je fais subscribe pour avoir la response.
    petition.subscribe(resp => {
      // utilisation Sweetarlert2 affichage du message a l'utilisateur que l'information a été enregistrer correctement
      Swal.fire({
        title: this.heroe.Prenom,
        text: 'Actualisation  correctement',
        icon: 'success',
      });
    });


  }

}
