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
  currentPage: number = 1;
  limit: number = 20;
  totalPokemons: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    const offset = (this.currentPage - 1) * this.limit;
    
    this.http
      .get<any>(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${offset}`)
      .subscribe((response) => {
        this.totalPokemons = response.count;
        this.pokemons = response.results.map((poke: any) => {
          const id = poke.url.split('/').filter(Boolean).pop();
          return {
            id,
            name: poke.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        });
      });
  }

  nextPage() {
    if ((this.currentPage * this.limit) < this.totalPokemons) {
      this.currentPage++;
      this.loadPokemons();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemons();
    }
  }
}