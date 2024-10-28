import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PokemonModel } from '../../Models/IPokemon';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [NgIf],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {
  @Output() clickPokemon: EventEmitter<number> = new EventEmitter<number>();
  @Output() pokemonChanged: EventEmitter<PokemonModel> = new EventEmitter<PokemonModel>();
  @Input() pokemon: PokemonModel | undefined;
  pokemonId: number = 1; // ID del Pokémon actual
  favoritos: number[] = []; // Array para guardar los IDs de los favoritos
  esFavorito: boolean = false;  // Estado para saber si el Pokémon es favorito
  pokemons: PokemonModel[] = []; // Lista de Pokémon
  currentIndex: number = 0; // Inicializar en 0
  currentSpriteIndex: number = 0; // Índice del sprite actual


  get currentSprite(): string {
    if (!this.pokemon) {
      return ''; 
  }

  const sprites = [
      this.pokemon.imagen,
      this.pokemon.front_shiny || this.pokemon.imagen,
      this.pokemon.back_default || this.pokemon.imagen,
      this.pokemon.back_shiny || this.pokemon.imagen
  ];

  return sprites[this.currentSpriteIndex] || '';
  }

  nextPokemon(): void {
    this.clickPokemon.emit(1);
  }

  previousPokemon(): void {
    this.clickPokemon.emit(-1);
  }

  nextSprites(): void {
    this.cambiarSprite(1);
  }

  previousSprites(): void {
    this.cambiarSprite(-1);
  }

  cambiarSprite(direction: number): void {
    this.currentSpriteIndex = (this.currentSpriteIndex + direction + 4) % 4; // 4 porque hay 4 sprites
    this.pokemonChanged.emit(this.pokemons[this.currentIndex]); // Emitir el cambio
  }

  setPokemons(pokemons: PokemonModel[]): void {
    this.pokemons = pokemons;
    console.log('Pokémon cargados:', this.pokemons); // Verifica si hay Pokémon
    this.currentIndex = 0; 
    this.currentSpriteIndex = 0; 
    this.emitirPokemonCambiado(); 
}
  volverAlPokemon(): void {
    this.currentSpriteIndex = 0; // Reiniciar el índice del sprite
    this.emitirPokemonCambiado(); // Emitir el Pokémon inicial
}

  
  emitirPokemonCambiado(): void {
    if (this.pokemons.length > 0 && this.currentIndex >= 0 && this.currentIndex < this.pokemons.length) {
      const pokemon = this.pokemons[this.currentIndex];
      this.pokemonChanged.emit(pokemon);
  } else {
      console.warn('Índice de Pokémon fuera de límites o lista vacía.');
  }

} 


}
