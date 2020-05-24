
export class HeroeModel {
  id: string;
  Prenom: string;
  pouvoir: string;
  vivant: boolean;

  // j'initialise la propriété vivant par défaut va être true c'est dire vivant
  constructor() {
    this.vivant = true;
  }
}
