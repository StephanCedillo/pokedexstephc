import { Component, ViewChild } from '@angular/core'; // Asegúrate de que ViewChild esté importado
import { FormsModule } from '@angular/forms';
import { PokemonModel } from '../../Models/IPokemon';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { GraficoComponent } from '../grafico/grafico.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [CommonModule, FormsModule, PokedexComponent, GraficoComponent],
  templateUrl: './pokedex-view.component.html',
  styleUrls: ['./pokedex-view.component.css']
})
export class PokedexViewComponent {
  @ViewChild('pokedex') pokedexComponent!: PokedexComponent; // Añade el tipo aquí

  pokemonInput: string = '';
  pokemonImage: string = '';
  selectedPokemon: PokemonModel | undefined;
  pokemons: PokemonModel[] = [];
  clickPokemon: number = 0;

  constructor() {
    this.loadPokemons().catch(error => {
      console.error('Error al cargar Pokémon:', error);
      alert('No se pudieron cargar los Pokémon.');
    });
  }

  async loadPokemons(limit: number = 150): Promise<void> {
    const promises = [];
    for (let id = 1; id <= limit; id++) {
        promises.push(this.fetchPokemon(id));
    }
    this.pokemons = await Promise.all(promises);
    
    // Asegúrate de que haya Pokémon en la lista antes de acceder al primer índice
    if (this.pokemons.length > 0) {
        this.selectedPokemon = this.pokemons[0]; // Selecciona el primer Pokémon por defecto
        this.pokemonImage = this.selectedPokemon.imagen; // Actualiza la imagen
    }
}


  async fetchPokemon(id: number): Promise<PokemonModel> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Pokémon con ID ${id} no encontrado`);
    }

    const data = await response.json();
    return new PokemonModel(
      data.id,
      data.name,
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      data.stats[0].base_stat,
      data.stats[1].base_stat,
      data.stats[2].base_stat,
      data.stats[5].base_stat,
      data.abilities.map((a: any) => a.ability.name),
      data.weight,
      data.height / 10,
      data.weight / 10,
      data.base_experience,
      data.base_happiness,
      ['Field'],
      data.types.map((t: any) => t.type.name).join(', '),
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${data.id}.png`,
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${data.id}.png`,
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${data.id}.png`
    );
  }

  async fetchPokemonDetails(name: string) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Pokémon no encontrado');
      const data = await response.json();

      this.selectedPokemon = new PokemonModel(
        data.id,
        data.name,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
        data.stats[0].base_stat,
        data.stats[1].base_stat,
        data.stats[2].base_stat,
        data.stats[5].base_stat,
        data.abilities.map((a: any) => a.ability.name),
        data.weight,
        data.height / 10,
        data.weight / 10,
        data.base_experience,
        data.base_happiness,
        ['Field'],
        data.types.map((t: any) => t.type.name).join(', '),
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${data.id}.png`,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${data.id}.png`,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${data.id}.png`
      );

      this.pokemonImage = this.selectedPokemon.imagen;
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  }

  onPokemonChanged(pokemon: PokemonModel): void {
    if (pokemon) {
      this.selectedPokemon = pokemon;
      this.pokemonInput = pokemon.nombre; // Actualiza el input
      this.pokemonImage = pokemon.imagen; // Actualiza la imagen
  }
  }

  handleInput(): void {
    if (this.pokemonInput) {
      this.fetchPokemonDetails(this.pokemonInput);
    } else {
      alert('Por favor, ingresa un nombre de Pokémon.');
    }
  }

  handlePokemon(event: number): void {
    const newIndex = this.clickPokemon + event;
    if (newIndex >= 0 && newIndex < this.pokemons.length) {
      this.clickPokemon = newIndex; // Actualiza el índice
      this.selectedPokemon = this.pokemons[this.clickPokemon];
      this.pokemonImage = this.selectedPokemon.imagen;
    } else {
      alert('No hay más Pokémon en esa dirección.');
    }
  }
  
}
