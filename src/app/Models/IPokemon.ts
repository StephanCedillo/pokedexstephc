export class PokemonModel {
    // Atributos
    id: number;
    nombre: string;
    imagen: string; // Sprite frontal
    vida: number;
    ataque: number;
    defensa: number;
    rapidez: number;
    habilidades: string[];
    altura: number;
    ancho: number;
    peso: number; // Agregado
    catchRate: number; // Agregado
    friendship: number; // Agregado
    eggGroups: string[]; // Agregado
    tipo: string;
    front_shiny?: string; // Sprite frontal shiny
    back_default?: string; // Sprite trasero
    back_shiny?: string; // Sprite trasero shiny

    // Constructor
    constructor(
        id: number,
        nombre: string,
        imagen: string,
        vida: number,
        ataque: number,
        defensa: number,
        rapidez: number,
        habilidades: string[],
        altura: number,
        ancho: number,
        peso: number,
        catchRate: number,
        friendship: number,
        eggGroups: string[],
        tipo: string,
        front_shiny?: string,
        back_default?: string,
        back_shiny?: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
        this.ataque = ataque;
        this.defensa = defensa;
        this.rapidez = rapidez;
        this.habilidades = habilidades;
        this.altura = altura;
        this.ancho = ancho;
        this.peso = peso;
        this.catchRate = catchRate;
        this.friendship = friendship;
        this.eggGroups = eggGroups;
        this.tipo = tipo;
        this.front_shiny = front_shiny;
        this.back_default = back_default;
        this.back_shiny = back_shiny;
    }

    // Método para mostrar información del Pokémon
    mostrarPokemon(): string {
        return `ID: ${this.id}\nNombre: ${this.nombre}\nImagen: ${this.imagen}\nVida: ${this.vida}\nAtaque: ${this.ataque}\nDefensa: ${this.defensa}\nRapidez: ${this.rapidez}\nHabilidades: ${this.habilidades.join(', ')}\nPeso: ${this.peso} kg\nAltura: ${this.altura} m\nAncho: ${this.ancho} m\nCatch Rate: ${this.catchRate} (${((this.catchRate / 255) * 100).toFixed(2)}%)\nBase Friendship: ${this.friendship} (${this.friendship < 50 ? 'lower' : this.friendship < 100 ? 'normal' : 'higher'})\nEgg Groups: ${this.eggGroups.join(', ')}\nTipo: ${this.tipo}\nSprite Frontal: ${this.imagen}\nSprite Trasero: ${this.back_default}\nSprite Frontal Shiny: ${this.front_shiny}\nSprite Trasero Shiny: ${this.back_shiny}`;
    }

    // Método para calcular daño
    calcularDaño(pokemonEnemigo: PokemonModel): number {
        const daño = this.ataque - pokemonEnemigo.defensa;
        return daño > 0 ? daño : 0;
    }

    // Métodos para atacar y defender
    atacar(pokemonEnemigo: PokemonModel) {
        const daño = this.calcularDaño(pokemonEnemigo);
        pokemonEnemigo.quitarVida(daño);
        console.log(`${this.nombre} ataca a ${pokemonEnemigo.nombre} causando ${daño} de daño.`);
    }

    defender() {
        console.log(`${this.nombre} está defendiendo.`);
    }

    quitarVida(cantidadQuitar: number) {
        this.vida -= cantidadQuitar;
    }

    agregarVida(cantidad: number) {
        this.vida += cantidad;
    }

    // Método para calcular la efectividad de un ataque basado en tipos
    calcularEfectividad(tipoAtaque: string): number {
        return 1; // Efectividad neutral
    }

    // Método para mostrar información de manera estructurada
    toString(): string {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Vida: ${this.vida}, Ataque: ${this.ataque}, Defensa: ${this.defensa}, Rapidez: ${this.rapidez}, Habilidades: ${this.habilidades.join(', ')}, Peso: ${this.peso} kg, Altura: ${this.altura} m, Ancho: ${this.ancho} m, Catch Rate: ${this.catchRate}, Base Friendship: ${this.friendship}, Egg Groups: ${this.eggGroups.join(', ')}, Tipo: ${this.tipo}, Sprite Frontal: ${this.imagen}, Sprite Trasero: ${this.back_default}, Sprite Frontal Shiny: ${this.front_shiny}, Sprite Trasero Shiny: ${this.back_shiny}`;
    }
}
