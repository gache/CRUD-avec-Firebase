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

  heroe: HeroeModel = new HeroeModel();

  constructor( private heroesService: HeroesService) { }

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


    if ( this.heroe.id) {
      // j'initialise la variable 

    petition = this.heroesService.actualisation( this.heroe );

    // .subscribe( resp => {
    // console.log(resp);
    // });

    } else {
    petition =  this.heroesService.creerHero(this.heroe);

    // .subscribe( resp => {
    // console.log(resp);
    // });

    }

    petition.subscribe(resp => {
      Swal.fire({
        title: this.heroe.Prenom,
        text:'Cest enregistre correctement',
        icon: 'success',
      });
    });

    


  }

}
