import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  
})
export class Tab1Page implements OnInit {
  pokemons: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
      .subscribe((response) => {
        this.pokemons = response.results.map((poke: any) => {
          const id = poke.url.split('/')[6];
          return {
            name: poke.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        });
      });
  }
}
