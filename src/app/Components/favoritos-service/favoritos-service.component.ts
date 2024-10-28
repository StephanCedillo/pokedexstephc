import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private favoritos: number[] = [];

  addFavorito(id: number): void {
    if (!this.favoritos.includes(id)) {
      this.favoritos.push(id);
    }
  }

  removeFavorito(id: number): void {
    const index = this.favoritos.indexOf(id);
    if (index > -1) {
      this.favoritos.splice(index, 1);
    }
  }

  getFavoritos(): number[] {
    return this.favoritos;
  }
}
