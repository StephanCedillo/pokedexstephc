import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PokemonModel } from '../../Models/IPokemon'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [NgIf, NgStyle, CommonModule],
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnChanges {
  @Input() pokemon: PokemonModel | undefined;
  @Output() pokemonChanged = new EventEmitter<PokemonModel>(); 
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon']) {
      if (this.pokemon) {
        this.actualizarDatosPokemon(this.pokemon);
      } else {
        // Inicializa con un Pokémon predeterminado si pokemon es undefined
        this.inicializarPokemonPredeterminado();
      }
    }
  }

  // Propiedades del Pokémon
  pokemonId: number | undefined;
  pokemonNombre: string | undefined;
  pokemonVida: number | undefined;
  pokemonTipo: string | undefined;
  pokemonAtaque: number | undefined;
  pokemonDefensa: number | undefined;
  pokemonRapidez: number | undefined;
  pokemonHabilidades: string[] | undefined;
  pokemonPeso: number | undefined; // Peso agregado
  pokemonAltura: number | undefined;
  pokemonAncho: number | undefined;
  pokemonCatchRate: number | undefined; // Catch Rate agregado
  pokemonFriendship: number | undefined; // Base Friendship agregado
  pokemonEggGroups: string[] | undefined; // Egg Groups agregado

  // Nuevas propiedades para los sprites
  spriteFrontal: string | undefined;
  spriteTrasero: string | undefined;
  spriteFrontalShiny: string | undefined;
  spriteTraseroShiny: string | undefined;

  // Métodos para calcular porcentajes
  get pokemonVidaPorcentaje(): number {
    return this.pokemonVida ? Math.min((this.pokemonVida / 255) * 100, 100) : 0; // stats de la api están sobre 255
  }
  get pokemonAtaquePorcentaje(): number {
    return this.pokemonAtaque ? Math.min((this.pokemonAtaque / 190) * 100, 100) : 0; // stats de la api están sobre 190
  }

  // Método para actualizar los datos del Pokémon
  actualizarDatosPokemon(pokemon: PokemonModel) {
    this.pokemonId = pokemon.id;
    this.pokemonNombre = pokemon.nombre;
    this.pokemonVida = pokemon.vida;
    this.pokemonTipo = pokemon.tipo;
    this.pokemonAtaque = pokemon.ataque;
    this.pokemonDefensa = pokemon.defensa;
    this.pokemonRapidez = pokemon.rapidez;
    this.pokemonHabilidades = pokemon.habilidades;
    this.pokemonPeso = pokemon.peso; // Peso actualizado
    this.pokemonAltura = pokemon.altura;
    this.pokemonAncho = pokemon.ancho;
    this.pokemonCatchRate = pokemon.catchRate; // Catch Rate actualizado
    this.pokemonFriendship = pokemon.friendship; // Base Friendship actualizado
    this.pokemonEggGroups = pokemon.eggGroups; // Egg Groups actualizado

    // Asignar los sprites
    const spriteUrl = pokemon.imagen; // Sprite frontal
    this.spriteTrasero = pokemon.back_default;
    this.spriteFrontalShiny = pokemon.front_shiny;
    this.spriteTraseroShiny = pokemon.back_shiny;
  }

  // Método para inicializar con un Pokémon predeterminado
  private inicializarPokemonPredeterminado() {
    console.log('Inicializando Pokémon predeterminado');
    const pokemonPredeterminado = new PokemonModel(
      1, // ID de Pikachu
      'pikachu',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png',
      35, // Vida
      55, // Ataque
      40, // Defensa
      90, // Rapidez
      ['Electricidad'], // Habilidades
      6.0, // Peso
      0.4, // Altura
      0.6, // Ancho
      190, // Catch Rate
      70, // Base Friendship
      ['Field'], // Egg Groups
      'Electrico', // Tipo
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png', // Sprite Trasero
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png', // Sprite Frontal Shiny
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/4.png' // Sprite Trasero Shiny
    );

    this.actualizarDatosPokemon(pokemonPredeterminado);
  }
}
