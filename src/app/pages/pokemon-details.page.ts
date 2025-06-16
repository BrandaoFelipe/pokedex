import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pokemon-details',
  template: `
    <ion-header>
      <ion-toolbar>         
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/tab1"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pokemon?.name | titlecase }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" *ngIf="pokemon">
      <ion-card>
        <img [src]="imageUrl" alt="{{ pokemon.name }}" />
        <ion-card-header>
          <ion-card-title>{{ pokemon.name | titlecase }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p><strong>Tipo(s):</strong> {{ getTypes() }}</p>
          <p><strong>Habilidades:</strong> {{ getAbilities() }}</p>
          <p><strong>Altura:</strong> {{ pokemon.height / 10 }} m</p>
          <p><strong>Peso:</strong> {{ pokemon.weight / 10 }} kg</p>
          <p><strong>Experiência base:</strong> {{ pokemon.base_experience }}</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,    
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,    
  ],
})
export class PokemonDetailsPage {
  pokemon: any;
  imageUrl = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe((data) => {
        this.pokemon = data;
        this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      });
    }
  }

  getTypes(): string {
    return this.pokemon.types.map((t: any) => t.type.name).join(', ');
  }

  getAbilities(): string {
    return this.pokemon.abilities.map((a: any) => a.ability.name).join(', ');
  }
}